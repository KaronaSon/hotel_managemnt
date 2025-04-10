<template>
    <header class="bg-gray-800 text-white p-4">
        <nav class="container mx-auto flex justify-between items-center">
            <NuxtLink to="/" class="text-2xl font-bold">Horizon Hotel</NuxtLink>
            <div class="space-x-4">
                <NuxtLink to="/" class="hover:underline">Dashboard</NuxtLink>
                <NuxtLink to="/about" class="hover:underline">About</NuxtLink>
                <NuxtLink to="/rooms/101" class="hover:underline">Rooms</NuxtLink>
            </div>
        </nav>
    </header>
</template>
<script setup>
</script>