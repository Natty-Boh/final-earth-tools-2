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
    label: "Infantry (Support heavy)",
    composition: {
      support: 11,
      assault: 4,
      medic: 1,
    },
  },
  ainf: {
    label: "Infantry (Pure Assault + Medic)",
    composition: {
      assault: 15,
      medic: 1,
    },
  },
  sinf: {
    label: "Infantry (Pure Support + medic)",
    composition: {
      support: 15,
      medic: 1,
    },
  },
  ats: {
    label: "Infantry (Anti-Tank + support)",
    composition: {
      medic: 1,
      support: 4,
      at: 11,
    },
  },
}

export const axisRatios = {
  ...commonRatios,
  suireb: {
    label: "Suirebs",
    composition: {
      rebel: 4,
      suicide: 1,
    },
  },
  vod: {
    label: "Vodniks/MLR (Jeeps Anti-Infantry)",
    composition: {
      vodnik: 3,
      a100mlr: 1,
    },
  },
  blk: {
    label: "Black Eagles/Brem",
    composition: {
      blackEagle: 9,
      brem1: 1,
    },
  },
  t98: {
    label: "Type 98/Brem",
    composition: {
      type98: 9,
      brem1: 1,
    },
  },
  tungsbrem: {
    label: "Tungs/Brem (Tanks Anti-Air)",
    composition: {
      tunguskaM1: 9,
      brem1: 1,
    },
  },
}

export const alliesRatios = {
  ...commonRatios,
  himar: {
    label: "Humvees/Himars (Jeeps Anti-Infantry)",
    composition: {
      humvee: 3,
      himars: 1,
    },
  },
  abrams: {
    label: "Abrams/Bison (Tanks Anti-tank)",
    composition: {
      abram: 9,
      bison: 1,
    },
  },
  amx: {
    label: "AMX/Bison (cheaper Tanks Anti-tank)",
    composition: {
      amx30: 9,
      bison: 1,
    },
  },
  bradleys: {
    label: "Bradleys/Bison (Tanks Anti-Air)",
    composition: {
      bradley: 9,
      bison: 1,
    },
  },
  abramamx: {
    label: "Abram/AMX/Bison (Tanks Anti-tank)",
    composition: {
      abram: 6,
      amx30: 3,
      bison: 1,
    },
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
