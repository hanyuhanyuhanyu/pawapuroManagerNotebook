<template>
    <button :disabled="disabled" @click="$emit('click')">
        <fa-icon :icon="['far', 'plus-square']" />
    </button>
</template>

<script lang="ts">

import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class AddButton extends Vue{
  @Prop() disabled!: boolean
}
</script>

<style scoped lang="scss">
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;
  }
</style>




