<template>
  <span>
    <RemoveButton @click="update(property, undefined)" />
    <NumericAbilityInput
      v-if="value !== undefined"
      :player="player" 
      :property="property"
      :initial="value"
    />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Player } from "../../defs/player"
import { AbilityNames } from '../../defs/abilities/abilities';
import { SettableValue } from '../../defs/abilities/commonType';
import NumericAbilityInput from "../parts/NumericAbilityInput.vue"
import RemoveButton from "../parts/RemoveButton.vue"

@Component({
  components: {
    NumericAbilityInput,
    RemoveButton
  }
})
export default class EachBallAbilityInput extends Vue {
  @Prop() private player!: Player
  @Prop() private property!: AbilityNames
  @Prop() private initial: SettableValue | undefined
  value: SettableValue | undefined = 1
  error = ""
  beforeMount(): void {
    this.value = this.initial
  }
  update(prop: string, value: SettableValue | undefined): void {
      const val = this.player.setAbility(prop, value)
      if(val.isLeft()){
        this.error = val.unpack()
      } else {
        this.error = ""
      }
  }
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



