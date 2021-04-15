const commonUnits = {
  support: {
    cost: 125000,
    label: "Support",
  },
  assault: {
    cost: 100000,
    label: "Assault",
  },
  medic: {
    cost: 250000,
    label: "Medic",
  },
  at: {
    cost: 200000,
    label: "Anti Tank",
  },
}

export const axisUnits = {
  ...commonUnits,
  rebel: {
    cost: 35000,
    label: "Rebel",
  },
  suicide: {
    cost: 150000,
    label: "Suicide bomber",
  },
  vodnik: {
    cost: 300000,
    label: "Vodnik",
  },
  type98: {
    cost: 2150000,
    label: "Type 98",
  },
  tunguskaM1: {
    cost: 3500000,
    label: "Tunguska M1",
  },
  brem1: {
    cost: 5000000,
    label: "Brem-1",
  },
  a100mlr: {
    cost: 3000000,
    label: "A-100 MLR",
  },
  blackEagle: {
    cost: 8000000,
    label: "Black Eagle",
  },
}

export const alliesUnits = {
  ...commonUnits,
  humvee: {
    cost: 250000,
    label: "Humvee",
  },
  strykers: {
    cost: 2300000,
    label: "IAV Stryker",
  },
  amx30: {
    cost: 3000000,
    label: "AMX-30",
  },
  bradley: {
    cost: 4500000,
    label: "M3A3 Bradley",
  },
  bison: {
    cost: 4000000,
    label: "MRV Bison",
  },
  himars: {
    cost: 4200000,
    label: "M142 HIMARS",
  },
  abram: {
    cost: 6200000,
    label: "M1A2 Abram",
  },
}

const commonRatios = {
  inf: {
    label: "Support Heavy Infantry",
    composition: {
      support: 11,
      assault: 4,
      medic: 1,
    },
    tooltip: "Primarily for fighting other infantry. A balance of high life and decent infantry damage. Decent against choppers.",
  },
  ahinf: {
    label: "Assault Heavy Infantry",
    composition: {
      support: 4,
      assault: 11,
      medic: 1,
    },
    tooltip: "Primarily for fighting other infantry. A balance of high infantry damage and modest life. Very limited defense against choppers.",
  },
  ainf: {
    label: "Assport (Infantry)",
    composition: {
      assault: 3,
      support: 1,
    },
    tooltip: "Primarily for fighting other infantry. Maximum damage against infantry. Supports provide cover to reduce losses in place of medics. Very limited defense against chopper" ,
  },
  sinf: {
    label: "Pure Support Infantry",
    composition: {
      support: 15,
      medic: 1,
    },
    tooltip: "Primarily for fighting other infantry. A maximum life build that still does modest infantry damage. Can be very effective against choppers.",
  },

}

export const axisRatios = {
  ...commonRatios,
  suireb: {
    label: "Suirebs (Infantry)",
    composition: {
      rebel: 4,
      suicide: 1,
    },
    tooltip: "A high-risk build that excels at attacking jeeps, tanks, and weakened infantry, but gets decimated if itself is attacked by infantry or choppers. Bad for big battles generally.",
  },
  vod: {
    label: "Vodniks/MLR (Jeeps - Anti-Inf)",
    composition: {
      vodnik: 3,
      a100mlr: 1,
    },
    tooltip: "Anti-infantry build. Does good damage against infantry but very vulnerable to tanks. Limited bombing capabilities.",
  },
  blk: {
    label: "Black Eagles (Tanks - Anti-Tank)",
    composition: {
      blackEagle: 9,
      brem1: 1,
    },
    tooltip: "For fighting other tanks and decimating jeeps. Highest life tank build, at cost of slightly less damage.",
  },
  t98: {
    label: "Type 98 (Tanks - Anti-Tank)",
    composition: {
      type98: 9,
      brem1: 1,
    },
    tooltip: "For fighting other tanks and decimating jeeps. Higest damage tank build, at cost of less life. ",
  },
  tungsbrem: {
    label: "Tungs (Tanks - Anti-Air)",
    composition: {
      tunguskaM1: 9,
      brem1: 1,
    },
    tooltip: "Anti air. Good against chopper and planes. Weak to other tanks, but not as vulnerable to them as jeeps.",
  },
  bet98: {
    label: "Black Eagles/Type 98s (Tanks - Anti-Tank)",
    composition: {
      blackEagle: 11,
      type98: 7,
      brem1: 2,
    },
    tooltip: "For fighting other tanks and decimating jeeps. Good mix of high damage and high life.",
  },
}

export const alliesRatios = {
  ...commonRatios,
  ats: {
    label: "Anti Tank Infantry",
    composition: {
      medic: 1,
      support: 4,
      at: 11,
    },
    tooltip: "A somewhat high-risk build for attacking jeeps and tanks. But are low life so are killed easily by other infantry. Bad for big battles generally.",
  },
  himar: {
    label: "Humvees/Himars (Jeeps - Anti-Inf)",
    composition: {
      humvee: 3,
      himars: 1,
    },
    tooltip: "Anti-infantry build. Does good damage against infantry but very vulnerable to tanks. Limited bombing capabilities.",
  },
  abrams: {
    label: "Abrams (Tanks - Anti-Tank)",
    composition: {
      abram: 9,
      bison: 1,
    },
    tooltip: "For fighting other tanks and decimating jeeps. Highest life tank build, at cost of slightly less damage.",
  },
  amx: {
    label: "AMXs (Tanks - Anti-Tank)",
    composition: {
      amx30: 9,
      bison: 1,
    },
    tooltip: "For fighting other tanks and decimating jeeps. Higest damage tank build, at cost of less life.",
  },
  bradleys: {
    label: "Bradleys (Tanks - Anti-Air)",
    composition: {
      bradley: 9,
      bison: 1,
    },
    tooltip: "Anti air. Good against chopper and planes. Weak to other tanks, but not as vulnerable to them as jeeps.",
  },
  abramamx: {
    label: "Abrams/AMXs (Tanks - Anti-Tank)",
    composition: {
      abram: 11,
      amx30: 7,
      bison: 2,
    },
    tooltip: "For fighting other tanks and decimating jeeps. Good mix of high damage and high life.",
  },
}

export function applyRatio(ratio, funds, units) {
  const batchCost = Object.entries(ratio).reduce(
    (sum, [unit, amount]) => sum + units[unit].cost * amount,
    0
  )

  return Object.fromEntries(
    Object.entries(ratio).map(([unit, amount]) => [
      unit,
      {
        quantity: Math.floor((amount * funds) / batchCost),
        unit: units[unit],
      },
    ])
  )
}
