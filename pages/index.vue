<template>
  <div class="container mx-auto p-4">
    <div
      :class="[
        'text-center transition duration-300',
        isVisible ? 'ring-2 ring-blue-100 ring-opacity-50' : '',
        'hover:ring-2 hover:ring-blue-100 hover:ring-opacity-50'
      ]"
    >
      <h1 class="text-3xl font-bold mb-4 text-shadow-lg font-serif transition-transform transform hover:scale-105 hover:text-blue-400">
        Hotel Management
      </h1>
      <p class="mb-6 text-lg text-gray-600">Available Rooms Overview</p>
    </div>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
