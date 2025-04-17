<template>
  <div class="room-card">
    <!-- Room Image with fixed height -->
    <img
      :src="photo"
      alt="Room image"
      class="w-full h-52 object-cover rounded-t-lg"
    />
    
    <!-- Room Info -->
    <div class="p-4">
      <h3 class="font-bold text-lg mb-1">{{ name }}</h3>
      <p class="text-sm text-gray-600 line-clamp-2">{{ description }}</p>
      
      <!-- Rating Stars -->
      <div class="flex items-center gap-1 text-yellow-400 my-2">
        <template v-for="i in 5" :key="i">
          <svg 
            v-if="i <= rating"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.685a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.125 2.273a1 1 0 00-.364 1.118l1.2 3.684c.3.922-.755 1.688-1.539 1.118L10 13.347l-3.123 2.273c-.784.57-1.838-.196-1.54-1.118l1.201-3.684a1 1 0 00-.364-1.118L3.05 9.112c-.782-.57-.38-1.81.588-1.81h3.863a1 1 0 00.95-.69l1.2-3.685z"/>
          </svg>
          <svg 
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-300"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.685a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.125 2.273a1 1 0 00-.364 1.118l1.2 3.684c.3.922-.755 1.688-1.539 1.118L10 13.347l-3.123 2.273c-.784.57-1.838-.196-1.54-1.118l1.201-3.684a1 1 0 00-.364-1.118L3.05 9.112c-.782-.57-.38-1.81.588-1.81h3.863a1 1 0 00.95-.69l1.2-3.685z"/>
          </svg>
        </template>
      </div>

      <!-- Price -->
      <p class="mt-2 text-xl font-semibold text-indigo-600">${{ price }} / night</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  name: String,
  price: Number,
  photo: String,
  description: String,
  rating: Number,
})
</script>

<style scoped>
.room-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: white;
}
.room-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}
</style>
