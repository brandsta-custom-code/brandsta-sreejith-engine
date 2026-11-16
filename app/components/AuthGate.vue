<template>
  <div class="grid place-items-center min-h-[calc(100dvh-93px)] px-4 py-8 relative overflow-hidden">
    <!-- Subtle Dual-Brand Ambient Glows -->
    <div class="pointer-events-none absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-sreejith/8 blur-3xl rounded-full"></div>
    <div class="pointer-events-none absolute bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 w-72 h-72 bg-brandsta/10 blur-3xl rounded-full"></div>

    <div class="w-full max-w-md relative z-10 flex flex-col gap-4">
      <NuxtLink
        to="/"
        class="self-start inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 hover:text-white active:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandsta rounded-md px-1 py-0.5"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Concierge Hub</span>
      </NuxtLink>

      <form
        @submit.prevent="triggerLogin"
        class="bg-slate-900/60 border border-slate-800/90 p-6 sm:p-8 rounded-2xl shadow-2xl backdrop-blur-md flex flex-col"
      >
        <div class="text-center">
          <span class="inline-block px-3 py-1 rounded-full bg-obsidian border border-slate-800 text-[10px] font-bold uppercase tracking-[0.22em] text-sreejith mb-3">
            {{ moduleTitle }}
          </span>
          <h2 class="text-2xl font-bold text-white tracking-wide">
            Concierge Authentication
          </h2>
          <p class="text-slate-400 text-sm font-light mt-1">
            Enter your WordPress Application Password to enter this workspace.
          </p>
        </div>

        <!-- Zero-CLS Reserved Feedback Slot (Locked min-h-11) -->
        <div class="min-h-11 flex items-center justify-center my-3" aria-live="polite">
          <div
            v-if="isRestoring"
            class="w-full bg-brandsta/10 border border-brandsta/35 text-blue-300 text-xs font-normal px-3.5 py-2.5 rounded-lg flex items-center justify-center gap-2"
          >
            <span class="w-3.5 h-3.5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></span>
            <span>Restoring active concierge session...</span>
          </div>
          <div
            v-else-if="error"
            class="w-full bg-red-500/10 border border-red-500/45 text-red-300 text-xs font-normal px-3.5 py-2.5 rounded-lg text-center"
          >
            {{ error }}
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <div>
            <label for="auth-username" class="block text-xs font-bold text-slate-400 uppercase tracking-[0.16em] mb-1.5">
              WP Username
            </label>
            <input
              id="auth-username"
              name="username"
              v-model="internalAuth.username"
              type="text"
              autocomplete="username"
              :disabled="isLoading || isRestoring"
              class="w-full bg-obsidian border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-normal focus:outline-none focus:border-brandsta transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label for="auth-password" class="block text-xs font-bold text-slate-400 uppercase tracking-[0.16em] mb-1.5">
              Application Password
            </label>
            <div class="relative">
              <input
                id="auth-password"
                name="password"
                v-model="internalAuth.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="xxxx xxxx xxxx xxxx"
                :disabled="isLoading || isRestoring"
                class="w-full bg-obsidian border border-slate-800 rounded-xl px-4 py-3 pr-12 text-sm text-white font-normal placeholder:text-slate-600 focus:outline-none focus:border-brandsta transition-colors disabled:opacity-50"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandsta rounded-md"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading || isRestoring"
            class="mt-2 w-full bg-brandsta hover:bg-blue-600 active:scale-99 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-lg shadow-brandsta/20 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span>{{ isLoading ? 'Verifying Credentials...' : 'Secure Login' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface AuthModel {
  username: string
  password: string
}

const props = withDefaults(
  defineProps<{
    auth: AuthModel
    error?: string
    isLoading?: boolean
    isRestoring?: boolean
    moduleTitle?: string
  }>(),
  {
    error: '',
    isLoading: false,
    isRestoring: false,
    moduleTitle: 'Auth Protected'
  }
)

const emit = defineEmits<{
  'update:auth': [val: AuthModel]
  login: []
}>()

const internalAuth = computed({
  get: () => props.auth,
  set: (val) => emit('update:auth', val)
})

const showPassword = ref(false)

const triggerLogin = () => {
  if (!props.isLoading && !props.isRestoring) {
    emit('login')
  }
}
</script>