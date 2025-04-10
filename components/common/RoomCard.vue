<template>
    <NuxtLink
      :to="`/rooms/${id}`"
      :class="[
        'block p-4 rounded-lg shadow hover:shadow-lg transition',
        status === 'Available' ? 'bg-green-100' : 'bg-red-100'
      ]"
    >
      <div class="relative">
        <img
          :src="photo"
          :alt="name"
          class="w-full h-56 object-cover rounded-md mb-4"
        />
        <span
          :class="[
            'absolute top-2 right-2 px-2 py-1 text-sm font-semibold text-white rounded',
            status === 'Available' ? 'bg-green-500' : 'bg-red-500'
          ]"
        >
          {{ status }}
        </span>
      </div>
      <h2 class="text-xl font-semibold">{{ name }}</h2>
      <p class="text-gray-800 font-bold">${{ price }} / night</p>
    </NuxtLink>
  </template>
  
  <script setup>
  defineProps({
    id: String,
    name: String,
    status: String,
    price: Number,
    photo: String,
  })
  </script>