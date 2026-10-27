"""Fetch recent Substack posts into posts.json (run at deploy time).

Substack's RSS feed doesn't send CORS headers, so the browser can't read it
directly. Instead the deploy workflow runs this script and the page loads the
resulting same-origin posts.json. Usage: python3 scripts/fetch_posts.py
"""
import html
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT_NS = "{http://purl.org/rss/1.0/modules/content/}encoded"


def config_value(key):
    m = re.search(r'\b%s:\s*"([^"]*)"' % key, (ROOT / "config.js").read_text())
    return m.group(1) if m else ""


def strip_html(s):
    s = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", s, flags=re.S | re.I)
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", s))).strip()


def main():
    base = config_value("substackUrl").rstrip("/")
    if not base:
        sys.exit("substackUrl not set in config.js")
    req = urllib.request.Request(base + "/feed", headers={"User-Agent": "Mozilla/5.0 (site build)"})
    with urllib.request.urlopen(req, timeout=30) as r:
        root = ET.fromstring(r.read())

    # Posts without their own image get the publication logo as enclosure;
    # skip it so the page shows its own placeholder instead of a blown-up logo.
    logo = root.findtext("channel/image/url") or ""

    posts = []
    for it in root.iter("item"):
        content = it.findtext(CONTENT_NS) or it.findtext("description") or ""
        # Prefer the first image in the post; the enclosure is often just the publication logo.
        m = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', content, re.I)
        enc = it.find("enclosure")
        image = m.group(1) if m else (enc.get("url") if enc is not None else "")
        if image == logo:
            image = ""
        try:
            date = parsedate_to_datetime(it.findtext("pubDate")).date().isoformat()
        except (TypeError, ValueError):
            date = ""
        excerpt = strip_html(it.findtext("description") or "") or strip_html(content)
        posts.append({
            "title": (it.findtext("title") or "").strip(),
            "link": (it.findtext("link") or "").strip(),
            "date": date,
            "image": html.unescape(image),
            "excerpt": excerpt[:180],
        })

    (ROOT / "posts.json").write_text(json.dumps(posts, indent=2, ensure_ascii=False) + "\n")
    print("wrote %d posts" % len(posts))


if __name__ == "__main__":
    main()
