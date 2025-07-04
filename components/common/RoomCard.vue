<template>
  <div
    class="bg-white rounded-xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
    @click="$emit('click')"
    role="button"
    tabindex="0"
    @keydown.enter="$emit('click')"
    @keydown.space="$emit('click')"
    :aria-label="`View details for ${name}`"
  >
    <img
      v-if="photo"
      :src="photo"
      :alt="name"
      class="w-full h-40 sm:h-48 md:h-56 object-cover max-w-full rounded-t-xl"
      loading="lazy"
    />
    <div v-else class="w-full h-40 sm:h-48 md:h-56 bg-gray-200 flex items-center justify-center rounded-t-xl">
      <span class="text-gray-500 text-sm">No image available</span>
    </div>
    <div class="p-3 sm:p-4 md:p-6">
      <h3 class="text-base sm:text-lg md:text-xl font-display text-gray-800 truncate">{{ name || 'Unnamed Room' }}</h3>
      <p class="text-xs sm:text-sm md:text-base text-gray-600 mt-1 line-clamp-2">{{ description || 'No description available' }}</p>
      <div class="flex justify-between items-center mt-3 sm:mt-4">
        <span class="text-base sm:text-lg md:text-xl font-sans text-indigo-600">${{ price || 'N/A' }}/night</span>
        <div class="flex items-center">
          <svg
            v-for="i in 5"
            :key="i"
            class="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
            :class="i <= Math.round(rating || 0) ? 'text-yellow-400' : 'text-gray-300'"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="sr-only">{{ rating || 0 }}/5 stars</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: 'Unnamed Room',
  },
  price: {
    type: Number,
    default: 0,
  },
  photo: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: 'No description available',
  },
  rating: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 5,
  },
});

defineEmits(['click']);
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

img {
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

[role="button"]:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}
</style>