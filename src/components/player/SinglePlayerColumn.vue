<template>
  <div>
    {{player.registeredName}}({{player.age(year)}})({{positionsShortHand(player)}})
    <TextButton
      @click.native="$emit('edit')"
    >
      編集
    </TextButton>
    <TextButton
      @click.native="$emit('remove')"
    >
      削除
    </TextButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Player } from '../../defs/player';
import { findAbilityDefinition } from '../../defs/abilities/abilities';
import TextButton from "../../components/parts/TextButton.vue"

@Component({
  components: {
    TextButton
  }
})
export default class SinglePlayerColumn extends Vue{
  @Prop() player!: Player
  @Prop() year!: number
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

