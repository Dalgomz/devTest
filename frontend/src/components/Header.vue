<template>
  <div class="flex row v-center">
    <div class="flex row v-center cursor-pointer solid-border" @click="navHome">
      <appIcon style="height: 1.5rem; width: 1.5rem"/>
      <div @click="navHome">AppName</div>
    </div>

    <div class="flex">
      <div v-for="page, idx in breadcrumbs">
        <span v-if="idx > 0" style="margin: 0 4px;">/</span>
        <RouterLink v-if="idx !== breadcrumbs.length-1" :to="page.path">{{page.label}}</RouterLink>
        <span v-else>{{page.label}}</span>
      </div>
    </div>
    <div class="grow-1"/>
    <div class="flex row v-center cursor-pointer solid-border" style="padding: 0 1rem;">
      <div class="w-full flex v-center">
        {{ cartCount }}
        <cartIcon style="height: 1.5rem; width: 1.5rem"/>
      </div>
    </div>
  </div>
</template>

<script>
import appIcon from '@/assets/appLogo.svg?component';
import cartIcon from '@/assets/cart.svg?component';
import { useCartStore } from '@/stores/cart';

export default {
  components: {appIcon, cartIcon},
  props: {
    breadcrumbs: {type: Array, default: () => []},
  },
  computed: {
      cartCount() {
        return useCartStore().cartCount;
    },
  },
  methods: {
    navHome() {
      this.$router.push({name: "main"});
    }
  }
}
</script>