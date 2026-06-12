/* =============================================================
   EDIT THIS FILE TO PERSONALIZE YOUR SITE.
   You should never need to touch index.html or styles.css.
   ============================================================= */

window.SITE_CONFIG = {
  /* ---- Identity ---- */
  name: "Your Name",
  // A short line under your name. Keep it to one sentence.
  tagline: "ML researcher working on robotics and learning systems.",
  // A slightly longer intro paragraph for the top of the page.
  intro:
    "I'm a researcher interested in how learning agents perceive, plan, and act " +
    "in the physical world. I build systems at the intersection of machine " +
    "learning and robotics, and I write about first-principles thinking in AI.",

  // Where you are / what you're looking for (shown subtly in the header area).
  location: "City, Country",

  /* ---- Links shown in the top nav and footer ----
     Remove any line you don't want. Leave the value as "" to hide it. */
  links: {
    email: "you@example.com",
    github: "https://github.com/yourhandle",
    scholar: "https://scholar.google.com/citations?user=XXXX",
    linkedin: "https://www.linkedin.com/in/yourhandle",
    twitter: "https://x.com/yourhandle",
    substack: "https://yourname.substack.com",
  },

  // Path to your CV/resume PDF (drop the file in assets/ and update the name).
  cv: "assets/cv.pdf",

  /* ---- Substack blog ----
     Your publication's base URL. The site fetches <substack>/feed
     to render recent posts with thumbnails. */
  substackUrl: "https://yourname.substack.com",
  maxPosts: 6,

  /* ---- Projects ----
     Add/remove entries freely. `link` and `repo` are optional. */
  projects: [
    {
      title: "Project One",
      year: "2025",
      blurb:
        "One or two sentences on what it is and why it matters. Lead with the " +
        "result or the idea, not the tooling.",
      tags: ["Reinforcement Learning", "Robotics"],
      link: "https://example.com",
      repo: "https://github.com/yourhandle/project-one",
    },
    {
      title: "Project Two",
      year: "2024",
      blurb:
        "A second project. Keep blurbs tight and concrete — reviewers skim.",
      tags: ["Computer Vision", "PyTorch"],
      link: "",
      repo: "https://github.com/yourhandle/project-two",
    },
  ],

  /* ---- Publications ----
     For PhD apps. `award` and `links` are optional. */
  publications: [
    {
      title: "A Representative Paper Title Goes Here",
      authors: "Your Name, Co Author, Senior Author",
      venue: "Conference / Journal",
      year: "2025",
      award: "", // e.g. "Oral", "Best Paper"
      links: [
        { label: "PDF", url: "#" },
        { label: "arXiv", url: "#" },
        { label: "Code", url: "#" },
      ],
    },
  ],
};
