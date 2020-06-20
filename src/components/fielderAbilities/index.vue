<template>
  <div>
    <BasicAbilities :player="player" />
    <SpecialAbilities :player="player" />
    <PositionAbilities :player="player" />
    <ToggleAbilities :player="player" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BasicAbilities from "./basicAbilities.vue"
import PositionAbilities from "./positionAbilities.vue"
import SpecialAbilities from "./specialAbilities.vue"
import ToggleAbilities from "./toggleAbilities.vue"
import { Player } from "../../defs/player"

@Component({
  components: {
    BasicAbilities,
    PositionAbilities,
    SpecialAbilities,
    ToggleAbilities 
  }
})
export default class FielderAbility extends Vue {
  @Prop() private player!: Player
}
</script>

<style scoped lang="scss">
</style>

