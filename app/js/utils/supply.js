export function getBitcoinSupply(years) {
  const finalSupply = 21 * Math.pow(10, 6)

  let totalSupply = 0
  const yearsBetweenHalvings = 4
  const initialSupplyPerYear = finalSupply / (2 * yearsBetweenHalvings)

  for (let i = 0; i < years; i += 1) {
    const halvingCoefficientThisYear = Math.floor(i / yearsBetweenHalvings)
    const newSupplyThisYear = initialSupplyPerYear * Math.pow(0.5, halvingCoefficientThisYear)
    totalSupply = totalSupply + newSupplyThisYear
  }

  const saleSupply = 0
  const originalSatoshiMiningPercentage = 0.4
  const preHalvingAnnualSupply = 10.5 * Math.pow(10, 6) * 0.25
  const creatorSupply = preHalvingAnnualSupply * originalSatoshiMiningPercentage
  const minerSupply = totalSupply - creatorSupply

  const creatorPercentage = years === 0 ? originalSatoshiMiningPercentage : (creatorSupply / totalSupply)

  return {
    total: totalSupply,
    miners: minerSupply,
    sale: saleSupply,
    creators: creatorSupply,
    creatorPercentage: creatorPercentage
  }
}

export function getEthereumSupply(years) {
  const saleSupply = 60 * Math.pow(10, 6)
  const creatorSupply = 12 * Math.pow(10, 6)

  let minerSupply = 0

  if (years > 0) {
    minerSupply += 11
  }
  if (years > 1) {
    minerSupply += 7
  }
  if (years > 2) {
    minerSupply += 4
  }
  if (years > 3) {
    minerSupply += 1.5 * (years - 3)
  }

  minerSupply = minerSupply * Math.pow(10, 6)

  const totalSupply = minerSupply + saleSupply + creatorSupply

  return {
    total: totalSupply,
    miners: minerSupply,
    sale: saleSupply,
    creators: creatorSupply,
    creatorPercentage: creatorSupply / totalSupply
  }
}

export function getFilecoinSupply(years) {
  // Miner Supply
  const finalMinerSupply = 1.4 * Math.pow(10, 9)
  const miningHalfLife = 6
  const minerDecayCoefficient = Math.log(0.5)/miningHalfLife
  const minerSupply = finalMinerSupply * (1 - Math.exp(minerDecayCoefficient*years))

  // Creator Supply
  const finalCreatorSupply = 0.4 * Math.pow(10, 9)
  const creatorVest = 6
  const creatorSupply = Math.min(creatorVest, years) / creatorVest * finalCreatorSupply

  // Sale Supply
  const totalSaleSupply = 0.2 * Math.pow(10, 9)
  const saleVest = 1
  const saleSupply = Math.min(saleVest, years) / saleVest * totalSaleSupply

  // Total Supply
  const totalSupply = minerSupply + saleSupply + creatorSupply

  // Creator Percentage
  const creatorPercentage = creatorSupply / totalSupply

  const protocolLabsSupply = creatorSupply * 3/4.
  const filecoinFoundationSupply = creatorSupply * 1/4.

  return {
    total: totalSupply,
    miners: minerSupply,
    sale: saleSupply,
    creators: creatorSupply,
    creatorPercentage: creatorPercentage,
    protocolLabs: protocolLabsSupply,
    filecoinFoundation: filecoinFoundationSupply,
  }
}

export function getRippleSupply(/*years*/) {
  const totalSupply = 100 * Math.pow(10, 9)
  const creatorSupply = totalSupply
  const minerSupply = 0
  const saleSupply = 0

  return {
    total: totalSupply,
    miners: minerSupply,
    sale: saleSupply,
    creators: creatorSupply,
  }
}

export function getTezosSupply(years) {
  let saleSupply = 607256285
  let creatorSupply = saleSupply * 0.25
  let initialSupply = saleSupply + creatorSupply
  let runningSupply = initialSupply
  for (let i = 0; i < years; i++) {
    runningSupply = runningSupply * 1.05
  }
  let minerSupply = runningSupply - initialSupply
  let totalSupply = initialSupply + minerSupply
  let originalCreatorPercentage = 0.2

  return {
    total: totalSupply,
    initial: initialSupply,
    miners: minerSupply,
    sale: saleSupply,
    creators: creatorSupply,
    creatorPercentage: originalCreatorPercentage
  }
}

