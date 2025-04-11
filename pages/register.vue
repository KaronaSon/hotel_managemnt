<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
    <div class="bg-white p-8 rounded-xl shadow-md w-full max-w-md transition-all duration-300 hover:ring-2 hover:ring-blue-100 hover:ring-opacity-50">
      <h1 class="text-3xl font-bold text-center mb-6 text-gray-800 font-serif text-shadow-lg transition-transform transform hover:scale-105 hover:text-blue-400">Register</h1>
      <form @submit.prevent="handleManualRegister" class="mb-6">
        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-2" for="email">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2" for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Create a password"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300 hover:ring-2 hover:ring-blue-100 hover:ring-opacity-50"
        >
          Register
        </button>
      </form>
      <div class="text-center">
        <p class="text-gray-600 mb-4 text-lg italic">Or register with:</p>
        <button
          @click="handleGoogleLogin"
          class="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center gap-2 hover:ring-2 hover:ring-blue-100 hover:ring-opacity-50"
        >
          <svg class="w-6 h-6" viewBox="0 0 24 24">
            <path fill="white" d="M12.545,10.52v3.06h5.744c-.24,1.52-.96,2.74-2.04,3.66l3.29,2.54c2.04-1.88,3.23-4.66,3.23-7.86c0-.74-.06-1.46-.18-2.16h-9.99z"/>
            <path fill="white" d="M12,22c2.7,0,5-1.8,5.88-4.34l-3.29-2.54c-.9.66-2.04,1.06-3.59,1.06-2.76,0-5-2.24-5-5s2.24-5,5-5c1.56,0,2.94.74,3.84,1.88l2.34-2.34C15.84,3.74,14.04,3,12,3c-5,0-9,4,9,9s4,9,9,9z"/>
          </svg>
          Sign up with Google
        </button>
      </div>
      <p class="mt-4 text-center text-gray-600 text-lg">
        Already have an account? <NuxtLink to="/login" class="text-blue-500 hover:underline">Login here</NuxtLink>
      </p>
      <p v-if="message" class="mt-2 text-center text-green-500 text-lg">{{ message }}</p>
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
const message = ref('')
const userStore = useUserStore()
const router = useRouter()

function handleManualRegister() {
  if (userStore.register(email.value, password.value)) {
    message.value = 'Registration successful! Redirecting to login...'
    setTimeout(() => router.push('/login'), 2000)
  }
}

function handleGoogleLogin() {
  if (!window.gapi) {
    message.value = 'Google API not loaded'
    return
  }
  window.gapi.auth2.getAuthInstance().signIn().then(
    (googleUser) => {
      const profile = googleUser.getBasicProfile()
      userStore.setGoogleUser(profile.getEmail())
      router.push('/')
    },
    (err) => {
      message.value = 'Google registration failed'
      console.error(err)
    }
  )
}

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://apis.google.com/js/api.js'
  script.async = true
  script.onload = () => {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: 'YOUR_GOOGLE_CLIENT_ID',
        scope: 'profile email',
      })
    })
  }
  document.body.appendChild(script)
})
</script>

<style scoped>
.text-shadow-lg {
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}
</style>