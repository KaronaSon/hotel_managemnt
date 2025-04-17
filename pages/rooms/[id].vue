<template>
  <div class="container mx-auto p-4">
    <div v-if="isLoading" class="text-center">
      <p>Loading room details...</p>
    </div>
    
    <div v-if="error" class="text-center text-red-600">
      <p>{{ error }}</p>
    </div>
    
    <div v-else>
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
  </div>
</template>

<script setup>
const route = useRoute();

const isLoading = ref(true);
const error = ref(null);
const room = ref({
  name: 'Room Not Found',
  status: 'N/A',
  price: 0,
  description: 'Sorry, this room doesn’t exist.',
  photo: '',
});
const message = ref('');

async function fetchRooms() {
  try {
    const { data, error: fetchError } = await useFetch('/api/rooms');
    if (fetchError) {
      error.value = 'Failed to load rooms data';
      return;
    }
    const foundRoom = data.find(r => r.id === route.params.id);
    if (foundRoom) {
      room.value = foundRoom;
    } else {
      room.value = {
        name: 'Room Not Found',
        status: 'N/A',
        price: 0,
        description: 'Sorry, this room doesn’t exist.',
        photo: '',
      };
    }
  } catch (e) {
    error.value = 'An error occurred while fetching the room data.';
  } finally {
    isLoading.value = false;
  }
}

fetchRooms();

async function bookRoom() {
  const response = await $fetch('/api/book', {
    method: 'POST',
    body: { roomId: route.params.id },
  });

  message.value = response.message;
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}

h1 {
  color: #333;
}
</style>
