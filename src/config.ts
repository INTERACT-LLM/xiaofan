// ============================================================
// Ollama Configuration
// ============================================================
// Point this at the running Ollama instance.
// Default: http://localhost:11434
export const OLLAMA_BASE_URL = 'http://localhost:11434'

// Which model to use. Must be pulled in Ollama first, e.g.:
//   ollama pull qwen2.5:7b
export const OLLAMA_MODEL = 'qwen3.5:9b'

// ============================================================
// System Prompts
// ============================================================
// Replace the placeholder strings below with the actual system
// prompts from Chuns's Mistral agents.
//
// Each key corresponds to a route in the app.

export const SYSTEM_PROMPTS: Record<string, string> = {
  greetings: `[PLACEHOLDER] Replace with the system prompt for the Greetings (Hilsner) agent.
For example: "You are a Chinese language tutor helping Danish-speaking students practise greetings in Mandarin Chinese. ..."`,

  family: `[PLACEHOLDER] Replace with the system prompt for the Family (Familie) agent.
For example: "You are a Chinese language tutor helping Danish-speaking students practise vocabulary and sentences about family members in Mandarin Chinese. ..."`,

  'date-and-time': `[PLACEHOLDER] Replace with the system prompt for the Date & Time (Dato og tid) agent.
For example: "You are a Chinese language tutor helping Danish-speaking students practise dates, times, and related expressions in Mandarin Chinese. ..."`,

  poetry: `[PLACEHOLDER] Replace with the system prompt for the Poetry (Poesi) agent.
For example: "You are a Chinese language tutor helping Danish-speaking students explore and understand Chinese poetry. ..."`,

  essay: `[PLACEHOLDER] Replace with the system prompt for the Newspaper Articles (Avisartikler) agent.
For example: "You are a Chinese language tutor helping Danish-speaking students read and discuss Chinese newspaper articles. ..."`,
}