export function getLitecoinSupply(years) {
  const totalSupply = getBitcoinSupply(years).total * 4
  const saleSupply = 0
  const creatorSupply = 0
  const minerSupply = totalSupply - creatorSupply

  return {
    total: totalSupply,
    miners: minerSupply,
    sale: saleSupply,
    creators: creatorSupply
  }
}

export function getZcashSupply(years) {
  const totalSupply = getBitcoinSupply(years).total
  const saleSupply = 0
  const originalCreatorPercentage = 0.2
  const creatorSupply = getBitcoinSupply(Math.min(4, years)).total * originalCreatorPercentage
  const minerSupply = totalSupply - creatorSupply
  const creatorPercentage = (years === 0 ? originalCreatorPercentage : (creatorSupply / totalSupply))

  return {
    total: totalSupply,
    miners: minerSupply,
    sale: saleSupply,
    creators: creatorSupply,
    creatorPercentage: creatorPercentage
  }
}

export function getBlockstackSupplyFunction(years) {
  const blocksPerYear = 55000

  const p = {
    initialBlockReward: 8000,
    finalBlockReward: 2000,
    rewardDecayBase: 500,
    saleVest: 2,
    userVest: 2,
    appMiningFraction: 0.25,
    majorPartySupply: (8000 * blocksPerYear),
  }

  const saleSupplyTotal = p.majorPartySupply
  const creatorSupplyTotal = p.majorPartySupply
  const userSaleTotal = p.majorPartySupply
  const userMiningTotal = p.majorPartySupply * 0.5

  let totalSupply = 0
  let minerSupply = 0
  let appSupply = 0
  let creatorSupply = 0

  for (let i = 0; i < years; i++) {
    if (i >= 0 && i < 3) {
      creatorSupply += creatorSupplyTotal * 0.25
    }
    if (i >= 3 && i < 7) {
      creatorSupply += creatorSupplyTotal * 0.25/4
    }
  }

  let saleSupply = saleSupplyTotal * Math.min(p.saleVest, years) / p.saleVest
  let userSaleSupply = userSaleTotal * Math.min(p.userVest, years) / p.userVest
  let userMiningSupply = userMiningTotal * Math.min(p.userVest, years) / p.userVest

  for (let i = 0; i < years; i++) {
    const newSupplyThisYear = blocksPerYear * Math.max(p.initialBlockReward - (i * p.rewardDecayBase), p.finalBlockReward)

    if (i >= 0 && i < 4) {
      minerSupply += newSupplyThisYear * (1 - p.appMiningFraction)
      appSupply += newSupplyThisYear * p.appMiningFraction
    } else {
      minerSupply += newSupplyThisYear
    }
  }

  totalSupply = minerSupply + saleSupply + creatorSupply + appSupply + userSaleSupply + userMiningSupply

  const supplyData = {
    total: totalSupply,
    sale: saleSupply,
    creators: creatorSupply,
    miners: minerSupply,
    apps: appSupply,
    userSale: userSaleSupply,
    userMining: userMiningSupply,
    users: userSaleSupply + userMiningSupply,

    year: years,
    initialBlockReward: p.initialBlockReward,
    finalBlockReward: p.finalBlockReward,
    rewardDecayBase: p.rewardDecayBase
  }
  return supplyData
}

export function getUnknownTokenSupply() {
  return {
    total: 0,
    creators: 0
  }
}

export function getSupply(currencyName, years) {
  switch (currencyName.toLowerCase()) {
    case 'bitcoin':
      return getBitcoinSupply(years)
    case 'bitcoin-cash':
      return getBitcoinSupply(years)
    case 'litecoin':
      return getLitecoinSupply(years)
    case 'ethereum':
      return getEthereumSupply(years)
    case 'ethereum-classic':
      return getEthereumSupply(years)
    case 'ripple':
      return getRippleSupply(years)
    case 'zcash':
      return getZcashSupply(years)
    case 'filecoin':
      return getFilecoinSupply(years)
    case 'tezos':
      return getTezosSupply(years)
    case 'blockstack':
      return getBlockstackSupplyFunction(years)
    default:
      return getUnknownTokenSupply()
  }
}

