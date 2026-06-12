/* =============================================================
   Renders the site from window.SITE_CONFIG and pulls Substack
   posts live. You normally don't need to edit this file.
   ============================================================= */
(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};

  /* ---------- helpers ---------- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  // Nice label for each link key.
  var LINK_LABELS = {
    email: "Email", github: "GitHub", scholar: "Scholar",
    linkedin: "LinkedIn", twitter: "Twitter", substack: "Substack",
  };
  function hrefFor(key, val) {
    return key === "email" ? "mailto:" + val : val;
  }

  /* ---------- simple text bindings ---------- */
  document.querySelectorAll("[data-bind]").forEach(function (node) {
    var key = node.getAttribute("data-bind");
    if (cfg[key]) node.textContent = cfg[key];
  });
  if (cfg.name) document.title = cfg.name;

  /* ---------- link lists (hero + footer) ---------- */
  function buildLinks(targetId, useExternalAttr) {
    var ul = document.getElementById(targetId);
    if (!ul || !cfg.links) return;
    Object.keys(cfg.links).forEach(function (key) {
      var val = cfg.links[key];
      if (!val) return;
      var a = el("a", null, esc(LINK_LABELS[key] || key));
      a.href = hrefFor(key, val);
      if (key !== "email") { a.target = "_blank"; a.rel = "noopener"; }
      ul.appendChild(el("li", null, "")).appendChild(a);
    });
  }
  buildLinks("hero-links");
  buildLinks("footer-links");

  /* ---------- CV + Substack "all posts" links ---------- */
  var cvLink = document.getElementById("cv-link");
  if (cvLink && cfg.cv) cvLink.href = cfg.cv;
  var subLink = document.getElementById("substack-link");
  if (subLink) subLink.href = cfg.substackUrl || (cfg.links && cfg.links.substack) || "#";

  /* ---------- projects ---------- */
  (function renderProjects() {
    var wrap = document.getElementById("project-list");
    if (!wrap || !Array.isArray(cfg.projects)) return;
    cfg.projects.forEach(function (p) {
      var card = el("article", "project");

      var top = el("div", "project-top");
      var titleHtml = p.link
        ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.title) + "</a>"
        : esc(p.title);
      top.appendChild(el("h3", "project-title", titleHtml));
      if (p.year) top.appendChild(el("span", "project-year", esc(p.year)));
      card.appendChild(top);

      if (p.blurb) card.appendChild(el("p", "project-blurb", esc(p.blurb)));

      var foot = el("div", "project-foot");
      if (Array.isArray(p.tags) && p.tags.length) {
        var tagRow = el("div", "tag-row");
        p.tags.forEach(function (t) { tagRow.appendChild(el("span", "tag", esc(t))); });
        foot.appendChild(tagRow);
      }
      var pl = el("div", "project-links");
      if (p.link) pl.appendChild(linkAnchor(p.link, "Live ↗"));
      if (p.repo) pl.appendChild(linkAnchor(p.repo, "Code ↗"));
      if (pl.childNodes.length) foot.appendChild(pl);
      if (foot.childNodes.length) card.appendChild(foot);

      wrap.appendChild(card);
    });
  })();

  function linkAnchor(url, label) {
    var a = el("a", null, label);
    a.href = url; a.target = "_blank"; a.rel = "noopener";
    return a;
  }

  /* ---------- publications ---------- */
  (function renderPubs() {
    var wrap = document.getElementById("pub-list");
    if (!wrap || !Array.isArray(cfg.publications)) return;
    cfg.publications.forEach(function (p) {
      var li = el("li", "pub");
      li.appendChild(el("p", "pub-title", esc(p.title)));
      if (p.authors) li.appendChild(el("p", "pub-authors", esc(p.authors)));
      var venue = esc(p.venue || "") + (p.year ? " &middot; " + esc(p.year) : "");
      var vnode = el("span", "pub-venue", venue);
      if (p.award) vnode.appendChild(el("span", "pub-award", esc(p.award)));
      var vwrap = el("div", null);
      vwrap.appendChild(vnode);
      li.appendChild(vwrap);
      if (Array.isArray(p.links) && p.links.length) {
        var ld = el("div", "pub-links");
        p.links.forEach(function (l) {
          if (l && l.url && l.url !== "#") ld.appendChild(linkAnchor(l.url, esc(l.label)));
        });
        if (ld.childNodes.length) li.appendChild(ld);
      }
      wrap.appendChild(li);
    });
  })();

  /* =============================================================
     Substack posts via RSS.
     Substack's /feed doesn't send CORS headers, so we go through
     a couple of public read-only proxies and use whichever works.
     ============================================================= */
  (function renderPosts() {
    var grid = document.getElementById("post-grid");
    var base = (cfg.substackUrl || "").replace(/\/+$/, "");
    if (!grid) return;
    if (!base) { grid.innerHTML = ""; return; }

    var feed = base + "/feed";
    var proxies = [
      function (u) { return "https://api.allorigins.win/raw?url=" + encodeURIComponent(u); },
      function (u) { return "https://corsproxy.io/?url=" + encodeURIComponent(u); },
    ];

    tryProxy(0);

    function tryProxy(i) {
      if (i >= proxies.length) return fail();
      fetch(proxies[i](feed))
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
        .then(function (xml) {
          var items = parseFeed(xml);
          if (!items.length) throw new Error("empty");
          paint(items);
        })
        .catch(function () { tryProxy(i + 1); });
    }

    function parseFeed(xml) {
      var doc = new DOMParser().parseFromString(xml, "text/xml");
      var nodes = Array.prototype.slice.call(doc.querySelectorAll("item"));
      var max = cfg.maxPosts || 6;
      return nodes.slice(0, max).map(function (it) {
        var get = function (sel) {
          var n = it.querySelector(sel);
          return n ? n.textContent : "";
        };
        var content = get("encoded") || get("description") || "";
        return {
          title: get("title"),
          link: get("link"),
          date: get("pubDate"),
          image: firstImage(it, content),
          excerpt: stripHtml(content).slice(0, 160),
        };
      });
    }

    function firstImage(item, content) {
      // <enclosure url="..."> is what Substack usually provides.
      var enc = item.querySelector("enclosure");
      if (enc && enc.getAttribute("url")) return enc.getAttribute("url");
      var m = /<img[^>]+src=["']([^"']+)["']/i.exec(content);
      return m ? m[1] : "";
    }
    function stripHtml(s) {
      var d = el("div", null, s);
      return (d.textContent || "").replace(/\s+/g, " ").trim();
    }
    function fmtDate(s) {
      var d = new Date(s);
      if (isNaN(d)) return "";
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }

    function paint(items) {
      grid.innerHTML = "";
      items.forEach(function (p) {
        var a = el("a", "post-card");
        a.href = p.link; a.target = "_blank"; a.rel = "noopener";
        if (p.image) {
          var img = el("img", "post-thumb");
          img.src = p.image; img.alt = p.title; img.loading = "lazy";
          img.onerror = function () { this.replaceWith(placeholder(p.title)); };
          a.appendChild(img);
        } else {
          a.appendChild(placeholder(p.title));
        }
        a.appendChild(el("div", "post-date", esc(fmtDate(p.date))));
        a.appendChild(el("h3", "post-title", esc(p.title)));
        if (p.excerpt) a.appendChild(el("p", "post-excerpt", esc(p.excerpt) + "…"));
        grid.appendChild(a);
      });
    }
    function placeholder(title) {
      var ch = (title || "·").trim().charAt(0).toUpperCase();
      return el("div", "post-thumb post-thumb--placeholder", esc(ch));
    }
    function fail() {
      grid.innerHTML =
        '<p class="post-error">Couldn’t load posts right now. ' +
        '<a href="' + esc(base) + '" target="_blank" rel="noopener">Read on Substack →</a></p>';
    }
  })();
})();
