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
}

const commonRatios = {
  inf: {
    support: 11,
    assault: 4,
    medic: 1,
  },
  ainf: {
    assault: 15,
    medic: 1,
  },
  sinf: {
    support: 15,
    medic: 1,
  },
}

export const axisRatios = {
  ...commonRatios,
  suireb: {
    rebel: 4,
    suicide: 1,
  },
  vod: {
    vodnik: 3,
    a100mlr: 1,
  },
  blk: {
    blackEagle: 9,
    brem1: 1,
  },
  t98: {
    type98: 9,
    brem1: 1,
  },
  tungsbrem: {
    tunguskaM1: 9,
    brem1: 1,
  },
}

export const alliesRatios = {
  ...commonRatios,
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
