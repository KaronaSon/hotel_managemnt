<template>
  <div class="container mx-auto p-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition duration-300">
      <h1 class="text-2xl font-bold text-shadow-lg font-serif transition-transform transform hover:scale-105 hover:text-blue-400">
        Welcome to
      </h1>
      <h1 class="text-2xl font-bold text-shadow-lg font-serif transition-transform transform hover:scale-105 hover:text-blue-400">
        Hotel Management
      </h1>

      <div class="relative w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search rooms..."
          class="pl-4 pr-10 py-2 w-full rounded-full bg-gray-100 text-gray-700 placeholder-gray-500
                 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 13.65z"
          />
        </svg>
      </div>
    </div>
    <div class="grid gap-4 mt-6 md:grid-cols-2 lg:grid-cols-3">
      <RoomCard
        v-for="room in rooms"
        :key="room.id"
        :id="room.id"
        :name="room.name"
        :status="room.status"
        :price="room.price"
        :photo="room.photo"
      />
    </div>

    <button class="rounded bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-6">
      Save Changes
    </button>
  </div>
</template>

<script setup async>
import RoomCard from '~/components/common/RoomCard.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

// Redirect if not logged in
if (!userStore.user) {
  // router.push('/login')
}

const { data: rooms } = await useFetch('/api/rooms')
const isVisible = ref(false)
let observer = null

onMounted(() => {
  const element = document.querySelector('h1')
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting
      })
    },
    { threshold: 0.5 }
  )
  if (element) observer.observe(element)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.text-shadow-lg {
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
}
</style>
