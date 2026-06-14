Review this app's OpenAI API implementation and create a plan to improve quality, latency, reliability, and cost. Do not change code.

Please:
- Trace the current request flow from UI/API handlers through OpenAI SDK calls.
- Look for opportunities to improve model choice, prompting, structured outputs, built-in tools, streaming, retries, timeouts, caching, multimodal handling, and error messages.
- Propose concrete implementation steps, file areas to touch, and sequencing.
- Keep the plan behavior-compatible unless there is a strong reason to change behavior.
- Recommend tests or lightweight validation scripts for the affected paths.
- Summarize each proposed change with the expected benefit and tradeoff.
- Call out follow-up opportunities that need product or infra decisions before implementation.

Documentation:
- If the OpenAI Docs skill is available, use it to verify the latest OpenAI API guidance before implementing.
- If the OpenAI Docs skill is not available, install the OpenAI Docs skill and use it.
- If the OpenAI Docs skill cannot be installed or used, use web search to search the latest OpenAI developer documentation on developers.openai.com/api.
- Reference https://developers.openai.com/api/docs/models for guidance on the latest models to use.

Frontend:
- If the Frontend skill is installed, use it for frontend implementation and polish.
- If the Frontend skill is not installed, install the Frontend skill and use it.