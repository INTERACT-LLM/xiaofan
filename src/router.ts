import { createRouter, createWebHistory } from 'vue-router'
import { SYSTEM_PROMPTS } from './config'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/poetry'
        },
        {
            path: '/greetings',
            name: 'greetings',
            component: () => import('./OllamaAgent.vue'),
            props: {
                systemPrompt: SYSTEM_PROMPTS.greetings,
                title: 'Hilsner'
            }
        },
        {
            path: '/family',
            name: 'family',
            component: () => import('./OllamaAgent.vue'),
            props: {
                systemPrompt: SYSTEM_PROMPTS.family,
                title: 'Familie'
            }
        },
        {
            path: '/date-and-time',
            name: 'date-and-time',
            component: () => import('./OllamaAgent.vue'),
            props: {
                systemPrompt: SYSTEM_PROMPTS['date-and-time'],
                title: 'Dato og tid'
            }
        },
        {
            path: '/poetry',
            name: 'poetry',
            component: () => import('./OllamaAgent.vue'),
            props: {
                systemPrompt: SYSTEM_PROMPTS.poetry,
                title: 'Poesi assistent'
            }
        },
        {
            path: '/essay',
            name: 'essay',
            component: () => import('./OllamaAgent.vue'),
            props: {
                systemPrompt: SYSTEM_PROMPTS.essay,
                title: 'Avisartikel assistent'
            }
        }
    ]
})

export default router
