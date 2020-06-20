<template>
    <span>
        <RemoveButton @click="remove()" />
        <NumericAbilityInput
            :player="player" 
            :property="property"
            :initial="value"
            :onChange="value === null ? updateValue : undefined"
        />
        <AddButton 
            @click="add()"
            v-if="value === null"
        />
        {{error}}
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import RemoveButton from "../parts/RemoveButton.vue"
import AddButton from "../parts/AddButton.vue"
import NumericAbilityInput from "../parts/NumericAbilityInput.vue"
import { Player } from '../../defs/player';
import { AbilityNames } from '../../defs/abilities/abilities';

@Component({
  components:{
    NumericAbilityInput,
    AddButton,
    RemoveButton
  }
})
export default class PositionAbilities extends Vue {
  @Prop() private player!: Player
  @Prop() private property!: AbilityNames
  @Prop() private initial!: number
  value: number | null = null
  buffer = 0
  error = ""
  beforeMount(): void {
      this.value = this.initial
      this.buffer = this.initial
  }
  add(): void {
    if(this.property === undefined){
      return
    }
    const ret = this.player.setAbility(this.property, this.value ? Number(this.value) : Number(this.buffer))
    if(ret.isLeft()){
      this.error = ret.unpack()
      return
    }
    this.value = this.buffer
  }
  updateValue(v: number): void {
      this.buffer = v
  }
  remove(): void{
    const ret = this.player.setAbility(this.property, undefined)
    if(ret.isLeft()){
      this.error = ret.unpack()
      return
    } 
    this.value = null
  }

}
</script>