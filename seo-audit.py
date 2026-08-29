from __future__ import annotations

from pathlib import Path
from html.parser import HTMLParser
import json
import re
import xml.etree.ElementTree as ET

BASE = "https://kandie19.github.io"
ROOT = Path("out") if Path("out").is_dir() else Path(".")
IGNORE = {"404.html"}
LEGACY = {
    "about.html": "/overview.html",
    "achievements.html": "/dossier.html",
    "certifications.html": "/dossier.html",
    "experience.html": "/overview.html",
    "expertise.html": "/architecture.html",
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

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        tag = tag.lower()
        if tag == "title": self.in_title = True
        elif tag == "meta": self.meta.append(attrs)
        elif tag == "link": self.links.append(attrs)
        elif tag == "script" and attrs.get("type", "").lower() == "application/ld+json":
            self._jsonld = True; self._buf = []
        elif tag == "h1": self.h1_count += 1
        elif tag == "img": self.images.append(attrs)

    def handle_data(self, data):
        if self.in_title: self.title += data
        if self._jsonld: self._buf.append(data)

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag == "title": self.in_title = False
        elif tag == "script" and self._jsonld:
            self.jsonld.append("".join(self._buf).strip()); self._jsonld = False; self._buf = []


def meta_value(parser, name=None, prop=None):
    for item in parser.meta:
        if name and item.get("name", "").lower() == name.lower(): return item.get("content", "")
        if prop and item.get("property", "").lower() == prop.lower(): return item.get("content", "")
    return ""


def canonical(parser):
    for item in parser.links:
        if "canonical" in item.get("rel", "").lower().split(): return item.get("href", "")
    return ""


def page_url(path: Path) -> str:
    rel = path.relative_to(ROOT).as_posix()
    if rel == "index.html": return BASE + "/"
    if rel.endswith("/index.html"): return BASE + "/" + rel[:-len("index.html")]
    return BASE + "/" + rel


def refresh_target(html: str) -> str:
    match = re.search(r'<meta[^>]+http-equiv=["\']refresh["\'][^>]+content=["\']\s*0\s*;\s*url=([^"\']+)["\'][^>]*>', html, re.I)
    return match.group(1).strip() if match else ""


def is_redirect_page(html: str) -> bool:
    return bool(refresh_target(html))


def audit_file(path: Path):
    html = path.read_text(encoding="utf-8", errors="replace")
    parser = HeadParser(); parser.feed(html)
    issues, warnings = [], []
    title = parser.title.strip(); description = meta_value(parser, name="description")
    robots = meta_value(parser, name="robots").lower(); canon = canonical(parser)
    redirect = is_redirect_page(html); legacy_target = LEGACY.get(path.name)

    if redirect:
        if "noindex" not in robots: issues.append("redirect page missing noindex")
        if legacy_target:
            expected = BASE + legacy_target
            if not canon or canon.rstrip("/") != expected.rstrip("/"):
                issues.append(f"redirect canonical should target {legacy_target}")
            target = refresh_target(html)
            if target.startswith("/"):
                resolved = target if target.startswith("/") else target
            else:
                resolved = target
            if not (resolved.rstrip("/") == legacy_target.rstrip("/") or resolved.endswith(legacy_target)):
                issues.append(f"redirect target should be {legacy_target}")
        return issues, warnings

    if not title: issues.append("missing title")
    elif len(title) > 65: warnings.append(f"title length {len(title)}")
    if not description: issues.append("missing description")
    elif len(description) > 170: warnings.append(f"description length {len(description)}")
    if not canon: issues.append("missing canonical")
    elif canon.rstrip("/") != page_url(path).rstrip("/"): issues.append(f"canonical mismatch: {canon}")
    if "noindex" in robots: warnings.append("noindex")
    if not meta_value(parser, prop="og:title"): warnings.append("missing og:title")
    if not meta_value(parser, prop="og:description"): warnings.append("missing og:description")
    if not meta_value(parser, prop="og:image"): warnings.append("missing og:image")
    if meta_value(parser, name="twitter:card") != "summary_large_image": warnings.append("missing/weak twitter card")
    if parser.h1_count == 0: issues.append("missing H1")
    elif parser.h1_count > 1: warnings.append(f"multiple H1s ({parser.h1_count})")
    if not parser.jsonld: warnings.append("missing JSON-LD")
    else:
        for block in parser.jsonld:
            try: json.loads(block)
            except json.JSONDecodeError as exc: issues.append(f"invalid JSON-LD: {exc.msg}"); break
    for img in parser.images:
        if "src" in img and not img.get("alt", "").strip(): warnings.append("image missing alt text"); break
    return issues, warnings


def audit_sitemap():
    path = ROOT / "sitemap.xml"
    if not path.exists(): return ["missing sitemap.xml"]
    try:
        tree = ET.parse(path); missing = []
        for url in [u.text.strip() for u in tree.findall(".//{*}loc") if u.text]:
            if not url.startswith(BASE): continue
            rel = url[len(BASE):] or "/"
            if rel == "/": local = ROOT / "index.html"
            elif rel.endswith("/"): local = ROOT / rel.strip("/") / "index.html"
            else: local = ROOT / rel.lstrip("/")
            if not local.exists(): missing.append(rel)
        return [f"sitemap references missing file: {x}" for x in missing]
    except ET.ParseError as exc: return [f"invalid sitemap XML: {exc}"]


def main():
    files = sorted(p for p in ROOT.rglob("*.html") if ".git" not in p.parts and p.name not in IGNORE)
    total_issues = total_warnings = 0
    print(f"SEO audit root: {ROOT.resolve()}")
    for path in files:
        issues, warnings = audit_file(path); total_issues += len(issues); total_warnings += len(warnings)
        print(f"[{'PASS' if not issues else 'FAIL'}] {path.relative_to(ROOT)}")
        for item in issues: print(f"  ERROR: {item}")
        for item in warnings: print(f"  WARN:  {item}")
    sitemap_issues = audit_sitemap(); total_issues += len(sitemap_issues)
    for item in sitemap_issues: print(f"[FAIL] sitemap: {item}")
    print(f"\nAudit complete: {len(files)} HTML files, {total_issues} errors, {total_warnings} warnings")
    raise SystemExit(1 if total_issues else 0)

if __name__ == "__main__": main()
