<template>
  <div @click="openItem" class="solid-border cursor-pointer flex col w-center padding-1">
    <img :src="item.imgUrl" class="list-image"></img>
    <div>
      {{item.brand}}
    </div>
    <div>
      {{item.model}}
    </div>
    <div>
      {{item.price}} €
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
  },
  methods: {
    openItem() {
      this.$router.push({name: "details", params: {id: this.item.id}});
    },
  }
}
</script>

<style scoped>
.list-image {
  object-fit: contain;
  max-height:10rem;
  width: auto;
  height: auto;
}
</style>