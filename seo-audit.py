from __future__ import annotations

from pathlib import Path
from html.parser import HTMLParser
import json
import re
import xml.etree.ElementTree as ET
from urllib.parse import urljoin

BASE = "https://kandie19.github.io"
ROOT = Path("out") if Path("out").is_dir() else Path(".")
IGNORE = {"404.html"}
LEGACY = {
    "about.html": "/overview.html",
    "achievements.html": "/dossier.html",
    "certifications.html": "/dossier.html",
    "experience.html": "/dossier.html",
    "expertise.html": "/overview.html",
}

class HeadParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.meta = []
        self.links = []
        self.jsonld = []
        self._jsonld = False
        self._buf = []
        self.h1_count = 0
        self.images = []
        self.anchors = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        tag = tag.lower()
        if tag == "title":
            self.in_title = True
        elif tag == "meta":
            self.meta.append(attrs)
        elif tag == "link":
            self.links.append(attrs)
        elif tag == "script" and attrs.get("type", "").lower() == "application/ld+json":
            self._jsonld = True
            self._buf = []
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "img":
            self.images.append(attrs)
        elif tag == "a":
            href = attrs.get("href", "")
            if href:
                self.anchors.append(href)

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self._jsonld:
            self._buf.append(data)

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag == "title":
            self.in_title = False
        elif tag == "script" and self._jsonld:
            self.jsonld.append("".join(self._buf).strip())
            self._jsonld = False
            self._buf = []


def meta_value(parser, name=None, prop=None):
    for item in parser.meta:
        if name and item.get("name", "").lower() == name.lower():
            return item.get("content", "")
        if prop and item.get("property", "").lower() == prop.lower():
            return item.get("content", "")
    return ""


def canonical(parser):
    for item in parser.links:
        if item.get("rel", "").lower() == "canonical":
            return item.get("href", "")
    return ""


def page_url(path: Path) -> str:
    rel = path.relative_to(ROOT).as_posix()
    return BASE + "/" if rel == "index.html" else BASE + "/" + rel


def is_redirect_page(text: str) -> bool:
    return bool(re.search(r'<meta[^>]+http-equiv=["\']refresh["\'][^>]+url=', text, re.I))


def audit_file(path: Path):
    html = path.read_text(encoding="utf-8", errors="replace")
    parser = HeadParser()
    parser.feed(html)
    issues = []
    warnings = []
    title = parser.title.strip()
    description = meta_value(parser, name="description")
    robots = meta_value(parser, name="robots").lower()
    canon = canonical(parser)
    og_title = meta_value(parser, prop="og:title")
    og_description = meta_value(parser, prop="og:description")
    og_image = meta_value(parser, prop="og:image")
    twitter_card = meta_value(parser, name="twitter:card")
    redirect = is_redirect_page(html)

    if redirect:
        target = LEGACY.get(path.name)
        if "noindex" not in robots:
            issues.append("redirect page missing noindex")
        if target and canon and not canon.endswith(target):
            issues.append(f"redirect canonical should target {target}")
        return issues, warnings

    expected_url = page_url(path)
    if not title: issues.append("missing title")
    elif len(title) > 65: warnings.append(f"title length {len(title)}")
    if not description: issues.append("missing description")
    elif len(description) > 170: warnings.append(f"description length {len(description)}")
    if not canon: issues.append("missing canonical")
    elif canon.rstrip("/") != expected_url.rstrip("/"): issues.append(f"canonical mismatch: {canon}")
    if "noindex" in robots: warnings.append("noindex")
    if not og_title: warnings.append("missing og:title")
    if not og_description: warnings.append("missing og:description")
    if not og_image: warnings.append("missing og:image")
    if twitter_card != "summary_large_image": warnings.append("missing/weak twitter card")
    if parser.h1_count == 0: issues.append("missing H1")
    elif parser.h1_count > 1: warnings.append(f"multiple H1s ({parser.h1_count})")
    if not parser.jsonld:
        warnings.append("missing JSON-LD")
    else:
        for block in parser.jsonld:
            try:
                json.loads(block)
            except json.JSONDecodeError:
                issues.append("invalid JSON-LD")
                break
    for img in parser.images:
        if "src" in img and not img.get("alt", "").strip():
            warnings.append("image missing alt text")
            break
    return issues, warnings


def audit_sitemap():
    path = ROOT / "sitemap.xml"
    if not path.exists():
        return ["missing sitemap.xml"]
    try:
        tree = ET.parse(path)
        urls = [u.text.strip() for u in tree.findall(".//{*}loc") if u.text]
        missing = []
        for url in urls:
            if not url.startswith(BASE):
                continue
            rel = url[len(BASE):] or "/"
            local = ROOT / ("index.html" if rel == "/" else rel.lstrip("/"))
            if not local.exists():
                missing.append(rel)
        return [f"sitemap references missing file: {x}" for x in missing]
    except ET.ParseError as exc:
        return [f"invalid sitemap XML: {exc}"]


def main():
    files = sorted(p for p in ROOT.rglob("*.html") if ".git" not in p.parts and p.name not in IGNORE)
    total_issues = total_warnings = 0
    print(f"SEO audit root: {ROOT.resolve()}")
    for path in files:
        issues, warnings = audit_file(path)
        total_issues += len(issues)
        total_warnings += len(warnings)
        status = "PASS" if not issues else "FAIL"
        print(f"[{status}] {path.relative_to(ROOT)}")
        for item in issues:
            print(f"  ERROR: {item}")
        for item in warnings:
            print(f"  WARN:  {item}")
    for item in audit_sitemap():
        total_issues += 1
        print(f"[FAIL] sitemap: {item}")
    print(f"\nAudit complete: {len(files)} HTML files, {total_issues} errors, {total_warnings} warnings")
    raise SystemExit(1 if total_issues else 0)


if __name__ == "__main__":
    main()
