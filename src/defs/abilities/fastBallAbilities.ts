import { FastBallAbility, FastBallAbilityNames, fastBall } from "./commonType";

export const fastBallAbilityDefinitions: Record<
  FastBallAbilityNames,
  FastBallAbility
> = {
  straight: {
    name: "ストレート",
    direction: "straight",
    kind: fastBall,
  },
  twoSeam: {
    name: "ツーシーム",
    direction: "straight",
    kind: fastBall,
  },
  movingFast: {
    name: "ムービングファスト",
    direction: "straight",
    kind: fastBall,
  },
  verySlowBall: {
    name: "超スローボール",
    direction: "straight",
    kind: fastBall,
  },
  kokoroBreak: {
    name: "ココロブレイク",
    direction: "straight",
    kind: fastBall,
  },
  mirageStraight: {
    name: "幻影ストレート",
    direction: "straight",
    kind: fastBall,
  },
  bakusokuStraight: {
    name: "爆速ストレート",
    direction: "straight",
    kind: fastBall,
  },
  kaisokuStraight: {
    name: "快速ストレート",
    direction: "straight",
    kind: fastBall,
  },
  thunderBolt: {
    name: "サンダーボルト",
    direction: "straight",
    kind: fastBall,
  },
  risingShot: {
    name: "ライジングショット",
    direction: "straight",
    kind: fastBall,
  },
};
