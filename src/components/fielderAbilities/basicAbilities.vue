<template>
  <div>
    <ul>
      <li>
        {{abilityElevation.ability.name}}: {{abilityElevation.value}} <NumericAbilityInput :player="player" :property="elevation" :initial="abilityElevation.value" />
      </li>
      <li v-for="{ability, alphabeticalValue, value, key} in abilitiesExceptElevation" :key="key">
        {{ability.name}}: {{alphabeticalValue}}({{value}}) <NumericAbilityInput :player="player" :property="key" :initial="value" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { basicFielderAbilityNamesExceptElevation, elevation } from '../../defs/abilities/fielderAbilities';
import { BasicFielderAbilityWithValue } from '../../defs/playerAbility';
import { AbilityWithValue } from '../../defs/abilities/commonType';
import { getValue, getAlphabeticalValue } from '../../defs/abilities/toggleAbilityUtil';
import { Player } from "../../defs/player"
import NumericAbilityInput from "../parts/NumericAbilityInput.vue"

@Component({
  components: {
    NumericAbilityInput
  }
})
export default class BasicFielderAbility extends Vue {
  @Prop() private player!: Player
  get value(): BasicFielderAbilityWithValue {
    return this.player.fielderAbility.basic
  }
  get elevation(): typeof elevation{
    return elevation
  }
  get abilitiesExceptElevation(): {key: string; ability: AbilityWithValue; value: number | string | undefined; alphabeticalValue: string}[] {
    const ret: {key: string; ability: AbilityWithValue; value: number | string | undefined; alphabeticalValue: string}[]  = []
    basicFielderAbilityNamesExceptElevation.forEach((name) => {
      if(this.value[name] !== undefined){
        const ability =this.value[name]
        const value = ability.value === undefined ? "-" : getValue(ability, ability.value)
        ret.push({ key: name,ability, value, alphabeticalValue : typeof value === "number" ? getAlphabeticalValue(value as number) : "-"})
      }
    })
    return ret
  }
  get abilityElevation(): {ability: AbilityWithValue; value: number | string | undefined} {
    const ability=  this.value.elevation
    const value = ability.value === undefined ? "-": getValue(ability, ability.value)
    return {ability, value}
  }
}
</script>

<style scoped lang="scss">
</style>