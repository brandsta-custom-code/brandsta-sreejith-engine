<template>
  <div class="min-h-dvh bg-obsidian text-slate-200 font-sans selection:bg-brandsta selection:text-white flex flex-col">
    <!-- Locked 93px (h-23.25) Header for 0.000 CLS -->
    <header class="sticky top-0 h-23.25 bg-obsidian/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 z-50 shadow-2xl overflow-hidden flex items-center">
      <!-- Dual-Brand Top Hairline -->
      <div class="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-sreejith via-slate-800 to-brandsta opacity-85"></div>

      <div class="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <!-- Left: Sree Jith Emblem (192x192 PNG) -->
        <NuxtLink
          to="/"
          aria-label="Return to Sree Jith Concierge Hub"
          class="justify-self-start relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sreejith rounded-lg"
        >
          <div class="absolute top-1/2 left-5 -translate-y-1/2 w-20 h-20 bg-sreejith/15 group-hover:bg-sreejith/25 group-active:bg-sreejith/30 blur-2xl rounded-full pointer-events-none transition-opacity"></div>

          <img
            src="/images/sreejith-logo.png"
            width="192"
            height="192"
            alt="Sree Jith Travel"
            fetchpriority="high"
            decoding="async"
            class="h-12 sm:h-14 w-auto relative z-10 drop-shadow-[0_2px_10px_rgba(212,131,2,0.25)] transition-transform duration-200 group-hover:scale-103 group-active:scale-98"
          />
        </NuxtLink>

        <!-- Center: Hub Return Link & Dynamic Route Subtitle -->
        <NuxtLink
          to="/"
          class="justify-self-center group flex flex-col items-center justify-center text-center relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandsta rounded-lg px-2 py-1"
        >
          <h1 class="text-sm sm:text-xl md:text-2xl font-bold tracking-[0.16em] text-white group-hover:text-amber-200 group-active:text-amber-300 uppercase transition-colors whitespace-nowrap">
            SREE JITH - BRANDSTA
          </h1>
          <p class="text-[10px] sm:text-xs md:text-sm font-bold text-slate-400 tracking-[0.26em] uppercase mt-1 transition-colors group-hover:text-slate-200 whitespace-nowrap">
            {{ moduleLabel }}
          </p>
        </NuxtLink>

        <!-- Right: Brandsta Emblem (180x186 PNG) -->
        <NuxtLink
          to="/"
          aria-label="Brandsta Hub"
          class="justify-self-end relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandsta rounded-lg"
        >
          <div class="absolute top-1/2 right-5 -translate-y-1/2 w-20 h-20 bg-brandsta/20 group-hover:bg-brandsta/30 group-active:bg-brandsta/35 blur-2xl rounded-full pointer-events-none transition-opacity"></div>

          <img
            src="/images/brandsta-logo.png"
            width="180"
            height="186"
            alt="Brandsta"
            fetchpriority="high"
            decoding="async"
            class="h-12 sm:h-14 w-auto relative z-10 drop-shadow-[0_2px_10px_rgba(0,104,254,0.3)] transition-transform duration-200 group-hover:scale-103 group-active:scale-98"
          />
        </NuxtLink>
      </div>
    </header>

    <!-- Main Workspace Injection -->
    <main class="grow relative z-10">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const moduleLabel = computed(() => {
  if (route.path.startsWith('/itineraries')) return 'Itineraries Studio'
  if (route.path.startsWith('/journal')) return 'Journal Studio'
  if (route.path.startsWith('/testimonials')) return 'Testimonials Engine'
  if (route.path.startsWith('/community')) return 'Community Engine'
  return 'Digital Concierge'
})
</script>