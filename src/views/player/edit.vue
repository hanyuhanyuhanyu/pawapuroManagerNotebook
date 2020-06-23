<template>
  <div>
      <BasicFielderAbilities :player="player"/>
      <BasicPitcherAbilities :player="player"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Player } from "../../defs/player"
import BasicFielderAbilities from "../../components/fielderAbilities/index.vue"
import BasicPitcherAbilities from "../../components/pitcherAbilities/index.vue"

@Component({
  components: {
    BasicFielderAbilities,
    BasicPitcherAbilities
  }
})
export default class EditPlayer extends Vue{
  year = 2020
  firstName = ""
  lastName = ""
  registeredName = ""
  @Prop() private player: Player = new Player()
}
</script>

<style scoped lang="scss">
</style>
