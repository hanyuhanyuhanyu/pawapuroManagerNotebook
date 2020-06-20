<template>
  <div>
    <ul>
      <li>
        ↑
        <NewBallAbilityInput
          :player="player"
          :direction="straight"
          :having="straightBallNames"
        />
        <ul>
          <li v-for="{ability, key} in straightBalls" :key="key">
            {{ability.name}}
            <EachBallAbilityInput
              :player="player"
              :property="key"
            />
          </li>
        </ul>
      </li>
      <li>
       →
        <NewBallAbilityInput
          :player="player"
          :direction="rightDirection"
          :having="rightBallNames"
        />
        <ul>
          <li v-for="{ability, key} in rightBalls" :key="key">
            {{ability.name}}: {{ability.value}}
            <EachBallAbilityInput
              :player="player"
              :property="key"
              :initial="ability.value"
            />
          </li>
        </ul>
      </li>
      <li>
       ┘ 
        <NewBallAbilityInput
          :player="player"
          :direction="rightDownDirection"
          :having="rightDownBallNames"
        />
        <ul>
          <li v-for="{ability, key} in rightDownBalls" :key="key">
            {{ability.name}}: {{ability.value}}
            <EachBallAbilityInput
              :player="player"
              :property="key"
              :initial="ability.value"
            />
          </li>
        </ul>
      </li>
      <li>
        ↓
        <NewBallAbilityInput
          :player="player"
          :direction="downDirection"
          :having="downBallNames"
        />
        <ul>
          <li v-for="{ability, key} in downBalls" :key="key">
            {{ability.name}}: {{ability.value}}
            <EachBallAbilityInput
              :player="player"
              :property="key"
              :initial="ability.value"
            />
          </li>
        </ul>
      </li>
      <li>
        └
        <NewBallAbilityInput
          :player="player"
          :direction="leftDownDirection"
          :having="leftDownBallNames"
        />
        <ul>
          <li v-for="{ability, key} in leftDownBalls" :key="key">
            {{ability.name}}: {{ability.value}}
            <EachBallAbilityInput
              :player="player"
              :property="key"
              :initial="ability.value"
            />
          </li>
        </ul>
      </li>
      <li>
        ←
        <NewBallAbilityInput
          :player="player"
          :direction="leftDirection"
          :having="leftBallNames"
        />
        <ul>
          <li v-for="{ability, key} in leftBalls" :key="key">
            {{ability.name}}: {{ability.value}}
            <EachBallAbilityInput
              :player="player"
              :property="key"
              :initial="ability.value"
            />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PitcherBreakingBallAbilityWithValue } from '../../defs/playerAbility';
import { fastBallNames, AbilityWithValue, SettableValue, straight, right, left, rightDown, leftDown, down } from '../../defs/abilities/commonType';
import { AbilityNames } from '../../defs/abilities/abilities';
import { rightBreakingBallNames, rightDownBreakingNames, downBreakingBallNames, leftDownBreakingBallNames, leftBreakingBallNames } from '../../defs/abilities/breakBallAbilities';
import { Player } from "../../defs/player"
import EachBallAbilityInput from "../parts/EachBallAbilityInput.vue"
import NewBallAbilityInput from "../parts/NewBallAbilityInput.vue"

function ballTemplate<T extends AbilityNames>(names: T[], values: Record<T, AbilityWithValue>): {key: string; ability: AbilityWithValue}[] {
    const ret: {key: string; ability: AbilityWithValue}[]  = []
    names.forEach(name => {
      const ability = values[name]
      if(ability === undefined){
        return
      }
      if(ability.value === undefined){
        return
      }
      ret.push({ key: name, ability: values[name] })
    })
    return ret
}
@Component({
  components: {
    EachBallAbilityInput,
    NewBallAbilityInput 
  }
})
export default class BallsAbilities extends Vue {
  error = ""
  @Prop() private player!: Player
  get value(): PitcherBreakingBallAbilityWithValue{
    return this.player.pitcherAbility.balls
  }
  get straight(): typeof straight {
    return straight
  }
  get straightBallNames(): string[] {
    return this.straightBalls.map(s => s.key)
  }
  get rightBallNames(): string[] {
    return this.rightBalls.map(s => s.key)
  }
  get rightDownBallNames(): string[] {
    return this.rightDownBalls.map(s => s.key)
  }
  get downBallNames(): string[] {
    return this.downBalls.map(s => s.key)
  }
  get leftDownBallNames(): string[] {
    return this.leftDownBalls.map(s => s.key)
  }
  get leftBallNames(): string[] {
    return this.leftBalls.map(s => s.key)
  }
  get straightBalls(): {key: string; ability: AbilityWithValue}[] {
    return ballTemplate(fastBallNames, this.value.straight)
  }
  get rightBalls(): {key: string; ability: AbilityWithValue}[] {
    return this.player.rightThrow ? 
      ballTemplate(rightBreakingBallNames, this.value.right)
      : ballTemplate(leftBreakingBallNames, this.value.left)
  }
  get rightDownBalls(): {key: string; ability: AbilityWithValue}[] {
    return this.player.rightThrow ?
      ballTemplate(rightDownBreakingNames, this.value.rightDown)
      : ballTemplate(leftDownBreakingBallNames, this.value.leftDown)
  }
  get downBalls(): {key: string; ability: AbilityWithValue}[] {
    return ballTemplate(downBreakingBallNames, this.value.down)
  }
  get leftDownBalls(): {key: string; ability: AbilityWithValue}[] {
    return this.player.rightThrow ?
      ballTemplate(leftDownBreakingBallNames, this.value.leftDown)
      : ballTemplate(rightDownBreakingNames, this.value.rightDown)
  }
  get leftBalls(): {key: string; ability: AbilityWithValue}[] {
    return this.player.rightThrow ? 
      ballTemplate(leftBreakingBallNames, this.value.left)
      : ballTemplate(rightBreakingBallNames, this.value.right)
  }
  get rightDirection(): typeof right | typeof left {
    return this.player.rightThrow ? right : left
  }
  get rightDownDirection(): typeof rightDown | typeof leftDown {
    return this.player.rightThrow ? rightDown : leftDown
  }
  get downDirection(): typeof down {
    return down
  }
  get leftDownDirection(): typeof rightDown | typeof leftDown {
    return this.player.rightThrow ? leftDown : rightDown 
  }
  get leftDirection(): typeof right| typeof left{
    return this.player.rightThrow ? left : right
  }
  update(prop: string, value: SettableValue | undefined): void {
      const val = this.player.setAbility(prop, value)
      if(val.isLeft()){
        this.error = val.unpack()
      } else {
        this.error = ""
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>


