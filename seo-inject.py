from pathlib import Path
import json
import re

ROOT = Path("out")
BASE = "https://kandie19.github.io"
PERSON_ID = f"{BASE}/#person"
SITE_ID = f"{BASE}/#website"

PAGES = {
    "index.html": {
        "title": "Kelvin Kandie | Systems Architect, AI & Cybersecurity Engineer",
        "description": "Kelvin Kandie is a Systems Architect, AI and Cybersecurity Engineer building intelligent, secure and scalable technology platforms from Kenya for the world.",
        "type": "profile", "schema_type": "ProfilePage", "image": f"{BASE}/profile.jpg.png", "path": "/", "section": "Executive Portfolio",
    },
    "overview.html": {
        "title": "Executive Overview | Kelvin Kandie",
        "description": "Executive overview of Kelvin Kandie, covering systems architecture, artificial intelligence, cybersecurity, distributed systems, cloud architecture and intelligent software engineering.",
        "type": "website", "schema_type": "ProfilePage", "image": f"{BASE}/profile.jpg.png", "path": "/overview.html", "section": "Executive Overview",
    },
    "aegis.html": {
        "title": "AEGIS Security Platform | Kelvin Kandie",
        "description": "AEGIS Security Platform is Kelvin Kandie's flagship security systems project, exploring intelligent security operations, contextual intelligence, decision support and controlled response.",
        "type": "website", "schema_type": "WebPage", "image": f"{BASE}/AEGIS%20new%20LOGO.png", "path": "/aegis.html", "section": "AEGIS Security Platform",
    },
    "architecture.html": {
        "title": "Systems Architecture | Kelvin Kandie",
        "description": "Explore Kelvin Kandie's approach to systems architecture, scalable software, distributed systems, cloud platforms, security by design and intelligent automation.",
        "type": "website", "schema_type": "TechArticle", "image": f"{BASE}/profile.jpg.png", "path": "/architecture.html", "section": "Systems Architecture",
    },
    "engineering.html": {
        "title": "Engineering Lab | Kelvin Kandie",
        "description": "Kelvin Kandie's engineering lab covering AI, cybersecurity, real-time software, data engineering, distributed systems, cloud architecture and intelligent automation.",
        "type": "website", "schema_type": "CollectionPage", "image": f"{BASE}/profile.jpg.png", "path": "/engineering.html", "section": "Engineering Lab",
    },
    "repositories.html": {
        "title": "Projects & Repositories | Kelvin Kandie",
        "description": "Explore the projects, repositories and engineering work behind Kelvin Kandie's software, systems, analytics, AI and cybersecurity portfolio.",
        "type": "website", "schema_type": "CollectionPage", "image": f"{BASE}/profile.jpg.png", "path": "/repositories.html", "section": "Projects & Repositories",
    },
    "dossier.html": {
        "title": "Executive Dossier | Kelvin Kandie",
        "description": "Executive dossier for Kelvin Kandie, presenting his systems architecture, AI, cybersecurity, engineering experience, achievements and professional direction.",
        "type": "profile", "schema_type": "ProfilePage", "image": f"{BASE}/profile.jpg.png", "path": "/dossier.html", "section": "Executive Dossier",
    },
    "contact.html": {
        "title": "Contact Kelvin Kandie | Systems Architect",
        "description": "Contact Kelvin Kandie for conversations about systems architecture, AI, cybersecurity, intelligent platforms, software engineering and technology strategy.",
        "type": "website", "schema_type": "ContactPage", "image": f"{BASE}/profile.jpg.png", "path": "/contact.html", "section": "Contact",
    },
}

REDIRECTS = {
    "about.html": "overview.html",
    "achievements.html": "dossier.html",
    "certifications.html": "dossier.html",
    "experience.html": "dossier.html",
    "expertise.html": "overview.html",
}


def clean_existing_seo(head: str) -> str:
    patterns = [
        r'\s*<!-- PRODUCTION-SEO -->.*?<!-- /PRODUCTION-SEO -->\s*',
        r'\s*<link[^>]+rel=["\']canonical["\'][^>]*>',
        r'\s*<meta[^>]+name=["\']description["\'][^>]*>',
        r'\s*<meta[^>]+name=["\']robots["\'][^>]*>',
        r'\s*<meta[^>]+name=["\']author["\'][^>]*>',
        r'\s*<meta[^>]+name=["\']keywords["\'][^>]*>',
        r'\s*<meta[^>]+property=["\']og:[^"\']+["\'][^>]*>',
        r'\s*<meta[^>]+name=["\']twitter:[^"\']+["\'][^>]*>',
        r'\s*<script[^>]+type=["\']application/ld\+json["\'][^>]*>.*?</script>',
    ]
    for pattern in patterns:
        head = re.sub(pattern, "", head, flags=re.I | re.S)
    return head


