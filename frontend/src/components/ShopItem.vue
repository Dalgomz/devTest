<template>
  <div @click="openItem" class="solid-border cursor-pointer">
    {{ item }}
  </div>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
  },
  methods: {
    openItem() {
      this.$router.push({name: details, params: this.item.id});
    },
  }
}
</script>

<style scoped></style>