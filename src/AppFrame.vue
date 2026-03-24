<template>
    <!--
      This example requires updating your template:

      ```
      <html class="h-full bg-white dark:bg-gray-900">
      <body class="h-full">
      ```
    -->
    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="" leave="transition-opacity ease-linear duration-300" leave-from="" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-900/80"></div>
                </TransitionChild>

                <div class="fixed inset-0 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
                        <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="" leave="ease-in-out duration-300" leave-from="" leave-to="opacity-0">
                                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>

                            <!-- Sidebar component, swap this element with another sidebar if you like -->
                            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2 dark:bg-indigo-800 dark:ring-1 dark:ring-white/10">
                                <div class="flex h-16 shrink-0 items-center">
                                    <img class="h-8 w-auto dark:hidden" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white" alt="Your Company" />
                                    <img class="hidden h-8 w-auto dark:block" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white" alt="Your Company" />
                                </div>
                                <nav class="flex flex-1 flex-col">
                                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" class="-mx-2 space-y-1">
                                                <li v-for="item in navigation" :key="item.name">
                                                    <router-link :to="item.route"
                                                                 active-class="bg-indigo-700 text-white dark:bg-indigo-950/25"
                                                                 class="text-indigo-200 hover:bg-indigo-700 hover:text-white dark:text-indigo-100 dark:hover:bg-indigo-950/25 group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold">
                                                        <component :is="item.icon"
                                                                   class="group-[.is-active]:text-white text-indigo-200 group-hover:text-white dark:text-indigo-100 size-6 shrink-0" aria-hidden="true" />
                                                        {{ item.name }}
                                                    </router-link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="relative flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 dark:bg-indigo-800 dark:after:pointer-events-none dark:after:absolute dark:after:inset-y-0 dark:after:right-0 dark:after:w-px dark:after:bg-white/10">
                <div class="flex h-16 shrink-0 items-center">
                    <img class="h-8 w-auto dark:hidden" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white" alt="Your Company" />
                    <img class="hidden h-8 w-auto dark:block" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white" alt="Your Company" />
                </div>
                <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" class="-mx-2 space-y-1">
                                <li v-for="item in navigation" :key="item.name">
                                    <router-link :to="item.route"
                                                 active-class="bg-indigo-700 text-white dark:bg-indigo-950/25"
                                                 class="group text-indigo-200 hover:bg-indigo-700 hover:text-white dark:text-indigo-100 dark:hover:bg-indigo-950/25 group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold">
                                        <component :is="item.icon" class="group-[.is-active]:text-white text-indigo-200 group-hover:text-white dark:text-indigo-100 size-6 shrink-0" aria-hidden="true" />
                                        {{ item.name }}
                                    </router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden dark:bg-indigo-800 dark:after:pointer-events-none dark:after:absolute dark:after:inset-x-0 dark:after:bottom-0 dark:after:h-px dark:after:bg-white/10">
            <button type="button" class="-m-2.5 p-2.5 text-indigo-200 hover:text-white lg:hidden" @click="sidebarOpen = true">
                <span class="sr-only">Open sidebar</span>
                <Bars3Icon class="size-6" aria-hidden="true" />
            </button>
            <div class="flex-1 text-sm/6 font-semibold text-white">Dashboard</div>
        </div>

        <main class="py-10 lg:pl-72">
            <div class="px-4 sm:px-6 lg:px-8">
                <router-view />
            </div>
        </main>

    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {
    NewspaperIcon,
    SparklesIcon,
    XMarkIcon,
    Bars3Icon
} from '@heroicons/vue/24/outline'

const navigation = [
    { name: 'Hilsner', route: '/greetings', icon: SparklesIcon },
    { name: 'Familie', route: '/family', icon: SparklesIcon },
    { name: 'Dato og tid', route: '/date-and-time', icon: SparklesIcon },
    { name: 'Poesi', route: '/poetry', icon: SparklesIcon },
    { name: 'Avisartikler', route: '/essay', icon: NewspaperIcon }
]

const sidebarOpen = ref(false)

</script>