<template>
  <div class="w-full">HEADER</div>
  <div class="w-full flex col">
    <div class="w-full flex row space-between">
      <div>list view</div>
      <SearchBar v-model="searchText"></SearchBar>
    </div>
    <div class="product-grid">
      <ShopItem v-for="item in filteredItems" :item="item"></ShopItem>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import ShopItem from '@/components/ShopItem.vue';

export default {
  components: { SearchBar, ShopItem },
  data() {
    return {
      searchText: null,
      items: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}],
    };
  },
  computed: {
    filteredItems() {
      return this.items;
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