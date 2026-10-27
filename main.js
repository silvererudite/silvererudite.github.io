/* =============================================================
   Renders the site from window.SITE_CONFIG and shows Substack
   posts from posts.json (refreshed by the deploy workflow). You normally don't need to edit this file.
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
    huggingface: "Hugging Face", linkedin: "LinkedIn", twitter: "Twitter",
    substack: "Substack",
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

  /* ---------- status line ---------- */
  var status = document.getElementById("hero-status");
  if (status && cfg.status) { status.textContent = cfg.status; status.hidden = false; }

  /* ---------- CV + Substack "all posts" links ---------- */
  var cvLink = document.getElementById("cv-link");
  if (cvLink && cfg.cv) cvLink.href = cfg.cv;
  var subLink = document.getElementById("substack-link");
  if (subLink) subLink.href = cfg.substackUrl || (cfg.links && cfg.links.substack) || "#";

  // Hide a whole section when its config list is empty or missing.
  function hideSection(id) {
    var s = document.getElementById(id);
    if (s) s.hidden = true;
    var navA = document.querySelector('.nav-links a[href="#' + id + '"]');
    if (navA) navA.parentNode.hidden = true;
  }

  /* ---------- news ---------- */
  (function renderNews() {
    var ul = document.getElementById("news-list");
    if (!ul) return;
    if (!Array.isArray(cfg.news) || !cfg.news.length) return hideSection("news");
    cfg.news.forEach(function (n) {
      var li = el("li", "news-item");
      li.appendChild(el("span", "news-date", esc(n.date)));
      li.appendChild(el("span", "news-text", n.text)); // trusted HTML from config
      ul.appendChild(li);
    });
  })();

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
      if (p.note) li.appendChild(el("p", "pub-note", esc(p.note)));
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

  /* ---------- about ---------- */
  (function renderAbout() {
    var txt = document.getElementById("about-text");
    if (txt) {
      var paras = Array.isArray(cfg.about) && cfg.about.length ? cfg.about : [cfg.intro || ""];
      paras.forEach(function (t) { txt.appendChild(el("p", null, t)); }); // trusted HTML
    }
    var ul = document.getElementById("interest-list");
    if (ul && Array.isArray(cfg.interests)) {
      cfg.interests.forEach(function (t) { ul.appendChild(el("li", "tag", esc(t))); });
    }
  })();

  /* =============================================================
     Substack posts.
     Substack's /feed doesn't send CORS headers and public CORS
     proxies keep disappearing, so the deploy workflow runs
     scripts/fetch_posts.py and we read the same-origin posts.json.
     ============================================================= */
  (function renderPosts() {
    var grid = document.getElementById("post-grid");
    var base = (cfg.substackUrl || "").replace(/\/+$/, "");
    if (!grid) return;
    if (!base) { grid.innerHTML = ""; return; }

    fetch("posts.json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (items) {
        if (!Array.isArray(items) || !items.length) throw new Error("empty");
        paint(items.slice(0, cfg.maxPosts || 6));
      })
      .catch(fail);

    function fmtDate(s) {
      // ISO dates ("2026-06-12") parse as UTC; format in UTC so the day doesn't shift.
      var d = new Date(s);
      if (isNaN(d)) return "";
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
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
