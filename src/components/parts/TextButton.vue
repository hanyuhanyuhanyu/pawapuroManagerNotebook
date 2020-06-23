<template>
  <button>
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EachBallAbilityInput extends Vue {}
</script>
