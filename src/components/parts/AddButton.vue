<template>
    <button @click="$emit('click')">
        <fa-icon :icon="['far', 'plus-square']" />
    </button>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
@Component
export default class AddButton extends Vue{}
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




