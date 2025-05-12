<template>
    <div class="min-h-screen bg-blue-100 flex flex-col items-center justify-center py-8">
      <!-- Promotional Section -->
      <section class="bg-blue-200 rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row items-center max-w-6xl w-full mx-4 lg:mx-auto">
        <!-- Image Section -->
        <div class="w-full lg:w-1/2 relative flex justify-center items-center p-4 lg:p-8">
          <div class="rounded-lg overflow-hidden shadow-md w-full">
            <img
              src="https://i.pinimg.com/736x/cf/ac/5a/cfac5a9621b75915922aabf962cae8fa.jpg"
              alt="Hotel staff assisting guests"
              class="w-full h-64 lg:h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
  
        <!-- Content Section -->
        <div class="w-full lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center text-center lg:text-left">
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Elevate Your Hotel Management
          </h1>
          <p class="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
            Streamline operations, enhance guest experiences, and boost your hotel's growth with our expert management solutions.
          </p>
          <ul class="mb-6 space-y-2 text-left mx-auto lg:mx-0 max-w-xs">
            <li class="flex items-center text-gray-800">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="font-medium">Efficient Operations</span>
            </li>
            <li class="flex items-center text-gray-800">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="font-medium">Expert Staff Training</span>
            </li>
            <li class="flex items-center text-gray-800">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="font-medium">Guest Satisfaction Focus</span>
            </li>
            <li class="flex items-center text-gray-800">
              <svg class="w-5 h-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="font-medium">24/7 Support</span>
            </li>
          </ul>
  
          <!-- Statistic Badge -->
          <div class="bg-white rounded-lg shadow-md p-4 mb-6 inline-block">
            <div class="flex items-center">
              <div class="bg-blue-200 rounded-full p-2 mr-2">
                <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5-5 5M6 17l5-5-5-5" />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900">85%</h3>
                <p class="text-sm text-gray-600">Increase in guest satisfaction</p>
              </div>
            </div>
          </div>
  
          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
            <button class="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition">
              Get Started
            </button>
            <NuxtLink
              to="/contact"
              class="bg-blue-300 text-gray-900 px-6 py-3 rounded-lg shadow-md hover:bg-blue-400 transition"
            >
              Contact Us
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
  
  * {
    font-family: 'Inter', sans-serif;
  }
  
  @media (max-width: 639px) {
    .h-64 {
      height: 40vh;
    }
    h1 {
      font-size: 1.875rem;
    }
    p {
      font-size: 0.875rem;
    }
  }
  
  @media (min-width: 640px) and (max-width: 1023px) {
    .h-64 {
      height: 50vh;
    }
  }
  
  @media (min-width: 1024px) {
    .h-64 {
      height: auto;
    }
  }
  </style>