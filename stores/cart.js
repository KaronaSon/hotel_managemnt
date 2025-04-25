// stores/cart.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
  }),

  actions: {
    addToCart(room) {
      if (!this.isInCart(room.id)) {
        this.cart.push(room);
      }
    },

    isInCart(roomId) {
      return this.cart.some((item) => item.id === roomId);
    },

    removeFromCart(roomId) {
      this.cart = this.cart.filter((item) => item.id !== roomId);
    },

    clearCart() {
      this.cart = [];
    },
  },

  getters: {
    cartItems: (state) => state.cart,
    cartCount: (state) => state.cart.length,
    totalPrice: (state) => state.cart.reduce((total, item) => total + item.price, 0),
  },
});
