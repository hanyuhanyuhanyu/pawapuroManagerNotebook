<template>
  <div>
    名前<input v-model="player.lastName" ref="name">
    年齢<input v-model="inputAge" type="number">({{player.birthYear}}年生まれ)
    <div>
      メインポジション
      <select
        v-model="mainPosition"
      >
        <option
          v-for="p in positions"
          :key="p.key"
          :value="p.key"
        >
          {{p.abbreviation}}
        </option>
      </select>
    </div>
    <div
      v-if="isPitcher"
    >
      投手適性
      <span
        v-for="p in pitcherAptitudes"
        :key="p.key"
      >
        {{p.abbreviation}}
        <input
          type="checkbox"
          :value="p.key"
          v-model="setPitcherAptitudes"
        >
      </span>
    </div>
    <div
      v-if="!!mainPosition"
    >
      サブポジション
      <span
        v-for="p in fielderPositions"
        :key="p.key"
      >
        {{p.abbreviation}}
        <input
          type="checkbox"
          :value="p.key"
          v-model="subPositions"
        >
      </span>
    </div>
    <div>
      メモ<input v-model="player.memo">
    </div>
    <TextButton
      :disabled="!addable"
      @click.native="addPlayer"
    >
      追加
    </TextButton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Ref } from 'vue-property-decorator';
import { Player } from "../../defs/player"
import PlayerBasicsEditter from "../../components/player/basicsEditter.vue"
import BasicFielderAbilities from "../../components/fielderAbilities/index.vue"
import BasicPitcherAbilities from "../../components/pitcherAbilities/index.vue"
import TextButton from "../../components/parts/TextButton.vue"
import { DetailedPositionAbilityNames, PositionAbilityNames, positionNames, positionAbilityDefinitions, pitcher, PitcherDetailedPositionNames, isPitcherDetailedPositionNames, pitcherDetailedNames, FielderPositionAbilityNames, fielderPositionNames, isFielderPositionNames } from '../../defs/abilities/positionsAbility';
import { PositionAbility } from '../../defs/abilities/commonType';

@Component({
  components: {
    PlayerBasicsEditter,
    BasicFielderAbilities,
    BasicPitcherAbilities,
    TextButton
  }
})
export default class EdittingView extends Vue{
  @Ref() readonly name!: HTMLInputElement
  @Prop() private player!: Player
  @Prop() private year!: number
  mainPosition: DetailedPositionAbilityNames = "pitcher"
  settingPitcherAptitudes: Set<PitcherDetailedPositionNames> = new Set([])
  settingSubPositions: Set<FielderPositionAbilityNames> = new Set([])
  @Watch("mainPosition")
  onMainPositionChange(newVal: DetailedPositionAbilityNames, old: DetailedPositionAbilityNames) {
    if(newVal === old){
      return
    }
    if(isPitcherDetailedPositionNames(old)){
      this.settingPitcherAptitudes.delete(old)
    }
    if(isPitcherDetailedPositionNames(newVal)){
      this.settingPitcherAptitudes.add(newVal)
    }
    if(isFielderPositionNames(old)){
      this.settingSubPositions.delete(old)
    }
    if(isFielderPositionNames(newVal)){
      this.settingSubPositions.add(newVal)
    }
    this.settingPitcherAptitudes = new Set(this.settingPitcherAptitudes)
    this.settingSubPositions = new Set(this.settingSubPositions)
  }
  get positions(): (PositionAbility & {key: DetailedPositionAbilityNames})[]{
    return [...pitcherDetailedNames, ...fielderPositionNames].map(p => {
      return {
        key: p,
        ...positionAbilityDefinitions[p]
      }
    })
  }
  get pitcherAptitudes(): (PositionAbility & {key: PitcherDetailedPositionNames})[] {
    return pitcherDetailedNames.map(p => {
      return {
        key: p,
        ...positionAbilityDefinitions[p]
      }
    })
  }
  get fielderPositions(): (PositionAbility & {key: FielderPositionAbilityNames})[] {
    return fielderPositionNames.map(p => {
      return {
        key: p,
        ...positionAbilityDefinitions[p]
      }
    })
  }
  get inputAge(): number {
    return this.player.age(this.year)
  }
  set inputAge(num: number) {
    this.player.birthYear = this.year - num
  }
  get isPitcher(): boolean {
    return isPitcherDetailedPositionNames(this.mainPosition)
  }
  get isFielder(): boolean {
    return !!this.mainPosition && this.mainPosition !== pitcher
  }
  get addable(): boolean {
    return this.player.registeredName.trim().length > 0
    && (
      this.isPitcher
      && this.settingPitcherAptitudes.size > 0
      )
    || this.isFielder
  }
  get subPositions(): FielderPositionAbilityNames[] {
    return Array.from(this.settingSubPositions)
  }
  set subPositions(pArr: FielderPositionAbilityNames[]) {
    const p = new Set(pArr)
    if(this.isFielder && !p.has(this.mainPosition as FielderPositionAbilityNames)){
      p.add(this.mainPosition as FielderPositionAbilityNames)
    }
    this.settingSubPositions = p
  }
  get setPitcherAptitudes(): PitcherDetailedPositionNames[] {
    return Array.from(this.settingPitcherAptitudes)
  }
  set setPitcherAptitudes(v: PitcherDetailedPositionNames[]) {
    const p = new Set(v)
    if(this.isPitcher && !p.has(this.mainPosition as PitcherDetailedPositionNames)){
      p.add(this.mainPosition as PitcherDetailedPositionNames)
    }
    this.settingPitcherAptitudes = p
  }
  addPlayer() {
    if(!this.addable){
      return
    }
    this.setPitcherAptitudes.forEach(p => {
      this.player.setAbility(pitcher, 10)
      this.player.setAbility(p, 1)
    })
    fielderPositionNames.forEach(p => {
      this.player.setAbility(p, this.settingSubPositions.has(p) ? 1 : 0 )
    })
    this.player.setAbility(this.mainPosition, 10)
    this.$emit("finish")
    this.clear()
    if(isPitcherDetailedPositionNames(this.mainPosition)){
      this.settingPitcherAptitudes.add(this.mainPosition)
    } else {
      this.settingSubPositions.add(this.mainPosition as FielderPositionAbilityNames)
    }
  }
  clear(){
    this.settingPitcherAptitudes = new Set([])
    this.settingSubPositions = new Set([])
  }
  focus(){
    this.name.focus()
  }
}
</script>

<style scoped lang="scss">
</style>

