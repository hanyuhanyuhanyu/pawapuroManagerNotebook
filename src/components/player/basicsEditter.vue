<template>
  <div>
      <ul>
        <li>
          苗字<input type="text" v-model="player.lastName">
        </li>
        <li>
          名前<input type="text" v-model="player.firstName">
        </li>
        <li>
          登録名: {{registeredName}}
          <ul>
            <li>
                <input type="radio" name="nameType" id="lastName" v-model="nameType" :value="lastName">
                <label for="lastName">
                苗字のみ
                </label>
            </li>
            <li>
                <input type="radio" name="nameType" id="firstName" v-model="nameType" :value="firstName">
                <label for="firstName">
                名前のみ
                </label>
            </li>
            <li>
                <input type="radio" name="nameType" id="firstAndLast" v-model="nameType" :value="firstAndLast">
                <label for="firstAndLast">
                苗字+名前
                </label>
            </li>
            <li>
                <input type="radio" name="nameType" id="nickName" v-model="nameType" :value="nickName">
                <label for="nickName">
                    ニックネーム
                    <input type="input" v-model="inputNickName">
                </label>
            </li>
          </ul>
        </li>
        <li>
          <select
            v-model="player.throwArm"
          >
            <option
              v-for="arm in Object.keys(arms)"
              :value="arm"
              :key="arm"
            >
              {{arms[arm]}}
            </option>
          </select>
            投げ
          <select
            v-model="player.hittingArm"
          >
            <option
              v-for="arm in Object.keys(armsWithBoth)"
              :value="arm"
              :key="arm"
            >
              {{armsWithBoth[arm]}}
            </option>
          </select>
          打ち
        </li>
        <li>
          誕生日({{age}})歳
          <ul>
            <li>
              年<input type="number" v-model="player.birthYear">
            </li>
            <li>
              月<input type="number" v-model="player.birthMonth">
            </li>
            <li>
              日<input type="number" v-model="player.birthDate">
            </li>
          </ul>
        </li>
        <li>
          プロ入り: <input type="number" v-model="player.professionalFrom">年(<input type="number" v-model="careerYear">年目)
        </li>
      </ul>
      メモ<br>
      <textarea cols="32" rows="3" v-model="player.memo">
      </textarea>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Player } from '../../defs/player';
import { lastName, firstName, firstAndLast, nickName, RegistrationNameType, Arms, armsMap, ArmsAndBoth, armsWithBothMap } from '../../defs/playerBasics';

@Component
export default class PlayerEditter extends Vue{
  @Prop() player!: Player
  @Prop() year!: number
  get nameType(): RegistrationNameType {
    return this.player.registrationNameType
  }
  set nameType(n: RegistrationNameType ) {
    this.player.registrationNameType = n
  }
  get firstName(): string {
    return firstName
  }
  get lastName(): string {
    return lastName
  }
  get firstAndLast(): string {
    return firstAndLast
  }
  get nickName(): string {
    return nickName
  }
  get inputNickName(): string {
    return this.player.nickName
  }
  set inputNickName(v: string) {
      this.player.registeredName = v
  }
  get registeredName(): string {
    return this.player.registeredName
  }
  get careerYear(): number {
      return this.player.careerYear(this.year)
  }
  set careerYear(year: number) {
      const diff = year - this.careerYear
      this.player.professionalFrom -= diff
  }
  get age(): number {
      return this.player.age(this.year)
  }
  get arms(): Record<Arms, string>{
    return armsMap
  }
  get armsWithBoth(): Record<ArmsAndBoth, string>{
    return armsWithBothMap
  }
}
</script>

