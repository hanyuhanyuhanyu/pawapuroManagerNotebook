<template>
  <div>
    <ul>
      <li>
        チーム名<input type="text" v-model="newName">{{teamError.join("  ")}}
      </li>
      <li>
        年<input type="number" v-model="newYear">
      </li>
    </ul>
    <AddButton 
      @click="add"
      :disabled="validate !== null"
    />
    <ul>
      <li
        v-for="team in teams" :key="team.id"
      >
        {{team.name}}
        <TextButton @click.native="editTeam(team)">
          編集
        </TextButton>
      </li>
    </ul>
    <TextButton @click.native="clearAll">
      全消去
    </TextButton>
    <TeamComponent
      v-if="showEdittingTeam && edittingTeam !== undefined"
      :teamHistory="edittingTeam"
      @update="save"
    />
  </div>
</template>

<script lang="ts">
import { Component,  Vue } from 'vue-property-decorator';
import { Team } from "../../defs/team"
import { TeamHistory } from "../../defs/teamHistory"
import { TeamRepository } from "../../repository/team"
import TeamComponent from "../../components/team.vue"
import AddButton from "../../components/parts/AddButton.vue"
import TextButton from "../../components/parts/TextButton.vue"

const defaultYear = 2020
@Component({
  components:{
    AddButton,
    TextButton,
    TeamComponent 
  }
})
export default class TeamList extends Vue {
  newName = ""
  rep = new TeamRepository()
  newYear = defaultYear
  teams: TeamHistory[] = []
  watchingTeam: TeamHistory | undefined = undefined
  edittingTeam: TeamHistory | undefined = undefined
  showEdittingTeam  = false
  public beforeMount(): void {
    this.teams = this.rep.getAll()
  }
  public add(): void {
    const team = Team.new(this.newName, this.newYear)
    this.teams =  [TeamHistory.new(team)]
    this.resetData()
    this.save()
  }
  public switchTeam(team: TeamHistory): void {
    this.watchingTeam = team
  }
  public resetData(): void {
    this.newName = ""
    this.newYear = defaultYear
  }
  public clearAll(): void {
    this.rep.clear()
    this.teams = this.rep.getAll()
    this.watchingTeam = undefined
    this.edittingTeam = undefined
    this.showEdittingTeam = false
  }
  get validate(): {[key: string]: string[]} | null{
    const teamValidation = []
    if(this.newName.trim().length < 1 ){
      teamValidation.push("team name required")
    }
    if(teamValidation.length === 0){
      return null
    }
    const ret: Record<string, string[]> = {}
    if(teamValidation.length > 0){
      ret["team"] = teamValidation
    }
    return ret
  }
  get teamError(): string[] {
    const v = this.validate
    if(v === null){
      return []
    }
    return v.team || []
  }
  public editTeam(team: TeamHistory) {
    this.edittingTeam = team
    this.showEdittingTeam = true
  }
  public save(): void {
    this.rep.saveHistories(this.teams)
  }
}
</script>
