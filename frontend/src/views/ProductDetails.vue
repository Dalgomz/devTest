<template>
  <Header :breadcrumbs="[{label: 'Home', path: '/'}, {label: item.model}]"></Header>
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
      <button @addItem="">Add to cart</button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import products from '@/mocks/products.json';
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
  components: { Header },
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
    }
  }
}
</script>

<style scoped></style>