<template>
  <div>
    <ul>
      <li>
        {{abilityBallSpeed.ability.name}}: {{abilityBallSpeed.value}}km/h <NumericAbilityInput :player="player" :property="ballSpeed" :initial="abilityBallSpeed.value" />
      </li>
      <span
        v-for="position in allAptitude"
        :key="position"
      >
        {{aptitudesName(position)}}
        <input
          type="checkbox"
          :value="position"
          v-model="player.pitcherAptitude"
        >
      </span>
      <li v-for="{ability, alphabeticalValue, value, key} in abilities" :key="key">
        {{ability.name}}: {{alphabeticalValue}}({{value}}) <NumericAbilityInput :player="player" :property="key" :initial="value" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BasicPitcherAbilityWithValue } from '../../defs/playerAbility';
import { AbilityWithValue, basicPitcherAbilityNamesExceptBallSpeed, ballSpeed } from '../../defs/abilities/commonType';
import { getValue, getAlphabeticalValue } from '../../defs/abilities/toggleAbilityUtil';
import { Player } from "../../defs/player"
import NumericAbilityInput from "../parts/NumericAbilityInput.vue"
import { PitcherDetailedPositionNames, positionAbilityDefinitions, pitcherDetailedNames } from '../../defs/abilities/positionsAbility';

@Component({
  components: {
    NumericAbilityInput
  }
})

export default class BasicPitcherAbility extends Vue {
  @Prop() private player!: Player
  get value(): BasicPitcherAbilityWithValue{
    return this.player.pitcherAbility.basic
  }
  get ballSpeed(): typeof ballSpeed{
    return ballSpeed
  }
  get abilityBallSpeed(): {ability: AbilityWithValue; value: number | string | undefined }{
    const ability=  this.value.ballSpeed
    const value = ability.value === undefined ? "-": getValue(ability, ability.value)
    return {ability, value}
  }
  get abilities(): {key: string; ability: AbilityWithValue; value: number | string | undefined; alphabeticalValue: string}[] {
    const ret: {key: string; ability: AbilityWithValue; value: number | string | undefined; alphabeticalValue: string}[]  = []
    basicPitcherAbilityNamesExceptBallSpeed.forEach((name) => {
      if(this.value[name] !== undefined){
        const ability =this.value[name]
        const value = ability.value === undefined ? "-" : getValue(ability, ability.value)
        ret.push({ key: name,ability, value, alphabeticalValue : typeof value === "number" ? getAlphabeticalValue(value as number) : "-"})
      }
    })
    return ret
  }
  get allAptitude(): PitcherDetailedPositionNames[] {
    return pitcherDetailedNames
  }
  get aptitudesName(): (pos: PitcherDetailedPositionNames) => string {
    return (pos: PitcherDetailedPositionNames) => positionAbilityDefinitions[pos].name
  }
}
</script>

<style scoped lang="scss">
</style>