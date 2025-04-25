<template>
  <header class="bg-gray-800 text-white p-4 relative">
    <nav class="container mx-auto flex justify-between items-center">
      <!-- Logo and Sky Castle Title -->
      <NuxtLink 
        to="/" 
        class="flex items-center space-x-3 group transition duration-300"
      >
        <!-- Circular Logo Container with Blur -->
        <div 
          class="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-125 shadow-[0_4px_15px_rgba(255,255,255,0.5)] group-hover:shadow-[0_8px_20px_rgba(255,255,255,0.7)]"
        >
          <img 
            src="https://i.pinimg.com/736x/c1/51/e1/c151e1a742dea9d5f943383bc70f39be.jpg" 
            alt="Sky Castle Logo" 
            class="w-10 h-10 object-cover"
          />
        </div>

        <!-- Sky Castle Gradient Text -->
        <span 
          :class="{'animate-fall': menuOpen}"
          class="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wide hover:brightness-125 transition duration-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.6)] group-hover:scale-90"
        >
          Sky Castle
        </span>
      </NuxtLink>

      <!-- Navigation Links (hidden on small screens, shown on medium screens and up) -->
      <div class="space-x-4 hidden md:flex">
        <NuxtLink 
          to="/" 
          class="text-lg font-semibold text-gray-300 transition duration-300 focus:outline-none
                 hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 
                 hover:bg-clip-text hover:text-transparent 
                 active:brightness-150 active:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        >
          Dashboard
        </NuxtLink>

        <NuxtLink 
          to="/rooms/101" 
          class="text-lg font-semibold text-gray-300 transition duration-300 focus:outline-none
                 hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 
                 hover:bg-clip-text hover:text-transparent 
                 active:brightness-150 active:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        >
          Booking
        </NuxtLink>

        <NuxtLink 
          to="/about" 
          class="text-lg font-semibold text-gray-300 transition duration-300 focus:outline-none
                 hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 
                 hover:bg-clip-text hover:text-transparent 
                 active:brightness-150 active:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        >
          About
        </NuxtLink>
      </div>

      <!-- Mobile Menu Toggle Button -->
      <div class="md:hidden flex items-center">
        <button @click="toggleMenu" class="text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu (hidden by default, positioned to the right) -->
    <div
      v-if="menuOpen"
      class="md:hidden absolute right-4 top-16 w-48 bg-gray-800 text-white flex flex-col space-y-4 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out transform"
    >
      <NuxtLink
        to="/"
        class="text-lg font-semibold text-gray-300 transition duration-300 focus:outline-none
               hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 
               hover:bg-clip-text hover:text-transparent 
               active:brightness-150 active:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] px-4"
      >
        Home
      </NuxtLink>

      <NuxtLink
        to="/rooms/101"
        class="text-lg font-semibold text-gray-300 transition duration-300 focus:outline-none
               hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 
               hover:bg-clip-text hover:text-transparent 
               active:brightness-150 active:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] px-4"
      >
        Booking
      </NuxtLink>

      <NuxtLink
        to="/about"
        class="text-lg font-semibold text-gray-300 transition duration-300 focus:outline-none
               hover:bg-gradient-to-r hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 
               hover:bg-clip-text hover:text-transparent 
               active:brightness-150 active:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] px-4"
      >
        About
      </NuxtLink>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<style scoped>
/* Animation for the falling effect */
@keyframes fall {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fall {
  animation: fall 0.5s ease-out forwards;
}

/* Ensure gradient text works in Webkit browsers */
.text-transparent {
  -webkit-text-fill-color: transparent;
}
</style>