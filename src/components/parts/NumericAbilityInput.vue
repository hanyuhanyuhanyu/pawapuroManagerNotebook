<template>
  <span>
    <input type="number" v-model="value" @change="update"> {{error}}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Player } from "../../defs/player"
import { AbilityNames } from '../../defs/abilities/abilities';
import { SettableValue } from '../../defs/abilities/commonType';

@Component
export default class BasicFielderAbility extends Vue {
  @Prop() private player!: Player
  @Prop() private property!: AbilityNames
  @Prop() private initial!: SettableValue
  @Prop() private onChange!: (v: SettableValue) => unknown | undefined
  value: SettableValue = 1
  error = ""
  mounted(): void {
    this.value = this.initial
  }
  update(): void {
    if(this.onChange !== undefined){
      this.onChange(this.value)
      return
    }
    const val = this.player.setAbility(this.property, Number(this.value))
    if(val.isLeft()){
      this.error = val.unpack()
    } else {
      this.error = ""
      }
  }
}
</script>

<style scoped lang="scss">
</style>
