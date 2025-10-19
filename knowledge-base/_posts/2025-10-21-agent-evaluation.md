---
layout: post
title:  "Agent Evaluation & Benchmarks"
date:   2025-10-23 06:00:00 +0700
categories:
  - "Agentic AI"
excerpt_override: "As AI agents grow more capable with multi-step reasoning and tool use, are we building evaluation systems robust enough to measure their true capabilities—or just documenting short-lived milestones before they outsmart our benchmarks?"
featured_image: "/assets/images/blog/2025-10-21-agent-evaluation/agent-eval-feature-photo.png"
---

As large language models (LLMs) transition from static, text-to-text systems into dynamic agents capable of multi-step reasoning and tool use, the challenge of reliably measuring their progress intensifies. Evaluation is no longer a peripheral activity; it is the systematic, repeatable measurement that enables fair comparison, guides safe development, and ultimately drives the entire field forward. This technical quick reference distills the core principles of building robust evaluation systems.

> This guide distills concepts from the ["Agent Evaluation" lecture video](https://www.youtube.com/live/VfOA2a0dj4w) in the [2025 Agentic AI MOOC by Berkeley RDI](https://agenticai-learning.org/f25).

## The Foundational Role of Evaluation

Evaluation provides a systematic and reproducible way to measure the performance of models and agents. It is necessary at every stage of the development pipeline, from defining the initial loss function during training to establishing trustworthy, standardized benchmarks for deployment and academic publishing.

> "Benchmark is really the key that determines like the future progress of the whole field" - Weizhu Chen.

The establishment of fair, reproducible comparison across different models and agents makes evaluation the foundational mechanism for tracking performance, assessing risk, and ensuring safe and effective deployment.

<img src="/assets/images/blog/2025-10-21-agent-evaluation/are-ai-actually-any-good.png" alt="Are AI any good?" style="max-width: 600px; width: 100%; height: auto;">

## The Agentic Complexity Shift

LLMs traditionally operate in a simple, static environment, primarily handling text-to-text inputs and outputs. Agents, however, are significantly more complex, extending LLMs with capabilities such as planning, tool-use, memory, and multi-step reasoning, often operating in dynamic environments.

This shift mandates more complicated evaluation methods. Evaluation systems must account for complex interactions, state changes within the environment, and the agent's ability to coordinate multiple steps to complete a task.

<img src="/assets/images/blog/2025-10-21-agent-evaluation/llm-vs-agent.png" alt="Traditional LLM vs Agentic LLM" style="max-width: 600px; width: 100%; height: auto;">

## Taxonomy of Agent Evaluation Tasks

LLM agent evaluation can be categorized across several crucial dimensions:

- **Close-ended vs. Open-ended**: Closed-ended tasks have a limited number of potential and correct answers (e.g., multiple choice, yes/no questions), enabling automatic evaluation via simple metrics like accuracy or F1 score. Open-ended tasks involve free-form text with potentially infinite possibilities (e.g., storytelling, writing style adaptation), making them much more difficult to evaluate.

- **Verifiable vs. Non-Verifiable**: Within open-ended tasks, verifiable tasks have a clear "oracle" or criteria to judge correctness, such as automatic code interpreters for code generation or automated proof checkers for math problems. Non-verifiable tasks lack clear objective criteria, requiring subjective judgment (e.g., judging the quality of a story's logic or fluency).

- **Static vs. Dynamic**: Static benchmarks use fixed test cases, which allow for direct and reproducible comparison over time. Dynamic benchmarks continuously update or periodically regenerate data. This dynamic behavior keeps the benchmark relevant to real-world data shifts and makes it harder for models to overfit or be gamed.

## The Dual Approach to Non-Verifiable Evaluation

For non-verifiable, open-ended tasks, evaluation typically relies on two common, yet imperfect, methods:

1. **Human Evaluation**: This is often regarded as the gold standard due to its accuracy. However, it is slow, very expensive, and suffers from significant issues: inter-annotator disagreement (different humans disagree) and intra-annotator disagreement (the same human disagrees across time). These factors make human evaluations less reproducible for standardized benchmarking.

2. **LLM as a Judge (LLM-Judge)**: Using LLMs for evaluation is much cheaper and faster than human evaluation. Modern LLMs have surprisingly consistent outputs with human preference, positioning them as good surrogates. However, LLM-judges can be less reliable than humans, display biases (e.g., good at coding vs. math), and their outputs can be random or sensitive to vague prompts. It is recommended to use small-scale human evaluation for cross-checking LLM-Judge reliability.

## The Mandate for Outcome Validity

A "good" evaluation system must satisfy the criteria of **Outcome Validity**.

<img src="/assets/images/blog/2025-10-21-agent-evaluation/outcome-validity.png" alt="Output Validity" style="max-width: 600px; width: 100%; height: auto;">

Outcome validity ensures that the evaluation results produced by the system truly reflect the successful completion of the task and the desired AI's capabilities. For instance, when judging text results, simple string matching may fail to account for semantically equivalent, but non-identical, answers or redundant wording.

To maintain validity, special considerations must be made:

- **Preventing Hacking**: Ensure the evaluation system, particularly when using LLMs as judges, is not susceptible to being hacked by adversarial inputs designed to manipulate the score.

- **Diverse Testing**: For tasks like code generation, unit tests must cover diverse and extensive edge cases.

- **State Evaluation**: For multi-step reasoning agents, the evaluation system must evaluate the state change of the environment at each step, ensuring the complexity prevents the model from gaming the reward by enumerating states.

## Final Takeaway
The reliable evaluation of LLM agents is a sophisticated technical challenge that requires moving beyond simple text-to-text metrics toward validating complex, multi-step actions and ensuring high-quality, hack-proof measurement. Given the accelerating capabilities of AI agents, are we truly designing benchmarks that are challenging enough to drive meaningful progress, or are we simply documenting short-lived capability milestones?