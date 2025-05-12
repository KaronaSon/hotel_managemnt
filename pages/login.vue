<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md transition-all duration-300 hover:ring-2 hover:ring-blue-100 hover:ring-opacity-50">
      <h1 class="text-3xl font-bold text-center mb-6 text-gray-800 font-serif text-shadow-lg transition-transform transform hover:scale-105 hover:text-blue-400">Login</h1>
      <form @submit.prevent="handleManualLogin" class="mb-6">
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="email">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
            autocomplete="email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2" for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            required
            autocomplete="current-password"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 hover:ring-2 hover:ring-blue-100 hover:ring-opacity-50"
          :disabled="isLoggingIn"
        >
          {{ isLoggingIn ? 'Logging in...' : 'Login' }}
        </button>
      </form>
      <div class="text-center">
        <p class="text-gray-600 mb-4 text-lg italic">Or login with:</p>
        <button
          @click="handleGoogleLogin"
          class="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center gap-2 hover:ring-2 hover:ring-blue-100 hover:ring-opacity-50"
          :disabled="isLoggingIn"
        >
          <svg class="w-6 h-6" viewBox="0 0 24 24">
            <path fill="white" d="M12.545,10.52v3.06h5.744c-.24,1.52-.96,2.74-2.04,3.66l3.29,2.54c2.04-1.88,3.23-4.66,3.23-7.86c0-.74-.06-1.46-.18-2.16h-9.99z"/>
            <path fill="white" d="M12,22c2.7,0,5-1.8,5.88-4.34l-3.29-2.54c-.9.66-2.04,1.06-3.59,1.06-2.76,0-5-2.24-5-5s2.24-5,5-5c1.56,0,2.94.74,3.84,1.88l2.34-2.34C15.84,3.74,14.04,3,12,3c-5,0-9,4-9,9s4,9,9,9z"/>
          </svg>
          Login with Google
        </button>
      </div>
      <p class="mt-4 text-center text-gray-600 text-lg">
        No account? <NuxtLink to="/register" class="text-blue-500 hover:underline">Register here</NuxtLink>
      </p>
      <p v-if="error" class="mt-2 text-center text-red-500 text-lg">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'non-header',
})
import { ref, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')
const isLoggingIn = ref(false)
const userStore = useUserStore()
const router = useRouter()

// Clear form fields and error on mount
onMounted(() => {
  email.value = ''
  password.value = ''
  error.value = ''
  console.log('Login page mounted. isAuthenticated:', userStore.isAuthenticated, 'isRegistering:', userStore.isRegistering)
  if (userStore.isAuthenticated && !userStore.isRegistering) {
    console.log('User already authenticated, redirecting to /')
    router.push('/')
  }
})

async function handleManualLogin() {
  console.log('handleManualLogin called with:', { email: email.value, password: password.value })
  isLoggingIn.value = true
  try {
    const result = userStore.login(email.value, password.value)
    console.log('userStore.login result:', result)
    if (result.success) {
      error.value = ''
      console.log('Login successful, redirecting to /')
      await router.push('/')
    } else {
      error.value = result.error || 'Invalid email or password'
      console.error('Login failed:', result.error)
    }
  } catch (err) {
    error.value = 'Login failed. Please try again.'
    console.error('Login error:', err)
  } finally {
    isLoggingIn.value = false
  }
}

async function handleGoogleLogin() {
  console.log('handleGoogleLogin called')
  if (!window.gapi) {
    error.value = 'Google API not loaded'
    console.error('Google API not loaded')
    return
  }
  isLoggingIn.value = true
  try {
    const googleUser = await window.gapi.auth2.getAuthInstance().signIn()
    const profile = googleUser.getBasicProfile()
    console.log('Google login successful for:', profile.getEmail())
    userStore.setGoogleUser(profile.getEmail())
    userStore.completeRegistration()
    console.log('Google login completed, redirecting to /')
    await router.push('/')
  } catch (err) {
    error.value = 'Google login failed'
    console.error('Google login error:', err)
  } finally {
    isLoggingIn.value = false
  }
}
</script>

<style scoped>
.text-shadow-lg {
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}
</style>