def schema_for(filename: str, meta: dict) -> dict:
    graph = [
        {
            "@type": "Person", "@id": PERSON_ID, "name": "Kelvin Kandie", "url": BASE + "/",
            "jobTitle": "Systems Architect",
            "description": "Systems Architect, AI & Cybersecurity Engineer, and builder of intelligent, scalable and secure systems.",
            "image": f"{BASE}/profile.jpg.png",
            "sameAs": ["https://github.com/Kandie19", "https://www.linkedin.com/in/kelvin-kandie/", "https://x.com/kandiemasasabi", "https://www.instagram.com/kandie_masasabi/"],
            "knowsAbout": ["Systems Architecture", "Artificial Intelligence", "Cybersecurity", "Distributed Systems", "Cloud Architecture", "Data Engineering", "DevOps and Automation", "Software Engineering"],
        },
        {
            "@type": "WebSite", "@id": SITE_ID, "url": BASE + "/", "name": "Kelvin Kandie | Systems Architect",
            "description": "Executive technology portfolio of Kelvin Kandie.", "publisher": {"@id": PERSON_ID},
        },
        {
            "@type": meta["schema_type"], "@id": f"{BASE}{meta['path']}#page", "url": f"{BASE}{meta['path']}",
            "name": meta["title"], "description": meta["description"], "isPartOf": {"@id": SITE_ID}, "about": {"@id": PERSON_ID},
        },
    ]
    if filename == "index.html":
        graph[-1]["mainEntity"] = {"@id": PERSON_ID}
    if filename == "aegis.html":
        graph.append({
            "@type": "SoftwareApplication", "@id": f"{BASE}/aegis.html#aegis", "name": "AEGIS Security Platform",
            "applicationCategory": "SecurityApplication", "operatingSystem": "Cross-platform",
            "description": "Security platform concept focused on contextual intelligence, risk assessment, decision support and controlled response.",
            "creator": {"@id": PERSON_ID}, "url": f"{BASE}/aegis.html",
        })
    return {"@context": "https://schema.org", "@graph": graph}


def seo_block(filename: str, meta: dict) -> str:
    schema = json.dumps(schema_for(filename, meta), ensure_ascii=False, separators=(",", ":"))
    return f'''<!-- PRODUCTION-SEO -->
<link rel="canonical" href="{BASE}{meta['path']}">
<meta name="description" content="{meta['description']}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="author" content="Kelvin Kandie">
<meta property="og:type" content="{meta['type']}">
<meta property="og:site_name" content="Kelvin Kandie">
<meta property="og:title" content="{meta['title']}">
<meta property="og:description" content="{meta['description']}">
<meta property="og:url" content="{BASE}{meta['path']}">
<meta property="og:image" content="{meta['image']}">
<meta property="og:image:alt" content="Kelvin Kandie — {meta['section']}">
<meta property="og:locale" content="en_KE">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{meta['title']}">
<meta name="twitter:description" content="{meta['description']}">
<meta name="twitter:image" content="{meta['image']}">
<meta name="twitter:image:alt" content="Kelvin Kandie — {meta['section']}">
<script type="application/ld+json">{schema}</script>
<!-- /PRODUCTION-SEO -->
'''


def process_page(filename: str, meta: dict) -> None:
    path = ROOT / filename
    if not path.exists():
        return
    html = path.read_text(encoding="utf-8")
    match = re.search(r"<head[^>]*>(.*?)</head>", html, flags=re.I | re.S)
    if not match:
        return
    head = clean_existing_seo(match.group(1))
    head = re.sub(r"<title>.*?</title>", f"<title>{meta['title']}</title>", head, count=1, flags=re.I | re.S)
    if "<title>" not in head.lower():
        head = f"<title>{meta['title']}</title>" + head
    head = seo_block(filename, meta) + head
    html = html[:match.start(1)] + head + html[match.end(1):]
    path.write_text(html, encoding="utf-8")


def process_redirect(filename: str, target: str) -> None:
    path = ROOT / filename
    if not path.exists():
        return
    html = path.read_text(encoding="utf-8")
    html = re.sub(r'<meta\s+http-equiv=["\']refresh["\'][^>]*>', f'<meta http-equiv="refresh" content="0;url={target}">', html, flags=re.I)
    if 'name="robots"' not in html.lower():
        html = html.replace("</head>", '<meta name="robots" content="noindex,follow">\n</head>', 1)
    path.write_text(html, encoding="utf-8")


for filename, meta in PAGES.items():
    process_page(filename, meta)

for filename, target in REDIRECTS.items():
    process_redirect(filename, target)
