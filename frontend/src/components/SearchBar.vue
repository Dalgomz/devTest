<template>
  <div class="flex center">        
    <input 
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <searchIcon style="margin-left: 2px; height: 1.2rem; width: 1.2rem"/>
  </div>
</template>

<script>
import searchIcon from '@/assets/search.svg?component';

export default {
  components: { searchIcon },
  emits: ['update:modelValue'],
  props: {
    modelValue: { type: String, default: () => null },
  },
  methods: {
    cleanSearch() {
      this.$emit('update:modelValue', null);
    },
  }
}
</script>

<style scoped></style>