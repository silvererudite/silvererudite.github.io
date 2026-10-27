/* =============================================================
   EDIT THIS FILE TO PERSONALIZE YOUR SITE.
   You should never need to touch index.html or styles.css.
   ============================================================= */

window.SITE_CONFIG = {
  /* ---- Identity ---- */
  name: "Shamima Hossain",
  // A short line under your name. Keep it to one sentence.
  tagline: "Reading models by reading their data.",
  // A slightly longer intro paragraph for the top of the page.
  intro:
    "I'm curious about what post-training actually teaches a language model, and how to " +
    "build agents that keep getting better at long-horizon scientific work.",

  // Where you are / what you're looking for (shown subtly in the header area).
  location: "",
  // Optional highlighted status line under the intro. Leave "" to hide it.
  status: "",

  /* ---- Links shown in the top nav and footer ----
     Remove any line you don't want. Leave the value as "" to hide it. */
  links: {
    email: "shamima2hossain@gmail.com",
    github: "https://github.com/silvererudite",
    scholar: "https://scholar.google.com/citations?user=Audko4wAAAAJ",
    huggingface: "https://huggingface.co/Shamima",
    linkedin: "https://www.linkedin.com/in/shamima-hossain-127454199/",
    twitter: "https://x.com/ShamimaHossai13",
    substack: "https://shamimah.substack.com",
  },

  // Path to your CV/resume PDF (drop the file in assets/ and update the name).
  cv: "assets/cv.pdf",

  /* ---- About ----
     Paragraphs shown in the About section (simple HTML allowed),
     then your research interests as tags. */
  about: [
    "At bKash I built the data curation and training pipeline behind AVA, our first " +
    "LLM-based assistant. Watching small filtering decisions turn into model behaviour in " +
    "front of millions of users is what got me hooked on one question: what does training " +
    "actually teach a model?",
    "That question has turned into a habit. I take a method's headline claim and try to " +
    "break it under a careful, budget-matched test. Sometimes it holds. When we tested " +
    "DPO's promise that your policy is “secretly a reward model”, an untrained SFT baseline " +
    "beat both trained scorers on reasoning, which is still the most surprising result I've had.",
    "I think out loud on Substack.",
  ],
  interests: [
    "Post-training of language models",
    "Continually improving agents",
    "Human–AI collaboration",
    "Multilingual models",
  ],

  /* ---- Lately ----
     Newest first. `text` may contain simple HTML (links, <em>). */
  news: [
    { date: "2026", text: "Reviewing for the GlobalSouthInAI workshop at NeurIPS 2026." },
    { date: "Aug 2026", text: "Joined the ELLIS Summer School on AI for Research at Aalto (one of 100 participants); our team made the <strong>top 10</strong> of the LUMI hackathon by auditing cognitive-science data with LLM agents." },
    { date: "Mar 2026", text: "Went to Amsterdam for the ELLIS Winter School on Foundation Models, alongside 260 early-career researchers from 128 institutions." },
    { date: "Jul 2025", text: "Presented my sole-author poster on multi-hop reasoning for factual VLMs at ICML 2025 (NewInML)." },
  ],

  /* ---- Substack blog ----
     Your publication's base URL. Posts are fetched from <substack>/feed
     into posts.json each time the site deploys (and once a day). */
  substackUrl: "https://shamimah.substack.com/",
  maxPosts: 6,

  /* ---- Publications ----
     For PhD apps. `award`, `note` and `links` are optional. */
  publications: [
    {
      title: "Exploring DPO's Implicit Reward",
      authors: "Shamima Hossain, Laila Sumiya Khan Nilo, Abdullah Al Mahmud",
      venue: "Manuscript",
      year: "2026",
      award: "",
      note:
        "Tests DPO's “secretly a reward model” claim under a budget-matched setup " +
        "(Qwen2.5-0.5B, one shared SFT checkpoint, five seeds). An explicit Bradley–Terry " +
        "reward model wins in distribution, the gap doesn't widen under shift, and an " +
        "untrained SFT log-probability baseline beats both trained scorers on RewardBench-Reasoning.",
      links: [
        { label: "PDF", url: "https://drive.google.com/file/d/13BjBE69g2RpJt41de6hgIns6T7sxxLcc/view?usp=sharing" },
        { label: "Code", url: "https://github.com/silvererudite/dpo-implicit-reward" },
        { label: "Checkpoints", url: "https://huggingface.co/Shamima/dpo-implicit-reward" },
      ],
    },
    {
      title: "Probing Structural Bias in Stable Diffusion 3: A Stereotype Content Model Analysis",
      authors: "Shamima Hossain",
      venue: "Manuscript",
      year: "2026",
      award: "",
      note:
        "A Bayesian errors-in-variables model over 6,600 generated portraits of 66 social groups " +
        "shows SD3 reliably reproduces the warmth–competence structure but collapses the " +
        "“envy” quadrant, so text-to-image bias reads as stereotype geometry, not just frequency.",
      links: [
        { label: "PDF", url: "https://drive.google.com/file/d/1M4fnze7cGLW7ZjC2AoeVjuZjaNiNH2SQ/view?usp=sharing" },
        { label: "Code", url: "https://github.com/silvererudite/diffusion_scm" },
        { label: "Corpus", url: "https://huggingface.co/datasets/Shamima/sd3-medium-scm-corpus" },
      ],
    },
    {
      title: "Beyond Generation: Multi-Hop Reasoning for Factual Accuracy in Vision–Language Models",
      authors: "Shamima Hossain",
      venue: "ICML 2025 NewInML Workshop",
      year: "2025",
      award: "Poster",
      note: "",
      links: [
        { label: "arXiv", url: "https://arxiv.org/abs/2511.20531" },
      ],
    },
  ],

  /* ---- Projects ----
     Add/remove entries freely. `link` and `repo` are optional.
     `link` is a live demo/page (optional); `repo` is the code. */
  projects: [
    {
      title: "Identifying Retrieved Content in RAG Outputs",
      year: "",
      blurb:
        "Combined chain-of-thought prompting with token-level manipulation so users can " +
        "visually tell retrieved external knowledge apart from parametric knowledge in LLM " +
        "outputs. Models turn out to be able to flag gaps in what they know.",
      tags: ["RAG", "Interpretability", "LLMs"],
      link: "",
      repo: "https://github.com/silvererudite/generative-ai/tree/main/interpretable_generative_ai",
    },
    {
      title: "Knowledge-Graph-Augmented Factual Image Captioning",
      year: "",
      blurb:
        "The precursor to the ICML workshop paper: a controlled comparison of hierarchical " +
        "(country → city → landmark) vs. unstructured knowledge injection with " +
        "Qwen2-VL-2B-Instruct and GraphX. Hierarchical structure measurably improves " +
        "fact-checking of visual content.",
      tags: ["Vision–Language", "Knowledge Graphs", "Factuality"],
      link: "",
      repo: "https://github.com/silvererudite/generative-ai/blob/main/vision_language_models/kg-augmented-vlm-for-factual-image-captioning.ipynb",
    },
    {
      title: "Reusable Semantic Filters from Diffusion-Model Text Embeddings",
      year: "",
      blurb:
        "Computed prompt-difference matrices in text-embedding space and showed they map to " +
        "transferable semantic shifts across images, in both latent and pixel space.",
      tags: ["Diffusion Models", "Interpretability"],
      link: "",
      repo: "https://github.com/silvererudite/diffusion-land/tree/main/extract_image_filters_from_diffusion_models",
    },
    {
      title: "Prompt Autocomplete: End-to-End ML Workflow Pipeline",
      year: "",
      blurb:
        "Built and deployed a production-ready pipeline for training and scaling " +
        "transformer models for prompt autocompletion in text-to-image applications " +
        "(AWS SageMaker, Lambda, API Gateway, Hugging Face PyTorch).",
      tags: ["MLOps", "Transformers", "AWS"],
      link: "",
      repo: "https://github.com/silvererudite/prompt-autocompletion-aws",
    },
  ],

};
