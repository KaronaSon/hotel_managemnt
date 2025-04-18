<template>
  <div class="container mx-auto p-6">
    <!-- Layout: Main Content + Category Sidebar (Reversed) -->
    <div class="flex flex-row-reverse gap-6">
      <!-- Main Content -->
      <main class="flex-1">
        <!-- Tool bar container -->
        <div class="flex flex-wrap justify-between items-center gap-4 mb-6">
          <!-- Search -->
          <div class="relative flex-1 min-w-[250px] max-w-md">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search rooms..."
              class="w-full rounded-full bg-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 font-sans"
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
          <div class="relative inline-block text-left" ref="dropdownRef">
            <button
              @click.stop="showCategories = !showCategories"
              class="text-gray-700 bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-16 py-2.5 text-center inline-flex items-center dark:bg-gray-200 dark:hover:bg-gray-400 dark:focus:ring-gray-300"
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
            <transition name="fade-slide">
              <div
                v-show="showCategories"
                class="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-100"
              >
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-800">
                  <!-- All -->
                  <li
                    @click="handleCategoryClick('All')"
                    :class="[
                      'cursor-pointer px-4 py-3 text-base font-semibold rounded-t-lg',
                      selectedCategory === 'All'
                        ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 ring-2 ring-blue-300 shadow-sm'
                        : 'hover:bg-indigo-700 text-blue-600'
                    ]"
                  >
                    🌐 All Categories
                  </li>

                  <!-- Divider -->
                  <li class="border-t border-gray-200 my-1"></li>

                  <!-- Other categories -->
                  <li
                    v-for="category in categories"
                    :key="category"
                    @click="handleCategoryClick(category)"
                    :class="[
                      'cursor-pointer block px-4 py-2 rounded-md transition-all duration-200',
                      category === selectedCategory
                        ? 'bg-indigo-200 text-indigo-700 font-medium'
                        : 'hover:bg-gray-300 dark:hover:bg-gray-600 dark:hover:text-white'
                    ]"
                  >
                    {{ category }}
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>

        <!-- States -->
        <div v-if="loading" class="text-center mt-8">Loading rooms...</div>
        <div v-else-if="error" class="text-center mt-8 text-red-500">{{ error }}</div>
        <div v-else-if="filteredRooms.length === 0" class="text-center mt-8">No rooms found.</div>

        <!-- Room Cards -->
        <div v-else class="grid gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3">
          <RoomCard
            v-for="room in filteredRooms"
            :key="room.id"
            :id="room.id"
            :name="room.name"
            :price="room.price"
            :photo="room.photo"
            :description="room.description"
            :rating="room.rating"
            @click="$router.push('/room/${room.id}')"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'
import RoomCard from '~/components/common/RoomCard.vue'
import { nextTick } from 'vue'

const userStore = useUserStore()
const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('All')
const showCategories = ref(false)
const dropdownRef = ref(null)

const categories = [
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

const rooms = ref([])
const loading = ref(true)
const error = ref(null)

watch(
  () => userStore.user,
  (user) => {
    if (!user) router.push('/login')
  },
  { immediate: true }
)

const filteredRooms = computed(() => {
  return rooms.value.filter((room) => {
    const matchesName = room.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || room.category === selectedCategory.value
    return matchesName && matchesCategory
  })
})

const fetchRooms = async () => {
  try {
    loading.value = true
    const { data } = await useFetch('/api/rooms')
    rooms.value = data.value || []
    error.value = null
  } catch (err) {
    error.value = 'Failed to load rooms. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleCategoryClick = (category) => {
  selectedCategory.value = category
  showCategories.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
