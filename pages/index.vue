<template>
  <div class="container mx-auto p-6">
    <!-- Heading -->
    <div class="flex flex-col gap-4 items-center mb-6">
      <h1
        class="text-3xl font-extrabold text-shadow-md font-display transition-colors hover:text-indigo-500 bg-indigo-50 border-2 border-double border-indigo-400 rounded-xl px-6 py-3 shadow-md hover:shadow-lg hover:border-indigo-600 -ml-72"
      >
        Welcome to
      </h1>
      <h1
        class="text-3xl font-semibold italic text-shadow-md font-sans transition-colors hover:text-indigo-500 bg-indigo-50 border-2 border-double border-indigo-400 rounded-xl px-6 py-3 shadow-md hover:shadow-lg hover:border-indigo-600"
      >
        Hotel Management
      </h1>
    </div>

    <!-- Layout: Main Content + Category Sidebar (Reversed) -->
    <div class="flex flex-row-reverse gap-6">
      <!-- Category Sidebar -->
      <aside class="w-48 shrink-0 space-y-2 relative">
        <!-- Toggle All Categories -->
        <button
          @click="() => {
            selectedCategory = 'All';
            showCategories = !showCategories;
            clickedCategory = 'All';
            setTimeout(() => (clickedCategory = null), 300);
          }"
          class="w-full text-left px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 flex justify-between items-center transition duration-300"
          :class="{
            'ring-2 ring-indigo-300 shadow-md': clickedCategory === 'All',
          }"
        >
          <span>All</span>
          <span class="text-lg">{{ showCategories ? '⌃' : '⌄' }}</span>
        </button>

        <!-- Dropdown Category List -->
        <transition name="fade-slide">
          <div v-if="showCategories" class="space-y-2">
            <button
              v-for="cat in categories.slice(1)"
              :key="cat"
              @click="handleCategoryClick(cat)"
              :class="[
                'w-full text-left px-4 py-2 rounded-lg transition duration-300',
                selectedCategory === cat ? 'bg-indigo-400 text-white' : 'bg-gray-100 hover:bg-gray-200',
                clickedCategory === cat ? 'ring-2 ring-indigo-300 shadow-md' : ''
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </transition>
      </aside>

      <!-- Main Content -->
      <main class="flex-1">
        <!-- Search Input -->
        <div class="relative w-full sm:w-96 mb-6">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search rooms..."
            class="w-full rounded-full bg-gray-100 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 font-sans"
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

        <!-- Loading/Error States -->
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

const userStore = useUserStore()
const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref('All')
const showCategories = ref(false)
const clickedCategory = ref(null)
const categories = [
  'All',
  'Single',
  'Double',
  'Suite',
  'Family',
  'Deluxe',
  'Presidential',
  'Economy',
  'Luxury',
  'Standard',
  'Penthouse',
]

const rooms = ref([])
const loading = ref(true)
const error = ref(null)

watch(
  () => userStore.user,
  (user) => {
    if (!user) {
      router.push('/login')
    }
  },
  { immediate: true }
)

const filteredRooms = computed(() => {
  return rooms.value.filter((room) => {
    const matchesName = room.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory =
      selectedCategory.value === 'All' || room.category === selectedCategory.value
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

const handleCategoryClick = (cat) => {
  selectedCategory.value = cat
  clickedCategory.value = cat
  setTimeout(() => {
    clickedCategory.value = null
  }, 300)
}

const isVisible = ref(false)
let observer = null

onMounted(() => {
  fetchRooms()
  const element = document.querySelector('h1')
  if (element) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.value = entry.isIntersecting
        })
      },
      { threshold: 0.5 }
    )
    observer.observe(element)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
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
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
