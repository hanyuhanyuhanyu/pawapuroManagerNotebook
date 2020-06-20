<template>
  <span>
    <select v-model="value" @change="update">
      <option v-for="val in valueView" :key="val" :value="valueSetMaps[val]">
        {{val}}
      </option>
    </select>
    {{error}}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Player } from "../../defs/player"
import { AbilityNames } from '../../defs/abilities/abilities';
import { SettableValue, Ability } from '../../defs/abilities/commonType';
import { getSettableValue, getValue } from '../../defs/abilities/toggleAbilityUtil';

@Component
export default class BasicFielderAbility extends Vue {
  @Prop() private player!: Player
  @Prop() private ability!: Ability
  @Prop() private property!: AbilityNames
  @Prop() private initial!: SettableValue
  value: SettableValue = 1
  error = ""
  get settableValues(): SettableValue[] {
    return getSettableValue(this.ability)
  }
  get valueSetMaps(): Record<string, SettableValue> {
    const valueMap: Record<string, SettableValue> = {}
    this.settableValues.forEach(v => {

    const val = getValue(this.ability, v)
        if(typeof val === "string"){
            valueMap[val] = v
        }
    })
    return valueMap
  }
  get valueView(): string[] {
    return this.settableValues.map(v => getValue(this.ability, v)).filter(v => typeof v === "string") as string[]
  }
  mounted(): void {
    this.value = this.initial
  }
  update(): void {
      const val = this.player.setAbility(this.property, this.value)
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

