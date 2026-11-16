<!-- app/pages/index.vue -->

<template>
  <div class="min-h-[calc(100dvh-93px)] grid place-items-center px-4 sm:px-6 py-10 relative overflow-hidden">
    <!-- Subtle GPU-safe Ambient Glows -->
    <div class="pointer-events-none absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sreejith/8 blur-3xl rounded-full"></div>
    <div class="pointer-events-none absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-brandsta/10 blur-3xl rounded-full"></div>

    <div class="max-w-5xl w-full relative z-10">
      <!-- Intro Header -->
      <div class="text-center mb-8 sm:mb-10">
        <div class="inline-flex flex-wrap items-center justify-center gap-2 mb-3">
          <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400">
            Select Concierge Module
          </span>

          <span
            v-if="isLoggedIn"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/35 text-[11px] font-bold tracking-[0.14em] uppercase text-emerald-400"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>@{{ auth.username }} Unlocked</span>
            <button
              type="button"
              @click="logout"
              class="ml-1.5 pl-2 border-l border-emerald-500/30 text-slate-300 hover:text-red-400 transition-colors cursor-pointer"
            >
              Lock
            </button>
          </span>
        </div>

        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Sree Jith Travel<br />Digital Concierge Studio
        </h2>
        <p class="text-slate-400 font-light text-sm sm:text-base mt-2.5 max-w-2xl mx-auto">
          Authenticate with WordPress to publish multi-stream itineraries and journal stories or manage live testimonials and community partners.
        </p>
      </div>

      <!-- 2x2 CSS Grid Module Matrix -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <NuxtLink
          v-for="mod in modules"
          :key="mod.to"
          :to="mod.to"
          class="group relative rounded-2xl bg-slate-900/60 border border-slate-800/90 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-99 shadow-2xl overflow-hidden focus-visible:outline-none focus-visible:ring-2"
          :class="mod.cardBorderClass"
        >
          <div
            class="pointer-events-none absolute inset-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            :class="mod.glowGradientClass"
          ></div>

          <div class="relative z-10">
            <div class="flex items-center justify-between gap-3 mb-5">
              <div
                class="w-12 h-12 rounded-xl border flex items-center justify-center group-hover:scale-105 group-active:scale-95 transition-transform duration-200"
                :class="mod.iconBoxClass"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.9" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="mod.iconPath" />
                </svg>
              </div>

              <span
                class="px-2.5 py-1 rounded-md border text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em]"
                :class="mod.badgeClass"
              >
                {{ mod.badge }}
              </span>
            </div>

            <h3 class="text-xl sm:text-2xl font-bold text-white transition-colors" :class="mod.titleHoverClass">
              {{ mod.title }}
            </h3>
            <p class="text-slate-400 font-light text-sm leading-relaxed mt-2">
              {{ mod.description }}
            </p>
          </div>

          <div
            class="relative z-10 mt-7 pt-4 border-t border-slate-800/80 flex items-center justify-between text-sm font-bold"
            :class="mod.ctaClass"
          >
            <span>{{ mod.cta }}</span>
            <svg
              class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5 group-active:translate-x-2"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { auth, isLoggedIn, logout } = useStudioAuth()

const modules = [
  {
    to: '/itineraries',
    title: 'Itineraries Studio',
    badge: 'Auth Protected • Multi-Stream',
    description:
      'Compose bespoke travel routes, day-by-day chapters, inclusions, and media—auto-splitting 10-field listing cards from full itinerary payloads.',
    cta: 'Launch Itineraries Studio',
    iconPath: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    cardBorderClass: 'hover:border-sreejith/70 active:border-amber-400 focus-visible:ring-sreejith',
    glowGradientClass: 'bg-linear-to-br from-sreejith/14 via-transparent to-transparent',
    iconBoxClass: 'bg-sreejith/15 border-sreejith/35 text-amber-400',
    badgeClass: 'bg-sreejith/12 border-sreejith/35 text-amber-300',
    titleHoverClass: 'group-hover:text-amber-300',
    ctaClass: 'text-amber-400'
  },
  {
    to: '/journal',
    title: 'Journal Studio',
    badge: 'Auth Protected • Multi-Stream',
    description:
      'Publish slow-travel stories, photography essays, and structured narrative blocks with zero-corruption UTF-8 encoding and instant index sync.',
    cta: 'Launch Journal Studio',
    iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    cardBorderClass: 'hover:border-brandsta/70 active:border-blue-400 focus-visible:ring-brandsta',
    glowGradientClass: 'bg-linear-to-bl from-brandsta/14 via-transparent to-transparent',
    iconBoxClass: 'bg-brandsta/15 border-brandsta/35 text-blue-400',
    badgeClass: 'bg-brandsta/12 border-brandsta/35 text-blue-300',
    titleHoverClass: 'group-hover:text-blue-300',
    ctaClass: 'text-blue-400'
  },
  {
    to: '/testimonials',
    title: 'Testimonials Engine',
    badge: 'Auth Protected • Master JSON',
    description:
      'Curate and reorder verified guest reflections, journey tags, and traveler portraits inside a single high-speed WordPress JSON feed.',
    cta: 'Open Testimonials Engine',
    iconPath: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    cardBorderClass: 'hover:border-emerald-500/65 active:border-emerald-400 focus-visible:ring-emerald-500',
    glowGradientClass: 'bg-linear-to-tr from-emerald-500/12 via-transparent to-transparent',
    iconBoxClass: 'bg-emerald-500/15 border-emerald-500/35 text-emerald-400',
    badgeClass: 'bg-emerald-500/12 border-emerald-500/35 text-emerald-300',
    titleHoverClass: 'group-hover:text-emerald-300',
    ctaClass: 'text-emerald-400'
  },
  {
    to: '/community',
    title: 'Community Engine',
    badge: 'Auth Protected • Master JSON',
    description:
      'Manage local artisans, regional hosts, and cultural partner cards with direct WordPress CDN image uploads and AI JSON import.',
    cta: 'Open Community Engine',
    iconPath: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    cardBorderClass: 'hover:border-sky-400/65 active:border-sky-300 focus-visible:ring-sky-400',
    glowGradientClass: 'bg-linear-to-tl from-sky-500/12 via-transparent to-transparent',
    iconBoxClass: 'bg-sky-500/15 border-sky-500/35 text-sky-400',
    badgeClass: 'bg-sky-500/12 border-sky-500/35 text-sky-300',
    titleHoverClass: 'group-hover:text-sky-300',
    ctaClass: 'text-sky-400'
  }
]

// app/pages/index.vue
import { useConciergeSeo } from '../composables/useConciergeSeo'

useHead({
  link: [{ rel: 'canonical', href: 'https://sreejith.brandsta.cc/' }]
})

useConciergeSeo('hub')

</script>