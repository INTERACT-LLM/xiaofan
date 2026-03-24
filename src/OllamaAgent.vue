<script setup lang="ts">

import { PaperAirplaneIcon } from '@heroicons/vue/20/solid'
import { computed, nextTick, onMounted, type Ref, ref, watch } from 'vue'
import { marked } from 'marked'
import { useRoute } from 'vue-router'
import { OLLAMA_BASE_URL, OLLAMA_MODEL } from './config'

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const agentInput: Ref<string> = ref('')
const agentOutput: Ref<string> = ref('')
// Safety net: strip any <think>...</think> tags that leak through
function stripThinking(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/g, '').trim()
}

const renderedOutput = computed(() => marked.parse(stripThinking(agentOutput.value)))
const inProgress: Ref<boolean> = ref(false)

const props = defineProps<{
  systemPrompt: string
  title: string
}>()

// Chat history — reset when route changes
const messages: Ref<ChatMessage[]> = ref([])

function resetChat() {
  messages.value = [
    { role: 'system', content: props.systemPrompt }
  ]
  agentOutput.value = ''
  agentInput.value = ''
}

const textarea = ref<HTMLTextAreaElement | null>(null)

onMounted(() => {
  resetChat()
  textarea.value?.focus()
})

const route = useRoute()

watch(() => route.path, () => {
  nextTick(() => {
    resetChat()
    textarea.value?.focus()
  })
})

// Also reset if the system prompt prop changes (covers same-path prop updates)
watch(() => props.systemPrompt, () => {
  resetChat()
})

const askAgent = async () => {
  const userText = agentInput.value.trim()
  if (!userText) return

  inProgress.value = true
  agentInput.value = ''

  // Add user message to history
  messages.value.push({ role: 'user', content: userText })

  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: messages.value,
        stream: true,
        think: false,  // disable thinking mode (Qwen3/3.5)
      }),
    })

    if (!response.ok || !response.body) {
      throw new Error(`Ollama request failed: ${response.status} ${response.statusText}`)
    }

    agentOutput.value = ''

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })

      // Ollama streams newline-delimited JSON
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? '' // keep incomplete line in buffer

      for (const line of lines) {
        if (!line.trim()) continue
        try {
          const chunk = JSON.parse(line)
          if (chunk.message?.content) {
            agentOutput.value += chunk.message.content
          }
        } catch {
          // skip malformed lines
        }
      }
    }

    // Process any remaining buffer
    if (buffer.trim()) {
      try {
        const chunk = JSON.parse(buffer)
        if (chunk.message?.content) {
          agentOutput.value += chunk.message.content
        }
      } catch {
        // skip
      }
    }

    // Add assistant response to history
    messages.value.push({ role: 'assistant', content: agentOutput.value })

  } catch (error) {
    console.error('Ollama error:', error)
    agentOutput.value = `**Error:** Could not reach Ollama at \`${OLLAMA_BASE_URL}\`. Make sure Ollama is running and the model \`${OLLAMA_MODEL}\` is available.`
  }

  inProgress.value = false
  textarea.value?.focus()
}

</script>

<template>
  <div class="min-h-screen overflow-y-auto">
    <div class="w-2/3 mx-auto p-4">
      <div class="text-gray-700 text-2xl mt-2 mb-2">{{ title }}</div>
      <form @submit.prevent="askAgent">
        <div>
          <textarea
            ref="textarea"
            class="w-full bg-white p-2 border border-gray-400 rounded-lg"
            type="text"
            placeholder="Indtast din tekst"
            v-model="agentInput"
            rows="10"
            :disabled="inProgress"
          />
        </div>
        <div class="flex justify-end mt-2">
          <PaperAirplaneIcon
            class="h-10 w-10 shrink-0 text-gray-400 cursor-pointer"
            aria-hidden="true"
            @click="askAgent"
          />
        </div>
      </form>
      <div v-html="renderedOutput"></div>
    </div>
  </div>
</template>

<style scoped>
</style>
