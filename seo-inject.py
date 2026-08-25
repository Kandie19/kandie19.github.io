from pathlib import Path
import json

path = Path("out/index.html")
html = path.read_text(encoding="utf-8")
marker = "<!-- PRODUCTION-SEO -->"

if marker not in html:
    graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": "https://kandie19.github.io/#person",
                "name": "Kelvin Kandie",
                "url": "https://kandie19.github.io/",
                "jobTitle": "Systems Architect",
                "description": "Systems Architect, AI & Cybersecurity Engineer, and builder of intelligent, scalable and secure systems.",
                "image": "https://kandie19.github.io/profile.jpg.png",
                "sameAs": ["https://github.com/Kandie19","https://www.linkedin.com/in/kelvin-kandie/","https://x.com/kandiemasasabi","https://www.instagram.com/kandie_masasabi/"],
                "knowsAbout": ["Systems Architecture","Artificial Intelligence","Cybersecurity","Distributed Systems","Cloud Architecture","Data Engineering","DevOps and Automation","Software Engineering"]
            },
            {
                "@type": "ProfilePage",
                "@id": "https://kandie19.github.io/#profile",
                "url": "https://kandie19.github.io/",
                "name": "Kelvin Kandie — Systems Architect",
                "mainEntity": {"@id": "https://kandie19.github.io/#person"},
                "isPartOf": {"@id": "https://kandie19.github.io/#website"}
            },
            {
                "@type": "WebSite",
                "@id": "https://kandie19.github.io/#website",
                "url": "https://kandie19.github.io/",
                "name": "Kelvin Kandie | Systems Architect",
                "description": "Executive technology portfolio of Kelvin Kandie.",
                "publisher": {"@id": "https://kandie19.github.io/#person"}
            },
            {
                "@type": "SoftwareApplication",
                "@id": "https://kandie19.github.io/#aegis",
                "name": "AEGIS Security Platform",
                "applicationCategory": "SecurityApplication",
                "operatingSystem": "Cross-platform",
                "description": "Autonomous security platform focused on perception, contextual intelligence, risk assessment, decision support and controlled response."
            }
        ]
    }
    seo = """<!-- PRODUCTION-SEO -->
<link rel="canonical" href="https://kandie19.github.io/">
<link rel="manifest" href="/site.webmanifest">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="author" content="Kelvin Kandie">
<meta name="keywords" content="Kelvin Kandie, Systems Architect Kenya, AI Engineer Kenya, Cybersecurity Engineer Kenya, AI systems architecture, distributed systems, cloud architecture, software engineering, AEGIS Security Platform">
<meta property="og:type" content="profile">
<meta property="og:site_name" content="Kelvin Kandie">
<meta property="og:title" content="Kelvin Kandie | Systems Architect, AI & Cybersecurity Engineer">
<meta property="og:description" content="Executive technology portfolio of Kelvin Kandie — systems architecture, AI, cybersecurity, distributed systems and AEGIS Security Platform.">
<meta property="og:url" content="https://kandie19.github.io/">
<meta property="og:image" content="https://kandie19.github.io/profile.jpg.png">
<meta property="og:image:alt" content="Kelvin Kandie — Systems Architect">
<meta property="og:locale" content="en_KE">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Kelvin Kandie | Systems Architect">
<meta name="twitter:description" content="Systems architecture, AI, cybersecurity and intelligent systems engineering from Kenya to the world.">
<meta name="twitter:image" content="https://kandie19.github.io/profile.jpg.png">
<meta name="twitter:image:alt" content="Kelvin Kandie — Systems Architect">
<script type="application/ld+json">""" + json.dumps(graph, ensure_ascii=False) + """</script>
"""
    html = html.replace("</head>", seo + "</head>", 1)
    path.write_text(html, encoding="utf-8")
