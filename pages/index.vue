<!-- pages/index.vue -->
<template>
  <div class="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl">
    <!-- Main Content -->
    <div class="flex flex-col sm:flex-row-reverse gap-4 sm:gap-6">
      <main class="flex-1">
        <!-- Toolbar: Search and Category Dropdown -->
        <div class="flex flex-col sm:flex-row sm:flex-wrap justify-between items-center gap-4 mb-6">
          <!-- Search -->
          <div class="relative flex-1 w-full sm:w-auto min-w-[200px] max-w-md">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search rooms..."
              class="w-full rounded-full bg-gray-100 px-4 py-3 text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 font-sans shadow-sm"
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
          <div class="relative w-full sm:w-auto" ref="dropdownRef">
            <button
              @click.stop="toggleCategories"
              class="w-full sm:w-auto text-gray-800 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-xl text-sm px-4 py-2.5 sm:px-6 sm:py-3 text-center inline-flex items-center justify-center shadow-sm transition duration-300"
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
            <transition name="fade">
              <div
                v-show="showCategories"
                class="absolute z-20 mt-2 bg-white divide-y divide-gray-100 rounded-xl shadow-xl w-full sm:w-72 min-w-[160px] max-w-[90vw] max-h-60 overflow-y-auto right-0 left-auto"
              >
                <ul class="py-2 px-1 text-sm sm:text-base text-gray-800 font-sans">
                  <li
                    @click="handleCategoryClick('All')"
                    class="cursor-pointer px-3 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-t-xl bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 ring-2 ring-indigo-300 shadow-sm hover:bg-indigo-50 text-wrap"
                  >
                    🌐 All Categories
                  </li>
                  <li class="border-t border-gray-200 my-1"></li>
                  <li
                    v-for="category in categories"
                    :key="category"
                    @click="handleCategoryClick(category)"
                    class="cursor-pointer block px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-100 text-wrap"
                    :class="[category === selectedCategory ? 'bg-indigo-100 text-indigo-700 font-medium' : '']"
                  >
                    {{ category }}
                  </li>
                </ul>
              </div>
            </transition>
          </div>
        </div>

        <!-- Loading/Error/No Results States -->
        <div v-if="loading" class="text-center mt-8 text-gray-600 text-base sm:text-lg">Loading rooms...</div>
        <div v-else-if="error" class="text-center mt-8 text-red-500 text-base sm:text-lg">{{ error }}</div>
        <div v-else-if="filteredRooms.length === 0" class="text-center mt-8 text-gray-600 text-base sm:text-lg">No rooms found.</div>

        <!-- Room Cards Grid -->
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
            @image-click="openRoomModal(room)"
          />
        </div>

        <!-- Room Detail Modal -->
        <transition name="modal">
          <div v-if="showRoomModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-0">
            <div class="bg-white rounded-xl shadow-xl w-full max-w-md sm:max-w-lg mx-4 sm:mx-0 p-6 max-h-[90vh] overflow-y-auto">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl sm:text-2xl font-display text-gray-800 truncate">{{ selectedRoom?.name }}</h2>
                <button @click="closeRoomModal" class="text-gray-500 hover:text-gray-700">
                  <svg
                    class="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <img
                :src="selectedRoom?.photo"
                :alt="selectedRoom?.name"
                class="w-full h-48 sm:h-64 object-cover rounded-xl mb-4 max-w-full"
                loading="lazy"
              />
              <p class="text-sm sm:text-base text-gray-600 mb-2"><strong>Category:</strong> {{ selectedRoom?.category }}</p>
              <p class="text-sm sm:text-base text-gray-600 mb-2"><strong>Description:</strong> {{ selectedRoom?.description }}</p>
              <p class="text-sm sm:text-base text-gray-600 mb-2"><strong>Price:</strong> ${{ selectedRoom?.price }}/night</p>
              <p class="text-sm sm:text-base text-gray-600 mb-2"><strong>Rating:</strong> {{ selectedRoom?.rating }}/5</p>
              <p class="text-sm sm:text-base mb-4">
                <strong>Status:</strong>
                <span
                  :class="[
                    selectedRoom?.status === 'Available' ? 'text-green-600' : 'text-red-600',
                    'font-medium'
                  ]"
                >
                  {{ selectedRoom?.status }}
                </span>
              </p>
              <button
                v-if="selectedRoom?.status === 'Available'"
                @click="addToCart(selectedRoom)"
                class="w-full bg-indigo-600 text-white rounded-xl py-3 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300 font-sans shadow-sm disabled:opacity-50"
                :disabled="selectedRoom ? cartStore.isInCart(selectedRoom.id) : true"
              >
                {{ selectedRoom && cartStore.isInCart(selectedRoom.id) ? 'Already in Cart' : 'Add to Cart' }}
              </button>
              <button
                v-else
                class="w-full bg-gray-300 text-gray-600 rounded-xl py-3 px-4 cursor-not-allowed font-sans shadow-sm"
                disabled
              >
                Booked
              </button>
            </div>
          </div>
        </transition>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useUserStore } from '~/stores/user';
import { useRouter } from 'vue-router';
import { useCartStore } from '~/stores/cart';
import RoomCard from '~/components/common/RoomCard.vue';

const userStore = useUserStore();
const router = useRouter();
const cartStore = useCartStore();

const searchQuery = ref('');
const selectedCategory = ref('All');
const showCategories = ref(false);
const dropdownRef = ref(null);
const showRoomModal = ref(false);
const selectedRoom = ref(null);

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
];

const rooms = ref([]);
const loading = ref(true);
const error = ref(null);

watch(
  () => userStore.isAuthenticated,
  (isAuthenticated) => {
    if (!isAuthenticated) router.push('/login');
  },
  { immediate: true }
);

const filteredRooms = computed(() => {
  return rooms.value.filter((room) => {
    const matchesName = room.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'All' || room.category === selectedCategory.value;
    return matchesName && matchesCategory;
  });
});

const fetchRooms = async () => {
  try {
    loading.value = true;
    const { data } = await useFetch('/api/rooms');
    rooms.value = data.value || [];
    error.value = null;
  } catch (err) {
    error.value = 'Failed to load rooms. Please try again.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const handleCategoryClick = (category) => {
  selectedCategory.value = category;
  showCategories.value = false;
};

const toggleCategories = async () => {
  showCategories.value = !showCategories.value;
  if (showCategories.value) {
    await nextTick();
  }
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showCategories.value = false;
  }
};

const openRoomModal = (room) => {
  selectedRoom.value = room;
  showRoomModal.value = true;
};

const closeRoomModal = () => {
  showRoomModal.value = false;
  selectedRoom.value = null;
};

const addToCart = (room) => {
  if (room) {
    cartStore.addToCart(room);
  }
};

onMounted(() => {
  fetchRooms();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
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

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.will-change-opacity {
  will-change: opacity;
}

img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}
</style>