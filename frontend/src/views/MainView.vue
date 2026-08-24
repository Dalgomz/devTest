<template>
  <Header :breadcrumbs="[{label: 'Home'}]"/>
  <div class="w-full flex col">
    <div class="w-full flex row space-between mt-3 mb-1">
      <div />
      <SearchBar v-model="searchText"></SearchBar>
    </div>
    <div class="product-grid">
      <ShopItem v-for="item in filteredItems" :item="item"></ShopItem>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import SearchBar from '@/components/SearchBar.vue';
import ShopItem from '@/components/ShopItem.vue';

import api from '@/api';

export default {
  components: { Header, SearchBar, ShopItem },
  mounted() {
    this.getProducts();
  },
  data() {
    return {
      searchText: null,
      items: [],
    };
  },
  computed: {
    filteredItems() {
      if (this.searchText == null || this.searchText === "") 
        return this.items;
      return this.items.filter((x) => {
        return (x.brand.toLowerCase().includes(this.searchText) || x.model.toLowerCase().includes(this.searchText))
      });
    }
  },
  methods: {
    async getProducts() {
      this.items = [];
      this.items = await api.getProducts();
    }
  },
}
</script>

<style>
.product-grid {
  --repeat: auto-fit;
}
@media (min-width: calc(16rem * 4.25)) {
  .product-grid {
    --repeat: 4;
  }
}
.product-grid{
  display: grid;
  grid-template-columns: repeat(var(--repeat, auto-fit), minmax(16rem , 1fr));
  gap: 1rem;
  max-width: 100%;
}
</style>