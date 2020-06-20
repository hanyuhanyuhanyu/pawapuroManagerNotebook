<template>
  <div>
    <ul>
      <li v-for="{ability, value, key} in abilities" :key="key">
        {{ability.name}}: {{value}}
        <SpecialAbilityInput
          :player="player"
          :ability="ability"
          :property="key"
          :initial="ability.value"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BasicFielderSpecialAbilityWithValue } from '../../defs/playerAbility';
import { basicFielderSpecialAbilityNames } from '../../defs/abilities/fielderAbilities';
import { AbilityWithValue } from '../../defs/abilities/commonType';
import { getValue } from '../../defs/abilities/toggleAbilityUtil';
import { Player } from "../../defs/player"
import SpecialAbilityInput from "../parts/SpecialAbilityInput.vue"

@Component({
  components:{
    SpecialAbilityInput 
  }
})
export default class SpecialAbilities extends Vue {
  @Prop() private player!: Player
  get value(): BasicFielderSpecialAbilityWithValue {
    return this.player.fielderAbility.special
  }
  get abilities(): {key: string; ability: AbilityWithValue; value: number | string | undefined}[] {
    const ret: {key: string; ability: AbilityWithValue; value: number | string | undefined}[]  = []
    basicFielderSpecialAbilityNames.forEach(name => {
      const ability =this.value[name]
      if(ability !== undefined){
        const value = ability.value === undefined ? "-" : getValue(ability, ability.value)
        ret.push({ key:name, ability , value })
      }
    })
    return ret
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

