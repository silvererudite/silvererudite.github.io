---
layout: page
title: "Projects"
permalink: /projects/
---

# Research Projects

These are some of the projects where I explore and prototype use cases of Large Language Models (LLMs), Vision-Language Models (VLMs), and other AI/ML technologies. I aim to demonstrate agentic and reasoning capabilities from LLMs and VLMs. Each project below demonstrates practical applications, innovative methodologies, or unique insights into how LLMs and VLMs work. 

## Selected Projects

### Project 1: Factual image captioning using VLM and knowledge graphs
**Description:** VLMs struggle to output factually correct image captions, they either generate partial facts or completely hallucinate. Increasing model size further worsens the ability. My experiments suggest that hallucination in VLMs is often linked to poor hierarchical knowledge because spatial understanding is a crucial factor in Visual understanding. I demonstrate how incorporating hierarchical and structured knowledge such as country->city->landmark help make vlm responses for factual image captioning a promising path to explore. I also systematically ablate different kinds of hierarchical knowledge augmentation and compare their results.  

- 👀 🤔**Spotlight areas** 👀: VLMs benefit more with hierarchical knowledge than unstructured knowledge
- **Domain:** Vision-Language Understanding, Fact checking, relational data
- **Technologies Used:** Qwen/Qwen2-VL-2B-Instruct, Graphx, and plain old python
- **Link:** [Factual Image Captioning using VLM and Knowledge Graphs](https://github.com/silvererudite/generative-ai/blob/main/vision_language_models/kg-augmented-vlm-for-factual-image-captioning.ipynb)

### Project 2: Identifying RAG outputs in an LLM generated response 
**Description:** LLMs responses that are augmented using external knowledge are hard to cross-check which parts of the external knowledge are actually used. I demonstrate a simple technique which is a blend of COT and token manipulation. The result is a practical method that lets users highlight the retrieved parts in a generated text in a different color making the responses more interpretable. 

-  👀 🤔**Spotlight areas** 👀: LLMs often know when they lack information and have the ability to tag external information from their own knowledge. 
- **Domain:** e.g., LLM, RAG, in-context learning, prompt-engineering, 
- **Technologies Used:** LLama-3.2-Instruct, plain simple python
- **Link:** [RAG highlighter](https://github.com/silvererudite/generative-ai/tree/main/interpretable_generative_ai)


### Project 3: Image feature aggregation using Attention mechanisms
**Description:** I demonstrated a use case of feature aggregation using the concept of attention to images. I utilized pretrained CLIP embeddings which already have knowledge of images.

- **Research area:** Interpreting image tokens using simple self-attention and multi-head attention. 
- **Technologies Used:** CLIP model 
- **Outcome:** I built this simple project to exercise my understanding of attention mechanisms by coding up one from scratch. To challenge myself, I only used images and python and came up with a possible use case to make the exercise practical. 
- **Link:** [Image feature aggregation with attention mechanism](https://github.com/silvererudite/attention_exploration/blob/main/apply_attention_to_image.ipynb)

## Ongoing and Future Work

I'm currently working on projects that further explore the integration of LLMs and VLMs in multimodal reasoning, fact-checking, and in genreral I am interested in understanding their reasoning frameworks. 
## Contact and Collaboration

I am open to collaboration and discussions around AI research. Feel free to reach out if you're interested in my work or have suggestions for further research.

