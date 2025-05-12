<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <main class="container mx-auto px-4 sm:px-6 max-w-6xl py-10 flex-grow">
        <h1 class="text-3xl font-display text-gray-800 mb-6">Booking Confirmed</h1>
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-xl font-sans text-gray-800 mb-4">Your Booking Details</h2>
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-indigo-50 text-gray-700">
                <th class="p-2">Your Destination</th>
                <th class="p-2">Check In</th>
                <th class="p-2">Check Out</th>
                <th class="p-2">Name Room</th>
                <th class="p-2">Adults</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200">
                <td class="p-2">{{ bookingDetails.roomName || 'Not available' }}</td>
                <td class="p-2">{{ formatDate(bookingDetails.checkInDate) || 'Not available' }}</td>
                <td class="p-2">{{ formatDate(bookingDetails.checkOutDate) || 'Not available' }}</td>
                <td class="p-2">{{ bookingDetails.roomName || 'Unknown' }}</td>
                <td class="p-2">{{ bookingDetails.numberOfGuests || 1 }}</td>
              </tr>
            </tbody>
          </table>
          <NuxtLink
            to="/rooms"
            class="mt-6 inline-block text-indigo-600 hover:underline font-sans"
            aria-label="Back to rooms list"
          >
            Back to Rooms
          </NuxtLink>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  import { onMounted, ref } from 'vue';
  
  const route = useRoute();
  const bookingDetails = ref({
    roomName: route.query.roomName || null,
    checkInDate: route.query.checkInDate || null,
    checkOutDate: route.query.checkOutDate || null,
    numberOfGuests: route.query.guests || null
  });
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');
  
  .font-display {
    font-family: 'Playfair Display', serif;
  }
  
  .font-sans {
    font-family: 'Inter', sans-serif;
  }
  </style>