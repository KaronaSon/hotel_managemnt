<template>
  <div class="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
    <!-- Layout: Main Content -->
    <div class="flex flex-row-reverse gap-4 sm:gap-6">
      <!-- Main Content -->
      <main class="flex-1">
        <!-- Toolbar container -->
        <div class="flex flex-wrap justify-between items-center gap-2 mb-6">
          <!-- Search -->
          <div class="relative flex-1 min-w-[200px] max-w-md">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search rooms..."
              class="w-full rounded-full bg-gray-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 font-sans shadow-sm"
              aria-label="Search rooms"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
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

          <!-- Category Dropdown -->
          <div class="relative inline-block text-left w-full sm:w-auto" ref="dropdownRef">
            <button
              @click.stop="toggleCategories"
              class="w-full sm:w-auto text-gray-800 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-xl text-sm px-4 sm:px-6 py-2.5 text-center inline-flex items-center justify-center shadow-sm transition duration-300"
              type="button"
            >
              {{ selectedCategory }}
              <svg
                class="w-2.5 h-2.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <!-- Dropdown menu -->
            <transition name="fade">
              <div
                v-show="showCategories"
                class="absolute z-20 mt-2 bg-white divide-y divide-gray-100 rounded-xl shadow-xl w-11/12 sm:w-96 min-w-[160px] max-w-[90%] max-w-full max-h-60 overflow-y-auto overflow-x-hidden right-0 left-auto will-change-opacity"
              >
                <ul class="py-2 px-1 text-sm text-gray-800 font-sans">
                  <li
                    @click="handleCategoryClick('All')"
                    class="cursor-pointer px-2 py-3 text-base font-semibold rounded-t-xl bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 ring-2 ring-indigo-300 shadow-sm hover:bg-indigo-50 text-wrap"
                  >
                    🌐 All Categories
                  </li>
                  <li class="border-t border-gray-200 my-1"></li>
                  <li
                    v-for="category in categories"
                    :key="category"
                    @click="handleCategoryClick(category)"
                    class="cursor-pointer block px-2 py-2 rounded-md transition-all duration-200 hover:bg-gray-100 text-wrap"
                    :class="[category === selectedCategory ? 'bg-indigo-100 text-indigo-700 font-medium' : '']"
                  >
                    {{ category }}
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>

        <!-- States -->
        <div v-if="loading" class="text-center mt-8 text-gray-600 text-lg">Loading rooms...</div>
        <div v-else-if="error" class="text-center mt-8 text-red-500 text-lg">{{ error }}</div>
        <div v-else-if="filteredRooms.length === 0" class="text-center mt-8 text-gray-600 text-lg">No rooms found.</div>

        <!-- Room Cards -->
        <div v-else class="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <RoomCard
            v-for="room in filteredRooms"
            :key="room.id"
            :id="room.id"
            :name="room.name"
            :price="room.price"
            :photo="room.photo"
            :description="room.description"
            :rating="room.rating"
            @click="$router.push(`/room/${room.id}`)"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'
import RoomCard from '~/components/common/RoomCard.vue'

// Define Category type
type Category =
  | 'Single Room'
  | 'Double Room'
  | 'Suite Room'
  | 'Family Room'
  | 'Deluxe Suite'
  | 'Presidential Suite'
  | 'Economy Room'
  | 'Luxury Room'
  | 'Standard Room'
  | 'Penthouse Suite'

// Define Room type based on room.js
interface Room {
  id: string
  name: string
  status: 'Available' | 'Booked'
  price: number
  description: string
  photo: string
  rating: number
  category: Category
}

const userStore = useUserStore()
const router = useRouter()

const searchQuery = ref<string>('')
const selectedCategory = ref<string>('All') // Allow 'All' for dropdown
const showCategories = ref<boolean>(false)
const dropdownRef = ref<HTMLElement | null>(null)

const categories: Category[] = [
  'Single Room',
  'Double Room',
  'Suite Room',
  'Family Room',
  'Deluxe Suite',
  'Presidential Suite',
  'Economy Room',
  'Luxury Room',
  'Standard Room',
  'Penthouse Suite',
]

const rooms = ref<Room[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

watch(
  () => userStore.isAuthenticated,
  (isAuthenticated: boolean) => {
    if (!isAuthenticated) router.push('/login')
  },
  { immediate: true }
)

const filteredRooms = computed<Room[]>(() => {
  return rooms.value.filter((room) => {
    const matchesName = room.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || room.category === selectedCategory.value
    return matchesName && matchesCategory
  })
})

const fetchRooms = async () => {
  try {
    loading.value = true
    const { data } = await useFetch<Room[]>('/api/rooms')
    rooms.value = data.value || []
    error.value = null
  } catch (err) {
    error.value = 'Failed to load rooms. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleCategoryClick = (category: string) => {
  selectedCategory.value = category
  showCategories.value = false
}

const toggleCategories = async () => {
  showCategories.value = !showCategories.value
  if (showCategories.value) {
    await nextTick() // Ensure DOM is updated before rendering dropdown
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    showCategories.value = false
  }
}

onMounted(() => {
  fetchRooms()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');

.font-display {
  font-family: 'Playfair Display', serif;
}

.font-sans {
  font-family: 'Inter', sans-serif;
}

.text-shadow-md {
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.will-change-opacity {
  will-change: opacity;
}
</style>