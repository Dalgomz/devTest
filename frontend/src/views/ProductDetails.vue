<template>
  <Header :breadcrumbs="[{label: 'Home', path: '/'}, {label: item.model}]"></Header>
  <div style="margin: 1rem">
    <button style="padding: .5rem;" class="solid-border cursor-pointer flex v-center shrink-1" @click="goBack">
      <backIcon style="height: 1rem; width: 1rem; margin-right: .5rem;"/>
      BACK
    </button>
  </div>
  <div class="w-full flex row">
    <div class="flex w-50" >
      <img :src="item.imgUrl" style="margin: 0 auto"></img>
    </div>
    <div class="w-50 flex col">
      <h3 style="margin: 1rem 0 0 0">Description</h3>
      <ul style="margin: .5rem 0">
        <li v-for="attr in descriptionProperties">
          <div>
            <b>{{attr.label}}:</b>
            <span v-if="attr.prop == 'primaryCamera'">
              <span v-for="x in  item[attr.prop]"> <br> {{ x }}</span>
            </span>
            <span v-else>{{ item[attr.prop] }}</span>
            <span v-if="attr.prop == 'weight'">g</span>
          </div>
        </li>
      </ul>
      
      <h3 style="margin: 1rem 0 0 0">Actions</h3>
      <select :value="storage">
        <option v-for="storage in options.storages" :value="storage">
          {{storage.name}}
        </option>
      </select>
      <select :value="color">
        <option v-for="color in options.colors" :value="color">
          {{color.name}}
        </option>
      </select>
      <button @click="addToCart">Add to cart</button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import backIcon from '@/assets/back.svg?component';
import { useCartStore } from '@/stores/cart';

import api from "@/api";

const descProps = [
  {label: "Brand", prop: "brand"},
  {label: "Model", prop: "model"},
  {label: "Price", prop: "price"},
  {label: "Cpu", prop: "cpu"},
  {label: "Ram", prop: "ram"},
  {label: "Operative System", prop: "os"},
  {label: "Display Resolution", prop: "displayResolution"},
  {label: "Battery", prop: "battery"},
  {label: "Primary Camera", prop: "primaryCamera"},
  {label: "Secondary Camera", prop: "secondaryCmera"},
  {label: "Size", prop: "dimentions"},
  {label: "Weight", prop: "weight"},
]

export default {
  components: { Header, backIcon },
  created() {
    this.getItemDetails();
  },
  data() {
    return {
      item: {},
      descriptionProperties: descProps,
      options: {
        storages: [], 
        colors: [],
      },
      cartStore: useCartStore(),
      storage: null,
      color: null,
    };
  },
  methods: {
    async getItemDetails() {
      this.item = {};
      this.item = await api.getProduct(this.$route.params.id);
      this.options = this.item.options;
      this.storage = this.options.storages[0];
      this.color = this.options.colors[0];
      this.descriptionProperties = descProps.filter((d) => this.item[d.prop]);
    },
    async addToCart() {
      const itemObj = {id: this.item.id, colorCode: this.color.code, storageCode: this.storage.code };
      const response = await api.addToCart(itemObj);
      this.cartStore.setItems(response.count);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped></style>