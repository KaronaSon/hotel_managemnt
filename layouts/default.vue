<template>
    <div>
      <Header />
      <main class="min-h-screen">
        <slot /> <!-- Page content goes here -->
      </main>
      <footer class="bg-gray-200 p-4 text-center mt-8">
        <p>© 2025 Sky Castle Hotel. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script setup>
  import Header from '~/components/common/Header.vue'
  </script>