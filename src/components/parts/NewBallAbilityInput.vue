<template>
  <span>
    <select
      v-model="ballName"
      v-if="!slotFull"
    >
      <option v-for="b in settableBalls" :key="b" :value="b">
        {{getBallName(b)}}
      </option>
    </select>
    <NumericAbilityInput
      v-if="direction !== straight && !slotFull"
      :player="player" 
      :property="ballName"
      :initial="value"
    />
    <AddButton 
      @click="update()"
      v-if="!slotFull"
    />
    {{errorMessage}}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Player } from "../../defs/player"
import { findAbilityDefinition } from '../../defs/abilities/abilities';
import { BallDirection, straight } from '../../defs/abilities/commonType';
import { settableBalls, getName } from '../../defs/abilities/toggleAbilityUtil';
import { BallNames } from '../../defs/abilities/breakBallAbilities';
import AddButton from "../parts/AddButton.vue"
import NumericAbilityInput from "../parts/NumericAbilityInput.vue"
const slotCount = 2

@Component({
  components: {
    NumericAbilityInput,
    AddButton
  }
})
export default class NewBallAbilityInput extends Vue {
  @Prop() private player!: Player
  @Prop() private direction!: BallDirection | typeof straight
  @Prop() private having!: BallNames[]
  ballName: BallNames | null = null
  value = 1
  error = ""
  get straight(): typeof straight {
    return straight
  }
  get settableBalls(): BallNames[] {
    if(this.slotFull){
      return []
    }
    return settableBalls(this.direction).filter(b => !this.havingBalls.has(b))
  }
  get havingBalls(): Set<BallNames>{
    return new Set(this.having)
  }
  getBallName(n: BallNames): string {
    const abl = findAbilityDefinition(n)
    if(abl === undefined){
      return "not found"
    }
    return getName(abl, undefined) || "not found"
  }
  update(): void {
    if(this.ballName === null || this.ballName === undefined){
      return
    }
    const val = this.player.setAbility(this.ballName, this.value)
    if(val.isLeft()){
      this.error = val.unpack()
      return
    }
    this.error = ""
    this.ballName = null
  }
  get slotFull(): boolean {
    return this.havingBalls.size >= slotCount
  }
  get errorMessage(): string {
    if(this.error !== ""){
      return this.error
    }
    if(this.slotFull){
      return "slot full"
    }
    return ""
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