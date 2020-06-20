<template>
  <div>
    <div class="component">
      <BasicFielderAbilities :player="player"/>
      <BasicPitcherAbilities :player="player"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component,  Vue } from 'vue-property-decorator';
import {PlayerAbility, FielderAbilityWithValue, PitcherAbilityWithValue} from "../../defs/playerAbility"
import BasicFielderAbilities from "../../components/fielderAbilities/index.vue"
import BasicPitcherAbilities from "../../components/pitcherAbilities/index.vue"
import { hShoot } from '../../defs/abilities/breakBallAbilities';
import { Player } from '../../defs/player';
import { defaultInformation, PlayerBasics } from '../../defs/playerBasics';
const testPlayer = new PlayerAbility({
  basic: {
    ballSpeed: 140,
    stamina: 60,
    controll: 72,
  },
  special: {
    vsPinch: "supreme",
    vsLeftyBatter: 6,
    tough: "inferior",
    accelerated: 2,
    quick: 1,
    recovery: 4,
  },
  balls: {
    straight: new Set(["straight" as const, "twoSeam" as const]),
    right: {
      slider: 4,
      hSlider: 2
    },
    rightDown: {
      slirve: 3,
      dropCurve: 7
    },
    down: {
      fork: 2,
      knuckle: 1
    },
    leftDown: {
      synker: 1,
      marineBall: 3,
    },
    left: {
      shoot: 3,
      hShoot: 2
    },
  },
  toggles: {gyro: "supreme", acute: "good", four: "bad", sabotage: 1},
},{
  basic: {
    elevation: 1,
    meet: 90,
    power: 89,
    sprint: 69,
    fielding: 49,
    arm: 29,
    catching: 1,
  },
  special: {
    chance: "supreme",
    vsLeftyPitcher: 1,
    catcherLead: "supreme",
    stealing: 5,
    baseRunning: 6,
    throwing: 2,
  },
  position: {
    pitcher: 80,
    startingPitcher: 80,
    relievePitcher: 80,
    closingPitcher: 80,
    catcher: 80,
    first: 80,
    second: 80,
    third: 80,
    short: 80,
    outfielder: 80,
    rightFielder: 80,
    leftFielder: 80,
    centerFielder: 80,
  },
  toggles: {SAYONARA: "supreme", strikeOuter: "inferior", whisper: "supreme", headSliding: "good", error: "bad"},
})

@Component({
  components: {
    BasicFielderAbilities,
    BasicPitcherAbilities
  }
})
export default class AddPlayer extends Vue{
  year = 2020
  firstName = ""
  lastName = ""
  registeredName = ""
  player = new Player(new PlayerBasics(), testPlayer)
}
</script>

<style scoped lang="scss">
.component {
  display: flex;
  flex-direction: row;
}
</style>
