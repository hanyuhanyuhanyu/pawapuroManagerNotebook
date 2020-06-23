<template>
  <div class="container">
    <div>
      <h4>
        基礎情報
      </h4>
      <PlayerBasicsEditter
        :player="player"
        :year="year"
      />
    </div>
    <div>
      <h4>
        野手能力
      </h4>
      <BasicFielderAbilities :player="player"/>
    </div>
    <div>
      <h4>
        投手能力
      </h4>
      <BasicPitcherAbilities :player="player"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Player } from "../../defs/player"
import PlayerBasicsEditter from "../../components/player/basicsEditter.vue"
import BasicFielderAbilities from "../../components/fielderAbilities/index.vue"
import BasicPitcherAbilities from "../../components/pitcherAbilities/index.vue"

@Component({
  components: {
    PlayerBasicsEditter,
    BasicFielderAbilities,
    BasicPitcherAbilities
  }
})
export default class EdittingView extends Vue{
  @Prop() private player!: Player
  @Prop() private year!: number
}
</script>

<style scoped lang="scss">
.container{
  display: flex;
  flex-direction: row;
}
</style>
