<template>
  <div>
    <ul>
      <li v-for="{ability, key, alphabeticValue} in abilities" :key="key">
        {{ability.name}}: {{alphabeticValue}}({{ability.value || "-"}})
        <EachPositionAbilityInput
          :player="player" 
          :property="key"
          :initial="ability.value"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BasicFielderPositionAbilityWithValue } from '../../defs/playerAbility';
import { positionNames } from '../../defs/abilities/positionsAbility';
import { Ability, SettableValue } from '../../defs/abilities/commonType';
import { Player } from "../../defs/player"
import { AbilityNames } from '../../defs/abilities/abilities';
import RemoveButton from "../parts/RemoveButton.vue"
import AddButton from "../parts/AddButton.vue"
import NumericAbilityInput from "../parts/NumericAbilityInput.vue"
import EachPositionAbilityInput from "../parts/EachPositionAbilityInput.vue"
import { getAlphabeticalValue } from '../../defs/abilities/toggleAbilityUtil';

@Component({
  components:{
    NumericAbilityInput,
    AddButton,
    RemoveButton,
    EachPositionAbilityInput 
  }
})
export default class PositionAbilities extends Vue {
  @Prop() private player!: Player
  get value(): BasicFielderPositionAbilityWithValue {
    return this.player.fielderAbility.position
  }
  get abilities(): {key: string; ability: Ability; alphabeticValue: string}[] {
    const ret: {key: string; ability: Ability; alphabeticValue: string}[]  = []
    positionNames.forEach(name => {
      const val = this.value[name]
      ret.push({ key: name, ability: val, alphabeticValue: val.value ? getAlphabeticalValue(val.value as number) : "-" })
    })
    return ret
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>


