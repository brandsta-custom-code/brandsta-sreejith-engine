import { computed, onMounted } from 'vue'

const STORAGE_PASS_KEY = 'sreejith_concierge_app_pass'

const safeStorage = {
  get(key: string): string | null {
    if (typeof window === 'undefined') return null
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(key: string, value: string): void {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(key, value)
    } catch {
      // Proceed in memory if storage is blocked
    }
  },
  remove(key: string): void {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.removeItem(key)
    } catch {}
  }
}

export const useStudioAuth = () => {
  const runtimeConfig = useRuntimeConfig()
  const defaultUsername = runtimeConfig.public.wpAllowedUsername || 'sreejithtravelweb'

  const auth = useState('studio-auth-creds', () => ({
    username: defaultUsername,
    password: ''
  }))
  const isLoggedIn = useState<boolean>('studio-auth-logged-in', () => false)
  const isLoading = useState<boolean>('studio-auth-loading', () => false)
  const isRestoring = useState<boolean>('studio-auth-restoring', () => false)
  const hasCheckedStorage = useState<boolean>('studio-auth-checked', () => false)
  const authError = useState<string>('studio-auth-error', () => '')

  const authHeader = computed(() => {
    const raw = `${auth.value.username.trim()}:${auth.value.password.trim()}`
    if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
      return window.btoa(raw)
    }
    return ''
  })

  const verifySession = async (mode: 'interactive' | 'silent' = 'interactive'): Promise<boolean> => {
    authError.value = ''

    if (auth.value.username.trim().toLowerCase() !== defaultUsername.toLowerCase()) {
      authError.value = `Unauthorized account. Please use ${defaultUsername}.`
      return false
    }

    if (!auth.value.password.trim()) {
      if (mode === 'interactive') {
        authError.value = 'Please enter your 16-character WP Application Password.'
      }
      return false
    }

    isLoading.value = true
    try {
      await $fetch('/api/verify', {
        method: 'POST',
        headers: { Authorization: `Basic ${authHeader.value}` },
        body: { mode }
      })

      safeStorage.set(STORAGE_PASS_KEY, auth.value.password.trim())
      isLoggedIn.value = true
      return true
    } catch (err: any) {
      const msg = err?.data?.statusMessage || err?.message || 'Authentication failed.'
      if (mode === 'interactive') {
        authError.value = msg
      }
      safeStorage.remove(STORAGE_PASS_KEY)
      isLoggedIn.value = false
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    safeStorage.remove(STORAGE_PASS_KEY)
    auth.value.password = ''
    authError.value = ''
    isLoggedIn.value = false
  }

  onMounted(async () => {
    if (hasCheckedStorage.value || isLoggedIn.value) return
    hasCheckedStorage.value = true

    const savedPass = safeStorage.get(STORAGE_PASS_KEY)
    if (savedPass) {
      auth.value.password = savedPass
      isRestoring.value = true
      await verifySession('silent')
      isRestoring.value = false
    }
  })

  return {
    auth,
    authHeader,
    isLoggedIn,
    isLoading,
    isRestoring,
    authError,
    verifySession,
    logout
  }
}