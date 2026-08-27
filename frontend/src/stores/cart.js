import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartCount: 0,
  }),
  getters: {
  },
  actions: {
    addItem() {
      this.cartCount += 1;
    },
    removeItem() {
      this.cartCount -= 1;
    },
    setItems(value) {
      this.cartCount = value;
    },
    cleanCart() {
      this.cartCount = 0;
    },
  },
})