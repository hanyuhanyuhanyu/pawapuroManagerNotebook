<template>
  <div>
    <SearchableSelector
      :player="player"
      :searchValueMapper="possibleAbilitiesMapper"
    />
    <ul>
      <li v-for="{name, key} in abilities" :key="key">
        {{name}}
        <RemoveButton
          @click="remove(key)"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FielderTogglableAbilityWithValue } from '../../defs/playerAbility';
import { getValue, getName } from "../../defs/abilities/toggleAbilityUtil"
import { fielderTogglableAbilityNames  } from '../../defs/abilities/fielderAbilities';
import { Player } from "../../defs/player"
import { SettableValue } from '../../defs/abilities/commonType';
import { findAbilityDefinition, AbilityNames, settableStringValue } from '../../defs/abilities/abilities';
import SearchableSelector from "../parts/SearchableSelector.vue"
import RemoveButton from "../parts/RemoveButton.vue"

@Component({
  components: {
    SearchableSelector,
    RemoveButton
  }
})
export default class SpecialAbilities extends Vue {
  @Prop() private player!: Player
  get value(): FielderTogglableAbilityWithValue {
    return this.player.fielderAbility.toggles
  }
  get abilities(): {key: string; name: string}[] {
    const ret: {key: string; name: string}[]  = []
    fielderTogglableAbilityNames.forEach((name, key) => {
      const abl = this.value[name]
      if(abl !== undefined && abl.value !== undefined){
        const ablName = getValue(abl, abl.value)
        if(ablName !== undefined){
          ret.push({ key: name, name: ablName.toString()  })
        }
      }
    })
    return ret
  }
  get possibleAbilitiesMapper(): Record<string, {key: AbilityNames; value: SettableValue}>{
    const ret: Record<string, {key: AbilityNames; value: SettableValue}> = {}
    fielderTogglableAbilityNames.forEach(f => {
      const abl = findAbilityDefinition(f)
      if(abl === undefined){
        return
      }
      settableStringValue(abl).forEach(value => {
        const n = getName(abl, value)
        if(n === undefined){
          return
        }
        ret[n] = {
          key: f,
          value
        }
      })
    })
    return ret
  }
  remove(key: string): void {
    const ret = this.player.setAbility(key, undefined)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>



