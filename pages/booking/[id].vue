<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
      <!-- Main Content -->
      <main class="container mx-auto px-4 sm:px-6 max-w-6xl py-10 flex-grow">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-10">
          <svg
            class="animate-spin h-8 w-8 mx-auto text-indigo-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p class="mt-2 text-gray-600">Loading room details...</p>
        </div>
  
        <!-- Error State -->
        <div v-else-if="error" class="text-center py-10 bg-pink-50 rounded-lg p-6 shadow-md">
          <p class="text-pink-600">{{ error }}</p>
          <button
            @click="fetchRoom"
            class="mt-4 text-indigo-600 hover:underline font-sans"
            aria-label="Retry loading room"
          >
            Try Again
          </button>
          <NuxtLink
            to="/rooms"
            class="mt-2 text-indigo-600 hover:underline font-sans"
            aria-label="Back to rooms list"
          >
            Back to Rooms
          </NuxtLink>
        </div>
  
        <!-- Booking Content -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Room Details -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="image-container mb-4">
              <img
                v-if="room?.photo"
                :src="room.photo"
                :alt="room.name"
                class="room-image rounded-lg shadow-lg"
                loading="lazy"
                decoding="async"
              />
              <p v-else class="text-gray-500 text-center py-8 bg-gray-100 rounded-lg shadow-md">
                No image available
              </p>
            </div>
            <h2 class="text-2xl font-display text-gray-800 mb-2 drop-shadow-sm">{{ room?.name || 'Room' }}</h2>
            <p class="text-lg text-indigo-600 font-semibold"><strong>${{ room?.price || 0 }}</strong>/night</p>
            <p class="text-gray-600">Max Guests: {{ room?.maxGuests || 2 }}</p>
            <p class="text-gray-600 mt-2">{{ room?.description || 'No description available.' }}</p>
            <div class="mt-4">
              <h3 class="text-sm font-medium text-gray-700"></h3>
              <ul class="mt-2 text-gray-600 text-sm grid grid-cols-2 gap-2">
                <li v-for="amenity in room?.amenities || []" :key="amenity" class="flex items-center">
                  <svg
                    class="w-4 h-4 text-indigo-500 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {{ amenity }}
                </li>
              </ul>
            </div>
          </div>
  
          <!-- Booking Form -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-sans text-gray-800 mb-6">Book Your Stay</h3>
            <form @submit.prevent>
              <div class="grid gap-4">
                <!-- Guest Name -->
                <div>
                  <label for="guest-name" class="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    id="guest-name"
                    v-model.trim="guestName"
                    type="text"
                    class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition"
                    :class="{ 'border-pink-500': errors.guestName }"
                    aria-describedby="guest-name-error"
                    required
                  />
                  <p v-if="errors.guestName" id="guest-name-error" class="mt-1 text-sm text-pink-500">{{ errors.guestName }}</p>
                </div>
  
                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    v-model.trim="email"
                    type="email"
                    class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition"
                    :class="{ 'border-pink-500': errors.email }"
                    aria-describedby="email-error"
                    required
                  />
                  <p v-if="errors.email" id="email-error" class="mt-1 text-sm text-pink-500">{{ errors.email }}</p>
                </div>
  
                <!-- Check-in Date -->
                <div>
                  <label for="check-in" class="block text-sm font-medium text-gray-700">Check-in Date</label>
                  <input
                    id="check-in"
                    v-model="checkInDate"
                    type="date"
                    :min="today"
                    class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition"
                    :class="{ 'border-pink-500': errors.checkInDate }"
                    aria-describedby="check-in-error"
                    required
                  />
                  <p v-if="errors.checkInDate" id="check-in-error" class="mt-1 text-sm text-pink-500">{{ errors.checkInDate }}</p>
                </div>
  
                <!-- Check-out Date -->
                <div>
                  <label for="check-out" class="block text-sm font-medium text-gray-700">Check-out Date</label>
                  <input
                    id="check-out"
                    v-model="checkOutDate"
                    type="date"
                    :min="defaultCheckOut"
                    class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition"
                    :class="{ 'border-pink-500': errors.checkOutDate }"
                    aria-describedby="check-out-error"
                    required
                  />
                  <p v-if="errors.checkOutDate" id="check-out-error" class="mt-1 text-sm text-pink-500">{{ errors.checkOutDate }}</p>
                </div>
  
                <!-- Number of Guests -->
                <div>
                  <label for="guests" class="block text-sm font-medium text-gray-700">Number of Guests</label>
                  <input
                    id="guests"
                    v-model.number="numberOfGuests"
                    type="number"
                    min="1"
                    :max="room?.maxGuests || 2"
                    class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition"
                    :class="{ 'border-pink-500': errors.numberOfGuests }"
                    aria-describedby="guests-error"
                    required
                  />
                  <p v-if="errors.numberOfGuests" id="guests-error" class="mt-1 text-sm text-pink-500">{{ errors.numberOfGuests }}</p>
                </div>
  
                <!-- Special Requests -->
                <div>
                  <label for="special-requests" class="block text-sm font-medium text-gray-700">Special Requests</label>
                  <textarea
                    id="special-requests"
                    v-model="specialRequests"
                    rows="3"
                    class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition"
                    placeholder="Any special requirements?"
                  ></textarea>
                </div>
              </div>
  
              <!-- Price Summary -->
              <div v-if="isAvailable && numberOfNights > 0" class="mt-6 bg-indigo-50 p-4 rounded-lg shadow-sm">
                <h4 class="text-sm font-medium text-gray-700">Price Summary</h4>
                <p class="text-sm text-gray-600">Nights: {{ numberOfNights }}</p>
                <p class="text-sm text-gray-600">Price per night: ${{ room?.price || 0 }}</p>
                <p class="text-lg font-semibold text-indigo-600">Total: ${{ totalPrice }}</p>
              </div>
  
              <!-- Availability Check -->
              <button
                @click="checkAvailability"
                class="mt-6 w-full bg-indigo-500 text-white py-3 rounded-lg shadow-md hover:bg-indigo-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition font-sans disabled:opacity-50"
                :disabled="isCheckingAvailability || !isFormComplete || hasErrors"
                aria-busy="isCheckingAvailability"
              >
                {{ isCheckingAvailability ? 'Checking...' : 'Check Availability' }}
              </button>
              <p v-if="availabilityMessage" class="mt-2 text-sm" :class="availabilityMessage.isAvailable ? 'text-indigo-600' : 'text-pink-500'">
                {{ availabilityMessage.text }}
              </p>
  
              <!-- Confirm Booking -->
              <button
                @click="confirmBooking"
                class="mt-4 w-full bg-pink-500 text-white py-3 rounded-lg shadow-md hover:bg-pink-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition font-sans disabled:opacity-50"
                :disabled="isBooking || !isFormComplete || hasErrors || !isAvailable"
                aria-busy="isBooking"
              >
                {{ isBooking ? 'Processing...' : 'Place Your Booking' }}
              </button>
            </form>
          </div>
        </div>
  
        <!-- Success Toast -->
        <transition name="fade">
          <div
            v-if="showSuccess"
            class="fixed bottom-4 right-4 bg-indigo-500 text-white p-4 rounded-lg shadow-xl flex items-center"
            role="alert"
          >
            <svg
              class="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Booking confirmed successfully!
          </div>
        </transition>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  const menuOpen = ref(false);
  
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };
  
  const room = ref(null);
  const loading = ref(true);
  const error = ref(null);
  const guestName = ref('');
  const email = ref('');
  const checkInDate = ref('');
  const checkOutDate = ref('');
  const numberOfGuests = ref(1);
  const specialRequests = ref('');
  const isBooking = ref(false);
  const isCheckingAvailability = ref(false);
  const isAvailable = ref(false);
  const availabilityMessage = ref(null);
  const showSuccess = ref(false);
  
  // Computed properties
  const today = computed(() => new Date().toISOString().split('T')[0]);
  const defaultCheckOut = computed(() => {
    const date = new Date(checkInDate.value || today.value);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  });
  
  const numberOfNights = computed(() => {
    if (!checkInDate.value || !checkOutDate.value) return 0;
    const start = new Date(checkInDate.value);
    const end = new Date(checkOutDate.value);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  });
  
  const totalPrice = computed(() => {
    if (!room.value?.price || numberOfNights.value <= 0) return 0;
    return (room.value.price * numberOfNights.value).toFixed(2);
  });
  
  const isFormComplete = computed(() => {
    return guestName.value && email.value && checkInDate.value && checkOutDate.value && numberOfGuests.value >= 1;
  });
  
  const hasErrors = computed(() => Object.values(errors.value).some((error) => error));
  
  const errors = ref({});
  
  // Form validation
  const validateForm = () => {
    errors.value = {};
    if (!guestName.value) errors.value.guestName = 'Full name is required.';
    if (!email.value) errors.value.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email.value)) errors.value.email = 'Invalid email address.';
    if (!checkInDate.value) errors.value.checkInDate = 'Check-in date is required.';
    else if (new Date(checkInDate.value) < new Date(today.value)) errors.value.checkInDate = 'Check-in cannot be in the past.';
    if (!checkOutDate.value) errors.value.checkOutDate = 'Check-out date is required.';
    else if (checkInDate.value && new Date(checkOutDate.value) <= new Date(checkInDate.value))
      errors.value.checkOutDate = 'Check-out must be after check-in.';
    if (!numberOfGuests.value || numberOfGuests.value < 1) errors.value.numberOfGuests = 'At least one guest is required.';
    if (room.value?.maxGuests && numberOfGuests.value > room.value.maxGuests)
      errors.value.numberOfGuests = `Maximum ${room.value.maxGuests} guests allowed.`;
  };
  
  // Fetch room data
  const fetchRoom = async () => {
    try {
      loading.value = true;
      const roomId = useRoute().params.id;
      if (!roomId) throw new Error('No room ID provided.');
      // Mock API call; replace with real endpoint
      const response = await fetch(`/api/rooms/${roomId}`);
      const data = await response.json();
      room.value = data || null;
      if (!room.value) error.value = 'Room not found.';
    } catch (err) {
      error.value = err.message || 'Failed to load room details.';
    } finally {
      loading.value = false;
    }
  };
  
  // Check availability
  const checkAvailability = async () => {
    validateForm();
    if (hasErrors.value || !isFormComplete.value) return;
    isCheckingAvailability.value = true;
    try {
      // Mock API call; replace with /api/availability
      const mockResponse = { available: numberOfNights.value > 0 };
      isAvailable.value = mockResponse.available;
      availabilityMessage.value = mockResponse.available
        ? { isAvailable: true, text: 'Room is available!' }
        : { isAvailable: false, text: 'Room is not available for these dates.' };
    } catch (err) {
      isAvailable.value = false;
      availabilityMessage.value = { isAvailable: false, text: 'Failed to check availability.' };
    } finally {
      isCheckingAvailability.value = false;
    }
  };
  
  // Confirm booking
  const confirmBooking = async () => {
    validateForm();
    if (hasErrors.value || !isFormComplete.value || !isAvailable.value) return;
    isBooking.value = true;
    try {
      // Mock API call; replace with /api/bookings
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showSuccess.value = true;
      setTimeout(() => {
        showSuccess.value = false;
        navigateTo({
          path: '/confirmation',
          query: {
            roomName: room.value.name,
            checkInDate: checkInDate.value,
            checkOutDate: checkOutDate.value,
            guests: numberOfGuests.value,
          },
        });
      }, 2000);
    } catch (err) {
      error.value = 'Booking failed. Please try again.';
    } finally {
      isBooking.value = false;
    }
  };
  
  // Fetch room on mount
  onMounted(fetchRoom);
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');
  
  .font-display {
    font-family: 'Playfair Display', serif;
  }
  
  .font-sans {
    font-family: 'Inter', sans-serif;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  .image-container {
    width: 500px;
    height: 400px;
    overflow: hidden;
  }
  
  .room-image {
    width: 500px;
    height: 400px;
    object-fit: cover;
    image-rendering: optimizeQuality;
  }
  
  button {
    transition: all 0.2s ease;
  }
  
  input, textarea {
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  
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
  
  @media (max-width: 640px) {
    .grid-cols-2 {
      grid-template-columns: 1fr;
    }
    .image-container, .room-image {
      width: 100%;
      height: auto;
      aspect-ratio: 5 / 4; /* Maintains 500:400 ratio */
    }
  }
  
  @media (min-width: 641px) and (max-width: 1023px) {
    .image-container, .room-image {
      width: 100%;
      height: auto;
      max-width: 500px;
      max-height: 400px;
    }
  }
  </style>