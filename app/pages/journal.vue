<template>
  <div>
    <AuthGate
      v-if="!isLoggedIn"
      v-model:auth="auth"
      :error="authError"
      :is-loading="isLoading"
      :is-restoring="isRestoring"
      module-title="Journal Studio"
      @login="verifySession('interactive')"
    />

    <div v-else class="min-h-[calc(100dvh-93px)] grid place-items-center px-4 py-10">
      <div class="max-w-lg w-full bg-slate-900/60 border border-slate-800/90 rounded-2xl p-6 sm:p-8 text-center shadow-2xl">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/12 border border-emerald-500/35 text-emerald-400 text-xs font-bold uppercase tracking-[0.16em]">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          WordPress XML-RPC Connected
        </span>
        <h2 class="text-2xl font-bold text-white mt-4">Journal Studio Unlocked</h2>
        <p class="text-slate-400 font-light text-sm mt-2 leading-relaxed">
          Signed in as <span class="text-amber-300 font-bold">@{{ auth.username }}</span>. Ready for Multi-Stream Journal Schema (Step 2).
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          <NuxtLink to="/" class="px-4 py-2.5 rounded-xl bg-brandsta hover:bg-blue-600 text-white text-xs font-bold uppercase tracking-[0.14em] transition-colors">
            Back to Hub
          </NuxtLink>
          <button type="button" @click="logout" class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-red-500/15 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/40 text-xs font-bold uppercase tracking-[0.14em] transition-colors cursor-pointer">
            Log Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { auth, isLoggedIn, isLoading, isRestoring, authError, verifySession, logout } = useStudioAuth()

useSeoMeta({
  title: 'Journal Studio — Data - Sree Jith Travel',
  robots: 'noindex, nofollow'
})
</script>