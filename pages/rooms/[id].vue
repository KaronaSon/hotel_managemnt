<template>
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">{{ room.name }}</h1>
      <div class="relative mb-6">
        <img
          :src="room.photo"
          :alt="room.name"
          class="w-full max-h-[500px] object-cover rounded-lg"
        />
        <span
          :class="[
            'absolute top-4 right-4 px-3 py-1 text-lg font-semibold text-white rounded',
            room.status === 'Available' ? 'bg-green-500' : 'bg-red-500'
          ]"
        >
          {{ room.status }}
        </span>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <p class="mb-2"><strong>Price:</strong> ${{ room.price }} / night</p>
          <p class="mb-4"><strong>Description:</strong> {{ room.description }}</p>
        </div>
        <div>
          <form v-if="room.status === 'Available'" @submit.prevent="bookRoom">
            <button
              type="submit"
              class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 w-full"
            >
              Book Now
            </button>
            <p v-if="message" class="mt-2 text-green-600">{{ message }}</p>
          </form>
          <p v-else class="text-red-600 text-center">This room is currently booked.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const route = useRoute()
  const { data: rooms } = await useFetch('/api/rooms')
  const room = computed(() => rooms.value.find(r => r.id === route.params.id) || {
    name: 'Room Not Found',
    status: 'N/A',
    price: 0,
    description: 'Sorry, this room doesn’t exist.',
    photo: '/images/rooms/not-found.jpg',
  })
  
  const message = ref('')
  async function bookRoom() {
    const response = await $fetch('/api/book', {
      method: 'POST',
      body: { roomId: route.params.id },
    })
    message.value = response.message
  }
  </script>