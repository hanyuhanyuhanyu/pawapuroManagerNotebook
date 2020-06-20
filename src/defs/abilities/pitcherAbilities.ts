import {
  vsLeftyBatter,
  accelerated,
  quick,
  recovery,
  PitcherAbilityNames,
  Ability,
  integer,
  toggle,
  feature,
  superAndInfer,
} from "./commonType";

export const pitcherAbilityDefinitions: Record<PitcherAbilityNames, Ability> = {
  stamina: {
    name: "スタミナ",
    abbreviation: "スタ",
    maximum: 100,
    minimum: 1,
    kind: integer,
  },
  controll: {
    name: "コントロール",
    abbreviation: "コン",
    maximum: 100,
    minimum: 1,
    kind: integer,
  },
  ballSpeed: {
    name: "球速",
    maximum: 175,
    minimum: 80,
    kind: integer,
  },
  vsLeftyBatter: {
    name: "対左打者",
    abbreviation: "対左",
    maximum: 6,
    minimum: 0,
    supreme: {
      name: "左キラー",
      abbreviation: "左キ",
    },
    kind: vsLeftyBatter,
  },
  vsPinch: {
    name: "対ピンチ",
    abbreviation: "対ピ",
    maximum: 6,
    minimum: 0,
    supreme: {
      name: "強心臓",
      abbreviation: "強心",
    },
    inferior: {
      name: "ノミの心臓",
      abbreviation: "ノミ",
    },
    kind: superAndInfer,
  },
  tough: {
    name: "打たれ強さ",
    abbreviation: "打強",
    maximum: 6,
    minimum: 0,
    supreme: {
      name: "不屈の魂",
      abbreviation: "不屈",
    },
    inferior: {
      name: "ガラスのハート",
      abbreviation: "ｶﾞﾗｽ",
    },
    kind: superAndInfer,
  },
  accelerated: {
    name: "ノビ",
    maximum: 6,
    minimum: 0,
    supreme: {
      name: "怪童",
    },
    kind: accelerated,
  },
  quick: {
    name: "クイック",
    abbreviation: "クイ",
    maximum: 6,
    minimum: 0,
    supreme: {
      name: "走者釘付",
      abbreviation: "釘付",
    },
    kind: quick,
  },
  recovery: {
    name: "回復",
    maximum: 6,
    minimum: 0,
    supreme: {
      name: "ガソリンタンク",
      abbreviation: "ｶﾞｿﾘﾝ",
    },
    kind: recovery,
  },
  gyro: {
    good: {
      abbreviation: "ｼﾞｬｲﾛ",
      name: "ジャイロボール",
    },
    supreme: {
      name: "ハイスピンジャイロ",
      abbreviation: "Hｼﾞｬｲﾛ",
    },
    kind: toggle,
  },
  strikeOut: {
    good: {
      name: "奪三振",
      abbreviation: "奪三",
    },
    supreme: {
      name: "ドクターＫ",
      abbreviation: "Dr.K",
    },
    kind: toggle,
  },
  acute: {
    good: {
      name: "キレ○",
      abbreviation: "ｷﾚ○",
    },
    supreme: {
      name: "驚異の切れ味",
      abbreviation: "切れ味",
    },
    kind: toggle,
  },
  slowFast: {
    good: {
      name: "緩急○",
      abbreviation: "緩急",
    },
    supreme: {
      name: "変幻自在",
      abbreviation: "変幻",
    },
    kind: toggle,
  },
  hipUp: {
    good: {
      name: "尻上がり",
      abbreviation: "尻上",
    },
    supreme: {
      name: "終盤力",
      abbreviation: "終盤",
    },
    kind: toggle,
  },
  escape: {
    good: {
      name: "逃げ球",
    },
    bad: {
      name: "一発",
    },
    supreme: {
      name: "本塁打厳禁",
      abbreviation: "厳禁",
    },
    kind: toggle,
  },
  heavy: {
    good: {
      name: "重い球",
    },
    bad: {
      name: "軽い球",
    },
    supreme: {
      name: "怪物球威",
      abbreviation: "怪物",
    },
    kind: toggle,
  },
  inning: {
    good: {
      name: "回またぎ○",
      abbreviation: "回跨ぎ",
    },
    kind: toggle,
  },
  luck: {
    good: {
      name: "勝ち運",
      abbreviation: "勝運",
    },
    bad: {
      name: "負け運",
      abbreviation: "負運",
    },
    supreme: {
      name: "勝利の星",
      abbreviation: "星",
    },
    kind: toggle,
  },
  stableSpeed: {
    good: {
      name: "球速安定",
      abbreviation: "安定",
    },
    kind: toggle,
  },
  emergency: {
    good: {
      name: "緊急登板○",
    },
    kind: toggle,
  },
  crossFire: {
    good: {
      name: "クロスファイヤー",
      abbreviation: "ｸﾛｽ",
    },
    kind: toggle,
  },
  checkBall: {
    good: {
      name: "牽制○",
      abbreviation: "牽制",
    },
    kind: toggle,
  },
  international: {
    good: {
      name: "国際大会○",
      abbreviation: "国際○",
    },
    bad: {
      name: "国際大会×",
      abbreviation: "国際×",
    },
    kind: toggle,
  },
  guts: {
    good: {
      name: "根性○",
      abbreviation: "根○",
    },
    supreme: {
      name: "ド根性",
    },
    kind: toggle,
  },
  shooting: {
    bad: {
      name: "シュート回転",
      abbreviation: "ｼｭｰﾄ",
    },
    kind: toggle,
  },
  slowStarter: {
    bad: {
      name: "スロースターター",
      abbreviation: "スロー",
    },
    kind: toggle,
  },
  vsGoodHitter: {
    good: {
      name: "対強打者○",
      abbreviation: "対強○",
    },
    supreme: {
      name: "主砲キラー",
      abbreviation: "主砲キ",
    },
    kind: toggle,
  },
  reflexes: {
    good: {
      name: "打球反応○",
      abbreviation: "反応○",
    },
    kind: toggle,
  },
  holdingBall: {
    good: {
      name: "球持ち",
    },
    kind: toggle,
  },
  impatient: {
    bad: {
      name: "短気",
    },
    kind: toggle,
  },
  sabotage: {
    name: "力配分",
    kind: feature,
  },
  fightingSprit: {
    good: {
      name: "闘志",
    },
    kind: toggle,
  },
  inCourse: {
    good: {
      name: "内角攻め",
      abbreviation: "内角",
    },
    supreme: {
      name: "内角無双",
      abbreviation: "内無双",
    },
    kind: toggle,
  },
  lowCourse: {
    good: {
      name: "低め○",
    },
    supreme: {
      name: "精密機械",
      abbreviation: "精密",
    },
    kind: toggle,
  },
  pokerFace: {
    name: "ポーカーフェイス",
    abbreviation: "ﾎﾟｰｶｰ",
    kind: feature,
  },
  four: {
    bad: {
      name: "四球",
    },
    kind: toggle,
  },
  hunting: {
    bad: {
      name: "乱調",
    },
    kind: toggle,
  },
  release: {
    good: {
      name: "リリース○",
      abbreviation: "ﾘﾘｰｽ",
    },
    kind: toggle,
  },
  fearfullPitcher: {
    good: {
      name: "投手威圧感",
      abbreviation: "投威",
    },
    kind: toggle,
  },
};
