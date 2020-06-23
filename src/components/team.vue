<template>
  <div>
    <div>
      <h2>
        {{team.name}}
        ({{team.year}}年シーズン)
      </h2>
      <TextButton
        @click.native="year--"
      >
        前 
      </TextButton>
      <select
        v-model="year"
      >
        <option
          v-for="y in teamHistory.allYears.reverse()"
          :value="y"
          :key="y"
        >
          {{y}}年シーズン
        </option>
      </select>
      <TextButton
        @click.native="year++"
      >
        翌
      </TextButton>
      <TextButton
        @click.native="jumpToLatest"
      >
        最新年
      </TextButton>
      <TextButton
        @click.native="nextYear"
      >
        次年を追加
      </TextButton>
    </div>
    <h3>
      選手一覧
      <TextButton
        @click.native="startAdding"
      >
        追加
      </TextButton>
    </h3>
    <ul>
      <li
        v-for="player in team.players" :key="player.id"
      >
        {{player.registeredName}}({{player.age(year)}})({{positionsShortHand(player)}})
        <TextButton
          @click.native="editPlayer(player)"
        >
          {{suspendingEdit(player) ? "編集再開" : "編集"}}
        </TextButton>
        <TextButton
          v-if="suspendingEdit(player)"
          @click.native="discardEdit(player)"
        >
          編集破棄
        </TextButton>
        <TextButton
          @click.native="removePlayer(player)"
        >
          削除
        </TextButton>
      </li>
    </ul>
    <PlayerEditter
      v-if="addingPlayer !== null"
      :player="addingPlayer"
      :year="team.year"
      @finish="finishAdding"
      @suspend="suspendAdding"
    >
      <template v-slot:finishText>
        追加
      </template>
      <template v-slot:exitText>
        中断
      </template>
    </PlayerEditter>
    <PlayerEditter
      v-if="edittingPlayer"
      :player="edittingPlayer"
      :year="team.year"
      @finish="finishEditting"
      @suspend="suspendEditting"
    >
      <template v-slot:finishText>
        完了
      </template>
      <template v-slot:exitText>
        中断
      </template>
    </PlayerEditter>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Team } from '../defs/team';
import { Player } from '../defs/player';
import PlayerEditter from "../components/player/PlayerEditter.vue"
import TextButton from "../components/parts/TextButton.vue"
import { TeamHistory } from '../defs/teamHistory';
import { findAbilityDefinition } from '../defs/abilities/abilities';

@Component({
  components:{
    PlayerEditter,
    TextButton
  }
})
export default class TeamComponent extends Vue{
  @Prop() teamHistory!: TeamHistory

  bufPlayer: Player | null = null
  edittingPlayer: Player | null = null
  edittingBuf: Record<string, Player> = {}
  addingPlayer: Player | null = null
  addingPlayerBuffer: Player | null = null
  watchingYear: number | null = null
  get year(): number {
    return this.watchingYear || this.teamHistory.lastYear
  }
  set year(y: number) {
    if(!this.teamHistory.hasYear(y)){
      return 
    }
    this.watchingYear = y
  }
  get team(): Team {
    return this.teamHistory.yearOf(this.year) || this.teamHistory.latest
  }
  protected update(): void {
    this.$emit("update")
  }
  public jumpToLatest(): void {
    this.year = this.teamHistory.lastYear
  }
  public nextYear(): void {
    this.teamHistory.nextYear()
    this.year = this.teamHistory.lastYear
    this.update()
  }
  get suspendingEdit(): (player: Player) => boolean {
    return (player: Player) => !!this.edittingBuf[player.id]
  }
  public startAdding(){
    this.addingPlayer = new Player()
  }

  public editPlayer(player: Player){
    const buf = this.edittingBuf[player.id]
    if(buf){
      this.edittingPlayer = buf
      return
    }
    const clone = player.clone()
    this.edittingBuf[player.id] = clone
    this.edittingPlayer = clone
  }

  public finishAdding(){
    if(this.addingPlayer === null){
      return
    }
    this.team.addPlayer(this.addingPlayer)
    this.addingPlayer = null
    this.update()
  }

  public suspendAdding(){
    this.addingPlayerBuffer = this.addingPlayer
    this.addingPlayer = null
  }

  public finishEditting(){
    if(this.edittingPlayer === null){
      return
    }
    const either = this.team.updatePlayer(this.edittingPlayer)
    if(either.isLeft()){
      console.error(either.unpack())
      return
    }
    this.discardEdit(this.edittingPlayer)
    this.edittingPlayer = null
    this.update()
  }

  public suspendEditting(){
    this.edittingPlayer = null
  }

  public discardEdit(player: Player){
    this.$delete(this.edittingBuf, player.id)
  }

  public removePlayer(player: Player){
    this.team.removePlayer(player)
    this.discardEdit(player)
    this.update()
  }
  get positionsShortHand(): (player: Player) => string{
    return (player: Player) => {
      let ret = ""
      player.sortedAvailablePositions.map(p => {
        if(ret.length > 4){
          return
        }
        const abl = findAbilityDefinition(p)
        const abb = (abl as any).abbreviation
        if(abb){
          ret = ret + abb
        }
      })
      return ret
    }
  }
}
</script>
