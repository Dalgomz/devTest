<template>
  <div>
    <input 
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <button @click="cleanSearch" v-if="!(modelValue == null || modelValue === '')">clear</button>
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: Text, default: () => null },
  },
  methods: {
    cleanSearch() {
      this.$emit('update:modelValue', null);
    },
  }
}
</script>

<style scoped></style>