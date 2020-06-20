<template>
    <div>
        <input type="text" v-model="inputValue">
        <select
            v-model="selected"
            @change="handlySelcted"
        >
            <option v-for="s in matches" :key="s">
                {{s}}
            </option>
        </select>
        <AddButton
            @click="add()"
        />
        {{chooseMessage}}
        {{error}}
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import AddButton from "./AddButton.vue"
import { AbilityNames } from '../../defs/abilities/abilities';
import { SettableValue } from '../../defs/abilities/commonType';
import { Player } from '../../defs/player';
import { NOT_EXISTING_PROPERTY } from '../../defs/playerAbility';


@Component({
    components: {
        AddButton
    }
})
export default class SearchableSelector extends Vue{
  @Prop() private player!: Player;
  @Prop() private searchValueMapper!: Record<string, {key: AbilityNames; value: SettableValue}>
  inputValue = ""
  selected: string | null = null
  error = ""
  get value(): string {
      return this.inputValue.trim()
  }
  get searchTargets(): string[] {
      return Object.keys(this.searchValueMapper)
  }
  get matches(): string[] {
      if(this.value === ""){
          return []
      }
      const buffer: {index: number; value: string}[] = []
      this.searchTargets.forEach(t => {
          const index = t.indexOf(this.value)
          if(index < 0){
              return
          }
          buffer.push({index, value: t})
      })
      buffer.sort((a, b) => a.index - b.index)
      const strs =  buffer.map(b => b.value)
      if(strs.includes(this.value)){
          return [this.value]
      }
      return strs
  }
  get chooseMessage(): string {
    if(this.matches.length === 0){
        return "入力すると特能の候補が表示されます"
    }
    if(this.matches.length === 1){
        return ""
    }
    return `候補から選択して特能を確定してください(${this.matches.length}個候補があります)`
  }
  @Watch("inputValue")
  onInputChange(_newVal: unknown): void {
      this.selected = this.matches[0]
      this.error = ""
  }
  handlySelcted(): void {
      if(typeof this.selected !== "string" || this.selected.length < 1){
          return
      }
      this.inputValue = this.selected
  }
  add(): void{
    if(typeof this.selected !== "string"){
        return
    }
    const v = this.searchValueMapper[this.selected]
    if(v === undefined){
        this.error = NOT_EXISTING_PROPERTY
        return
    }
    const val = this.player.setAbility(v.key, v.value)
    if(val.isLeft()){
        this.error = val.unpack()
        return
    } else {
        this.error = ""
        this.inputValue = ""
        this.selected = null
    }
  }
}
</script>
