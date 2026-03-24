# Xiaofan (小帆) — Chinese Language Teaching App

A Vue 3 app for Danish students learning Chinese, powered by a local LLM via [Ollama](https://ollama.com).

## Prerequisites

1. **Node.js** ≥ 20.19
2. **Ollama** installed and running — see https://ollama.com/download
3. A **Qwen model** pulled locally:
   ```sh
   ollama pull qwen3.5:9b
   ```
   (You can change the model in `src/config.ts`)

## Setup

```sh
npm install
```

### Configure system prompts

Edit `src/config.ts` and replace the `[PLACEHOLDER]` strings in `SYSTEM_PROMPTS` with the actual system prompts for each exercise type (Greetings, Family, Date & Time, Poetry, Newspaper Articles).

You can also change `OLLAMA_BASE_URL` and `OLLAMA_MODEL` in the same file.

### Run in development mode

```sh
ollama serve          # if not already running
npm run dev
```

The app will be available at `http://localhost:5173` (or whichever port Vite assigns).

### CORS note

If the browser blocks requests to Ollama, you may need to set the `OLLAMA_ORIGINS` environment variable before starting Ollama:

```sh
OLLAMA_ORIGINS="http://localhost:*" ollama serve
```

### Build for production

```sh
npm run build
```

## Project structure

```
src/
  config.ts          ← Ollama URL, model name, and all system prompts
  OllamaAgent.vue    ← Chat component (streams from Ollama /api/chat)
  router.ts          ← Routes, each passing a system prompt to OllamaAgent
  AppFrame.vue       ← Sidebar layout
  App.vue            ← Root component
```

## Switching models

Edit `OLLAMA_MODEL` in `src/config.ts`. Any model available in your Ollama instance will work. For Chinese, Qwen models are recommended. Some options:

- `qwen3.5:4b` — default; good balance of quality and speed (~2.7 GB)
- `qwen3.5:9b` — higher quality, needs more VRAM (~6.6 GB)
- `qwen3:8b` — previous generation, solid alternative (~5.2 GB)
- `qwen3.5:0.8b` — fastest, lowest quality (~1 GB)

**Note on thinking mode:** Qwen3/3.5 models have a "thinking" mode that outputs internal reasoning. The app disables this via `think: false` in the API call, with a safety-net filter that strips any `<think>` tags that leak through.
