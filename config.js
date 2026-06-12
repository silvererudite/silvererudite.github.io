/* =============================================================
   EDIT THIS FILE TO PERSONALIZE YOUR SITE.
   You should never need to touch index.html or styles.css.
   ============================================================= */

window.SITE_CONFIG = {
  /* ---- Identity ---- */
  name: "Shamima Hossain",
  // A short line under your name. Keep it to one sentence.
  tagline: "Reading models by reading their data — understanding model capabilities through training data and learning dynamics.",
  // A slightly longer intro paragraph for the top of the page.
  intro:
    "I'm a researcher working on how language models acquire knowledge, biases, " +
    "and task-specific skills across the stages of training. I'm an MSc student " +
    "at BRAC University and a Senior Research Engineer at bKash, where I've built " +
    "the training data and pipelines behind production LLM systems. I also study " +
    "factuality in vision–language models and the interpretability of " +
    "retrieval-augmented generation, and I write about first-principles thinking in AI.",

  // Where you are / what you're looking for (shown subtly in the header area).
  location: "Dhaka, Bangladesh",

  /* ---- Links shown in the top nav and footer ----
     Remove any line you don't want. Leave the value as "" to hide it. */
  links: {
    email: "shamima2hossain@gmail.com",
    github: "https://github.com/silvererudite",
    scholar: "https://scholar.google.com/citations?user=Audko4wAAAAJ",
    linkedin: "https://www.linkedin.com/in/shamima-hossain-127454199/",
    twitter: "https://x.com/ShamimaHossai13",
    substack: "https://shamimah.substack.com",
  },

  // Path to your CV/resume PDF (drop the file in assets/ and update the name).
  cv: "assets/cv.pdf",

  /* ---- Substack blog ----
     Your publication's base URL. The site fetches <substack>/feed
     to render recent posts with thumbnails. */
  substackUrl: "https://shamimah.substack.com/",
  maxPosts: 5,

  /* ---- Projects ----
     Add/remove entries freely. `link` and `repo` are optional.
     `link` is a live demo/page (optional); `repo` is the code. */
  projects: [
    {
      title: "Identifying RAG Outputs in LLM-Generated Responses",
      year: "",
      blurb:
        "A method combining chain-of-thought reasoning and token manipulation that " +
        "lets users visually identify retrieved external knowledge inside LLM outputs. " +
        "Showed that models can self-identify gaps in their parametric knowledge and " +
        "tag externally retrieved information — bearing on what models learn from " +
        "training data versus context.",
      tags: ["RAG", "Interpretability", "LLMs"],
      link: "",
      repo: "https://github.com/silvererudite/generative-ai/tree/main/interpretable_generative_ai",
    },
    {
      title: "Factual Image Captioning with Vision–Language Models and Knowledge Graphs",
      year: "",
      blurb:
        "Controlled experiments on hallucination in VLMs, injecting hierarchical " +
        "structured knowledge (country → city → landmark) to improve factual accuracy " +
        "in image captioning. Comparing hierarchical vs. unstructured augmentation " +
        "(Qwen2-VL-2B-Instruct, GraphX) showed hierarchy notably improves a model's " +
        "ability to fact-check visual content.",
      tags: ["Vision–Language", "Knowledge Graphs", "Factuality"],
      link: "",
      repo: "https://github.com/silvererudite/generative-ai/blob/main/vision_language_models/kg-augmented-vlm-for-factual-image-captioning.ipynb",
    },
    {
      title: "Extracting Reusable Filters from Diffusion Models for Controlled Image Manipulation",
      year: "",
      blurb:
        "Computed semantic difference matrices from text embeddings in diffusion " +
        "models, enabling visual exploration of prompt-driven transformations in " +
        "latent and pixel space. Prompt-difference matrices mapped to transferable " +
        "semantic shifts across images — a step toward interpreting latent-space dynamics.",
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

  /* ---- Publications ----
     For PhD apps. `award` and `links` are optional. */
  publications: [
    {
      title: "Beyond Generation: Multi-Hop Reasoning for Factual Accuracy in Vision–Language Models",
      authors: "Shamima Hossain",
      venue: "ICML 2025 NewInML Workshop",
      year: "2025",
      award: "Poster",
      links: [
        { label: "arXiv", url: "https://arxiv.org/abs/2511.20531" },
      ],
    },
    {
      title: "Smart Companion Agent for Mental Well-being Using Deep Learning and NLP",
      authors: "Shamima Hossain et al.",
      venue: "Undergraduate Thesis, BRAC University",
      year: "2021",
      award: "",
      links: [
        { label: "Thesis", url: "https://dspace.bracu.ac.bd/xmlui/handle/10361/14973" },
      ],
    },
  ],
};
