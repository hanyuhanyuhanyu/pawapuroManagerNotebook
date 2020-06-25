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
    </h3>
    <SimplePlayerEditter
      ref="simpleEditter"
      :player="addingPlayer"
      :year="year"
      @finish="finishAdding"
    />
      <h4>
        投手({{pitcherCount}}人)
      </h4>
      <div class="container">
        <div>
          <h5>
            先発({{starters.length}}人)
          </h5>
          <SinglePlayerColumn
            v-for="player in starters"
            :key="player.id"
            :player="player"
            :year="year"
            @edit="editPlayer(player)"
            @remove="removePlayer(player)"
          />
        </div>
        <div>
          <h5>
            中継ぎ({{relievers.length}}人)
          </h5>
          <SinglePlayerColumn
            v-for="player in relievers"
            :key="player.id"
            :player="player"
            :year="year"
            @edit="editPlayer(player)"
            @remove="removePlayer(player)"
          />
        </div>
        <div>
          <h5>
            抑え({{closers.length}}人)
          </h5>
          <SinglePlayerColumn
            v-for="player in closers"
            :key="player.id"
            :player="player"
            :year="year"
            @edit="editPlayer(player)"
            @remove="removePlayer(player)"
          />
        </div>
      </div>
      <h4>
        野手({{fielderCount}}人)
      </h4>
      <div class="container">
        <div>
          <h5>
            捕手({{catchers.length}}人)
          </h5>
          <SinglePlayerColumn
            v-for="player in catchers"
            :key="player.id"
            :player="player"
            :year="year"
            @edit="editPlayer(player)"
            @remove="removePlayer(player)"
          />
        </div>
        <div>
          <h5>
            一塁手({{firsts.length}}人)
          </h5>
          <SinglePlayerColumn
            v-for="player in firsts"
            :key="player.id"
            :player="player"
            :year="year"
            @edit="editPlayer(player)"
            @remove="removePlayer(player)"
          />
        </div>
        <div>
          <h5>
            二塁手({{seconds.length}}人)
          </h5>
          <SinglePlayerColumn
            v-for="player in seconds"
            :key="player.id"
            :player="player"
            :year="year"
            @edit="editPlayer(player)"
            @remove="removePlayer(player)"
          />
        </div>
        <div>
          <h5>
            三塁手({{thirds.length}}人)
          </h5>
          <SinglePlayerColumn
            v-for="player in thirds"
            :key="player.id"
            :player="player"
            :year="year"
            @edit="editPlayer(player)"
            @remove="removePlayer(player)"
          />
        </div>
        <div>
          <h5>
            遊撃手({{shorts.length}}人)
          </h5>
          <SinglePlayerColumn
            v-for="player in shorts"
            :key="player.id"
            :player="player"
            :year="year"
            @edit="editPlayer(player)"
            @remove="removePlayer(player)"
          />
        </div>
        <div>
          <h5>
            外野手({{outfielders.length}}人)
          </h5>
          <SinglePlayerColumn
            v-for="player in outfielders"
            :key="player.id"
            :player="player"
            :year="year"
            @edit="editPlayer(player)"
            @remove="removePlayer(player)"
          />
        </div>
      </div>
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
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import { Team } from '../defs/team';
import { Player } from '../defs/player';
import PlayerEditter from "../components/player/PlayerEditter.vue"
import TextButton from "../components/parts/TextButton.vue"
import { TeamHistory } from '../defs/teamHistory';
import { findAbilityDefinition } from '../defs/abilities/abilities';
import SimplePlayerEditter from "../components/player/SimplePlayerEditter.vue"
import SinglePlayerColumn from "../components/player/SinglePlayerColumn.vue"

@Component({
  components:{
    PlayerEditter,
    TextButton,
    SimplePlayerEditter,
    SinglePlayerColumn
  }
})
export default class TeamComponent extends Vue{
  @Ref() readonly simpleEditter!: HTMLInputElement
  @Prop() teamHistory!: TeamHistory

  bufPlayer: Player | null = null
  edittingPlayer: Player | null = null
  edittingBuf: Record<string, Player> = {}
  addingPlayer: Player = new Player()
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
    if(this.watchingYear === null){
      this.watchingYear = this.teamHistory.lastYear
    }
    this.teamHistory.nextYear()
    this.watchingYear = Number(this.teamHistory.lastYear)
    this.watchingYear += 1
    this.watchingYear -= 1
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
    this.team.addPlayer(this.addingPlayer)
    this.addingPlayer = new Player()
    this.update()
    // 何故かrerenderingされないので強制的にアップデートするように無意味にyearをいじる
    const bufYear = this.year
    this.watchingYear = bufYear+1
    this.watchingYear = bufYear
    this.simpleEditter.focus()
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
  get players(): Player[] {
    return this.team.players.sort((a, b) => a.compare(b))
  }
  get starters(): Player[] {
    return this.players.filter(p => p.isStarter)
  }
  get relievers(): Player[] {
    return this.players.filter(p => p.isReleiver)
  }
  get closers(): Player[] {
    return this.players.filter(p => p.isCloser)
  }
  get catchers(): Player[] {
    return this.players.filter(p => p.isCatcher)
  }
  get firsts(): Player[] {
    return this.players.filter(p => p.isFirst)
  }
  get seconds(): Player[] {
    return this.players.filter(p => p.isSecond)
  }
  get thirds(): Player[] {
    return this.players.filter(p => p.isThird)
  }
  get shorts(): Player[] {
    return this.players.filter(p => p.isShort)
  }
  get outfielders(): Player[] {
    return this.players.filter(p => p.isOutFielder)
  }
  get pitcherCount(): number {
    return [
      this.starters,
      this.relievers,
      this.closers,
    ].map(a => a.length).reduce((a,b) => a+b)
  }
  get fielderCount(): number {
    return [
      this.catchers,
      this.firsts,
      this.seconds,
      this.thirds,
      this.shorts,
      this.outfielders,
    ].map(a => a.length).reduce((a,b) => a+b)
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
}
.container > div {
  margin: 0px 20px;
}
</style>