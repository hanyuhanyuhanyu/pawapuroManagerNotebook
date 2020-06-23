<template>
  <div>
    <EdittingView
      :player="player"
      :year="year"
    />
    <TextButton
      @click.native="$emit('finish')"
    >
      <slot name="finishText">追加</slot>
    </TextButton>
    <TextButton
      @click.native="$emit('suspend')"
    >
      <slot name="exitText">中断</slot>
    </TextButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import TextButton from "../parts/TextButton.vue"
import EdittingView from "./playerEditterView.vue"
import { Player } from '../../defs/player';

@Component({
  components: {
    TextButton,
    EdittingView
  }
})
export default class PlayerEditter extends Vue{
  @Prop() player!: Player
  @Prop() year!: number
}
</script>
