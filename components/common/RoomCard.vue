<template>
  <div
    class="room-card bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    @click="$emit('click')"
  >
    <!-- Room Image with responsive height -->
    <div class="relative w-full h-48 sm:h-56 lg:h-64">
      <img
        :src="photo"
        :alt="name"
        class="w-full h-full object-cover rounded-t-xl"
        loading="lazy"
      />
      <!-- Rating Badge -->
      <div class="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
        {{ rating.toFixed(1) }} ★
      </div>
    </div>

    <!-- Room Info -->
    <div class="p-4 sm:p-5">
      <h3 class="font-bold text-base sm:text-lg lg:text-xl text-gray-800 font-display truncate">{{ name }}</h3>
      <p class="text-sm text-gray-600 mt-1 sm:mt-2 line-clamp-2">{{ description }}</p>

      <!-- Rating Stars -->
      <div class="flex items-center gap-1 text-yellow-400 my-2 sm:my-3">
        <template v-for="i in 5" :key="i">
          <svg
            v-if="i <= Math.floor(rating)"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 sm:h-5 sm:w-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.685a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.125 2.273a1 1 0 00-.364 1.118l1.2 3.684c.3.922-.755 1.688-1.539 1.118L10 13.347l-3.123 2.273c-.784.57-1.838-.196-1.54-1.118l1.201-3.684a1 1 0 00-.364-1.118L3.05 9.112c-.782-.57-.38-1.81.588-1.81h3.863a1 1 0 00.95-.69l1.2-3.685z"/>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 sm:h-5 sm:w-5 text-gray-300"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.685a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.125 2.273a1 1 0 00-.364 1.118l1.2 3.684c.3.922-.755 1.688-1.539 1.118L10 13.347l-3.123 2.273c-.784.57-1.838-.196-1.54-1.118l1.201-3.684a1 1 0 00-.364-1.118L3.05 9.112c-.782-.57-.38-1.81.588-1.81h3.863a1 1 0 00.95-.69l1.2-3.685z"/>
          </svg>
        </template>
      </div>

      <!-- Price -->
      <p class="mt-2 text-lg sm:text-xl font-semibold text-indigo-600">${{ price.toFixed(2) }} / night</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: { type: [String, Number], required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  photo: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, required: true },
})

defineEmits(['click'])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');

.font-display {
  font-family: 'Playfair Display', serif;
}

.font-sans {
  font-family: 'Inter', sans-serif;
}

.room-card {
  border: none;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* Fallback for older browsers */
  line-clamp: 2; /* Standard property for modern browsers */
}
</style>