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
    minerSupply += 2 * (years - 3)
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
  let data = {
    total: 0,
    miners: 0,
    sale: 0,
    creators: 0,
    protocolLabs: 0,
    filecoinFoundation: 0
  }

  if (years !== 0) {
    // Miner Supply
    const finalMinerSupply = 1.4 * Math.pow(10, 9)
    const miningHalfLife = 6
    const minerDecayCoefficient = Math.log(0.5)/miningHalfLife
    const minerSupply = finalMinerSupply * (1 - Math.exp(minerDecayCoefficient*years))

    // Creator Supply
    const finalCreatorSupply = 0.4 * Math.pow(10, 9)
    const creatorVest = 6
    const creatorSupply = Math.min(creatorVest, years) / creatorVest * finalCreatorSupply

    //const creatorDecayCoefficient = Math.log(0.2/0.4)/2
    //const creatorSupply = finalCreatorSupply * (1 - Math.exp(creatorDecayCoefficient*years))

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

    data = {
      total: totalSupply,
      miners: minerSupply,
      sale: saleSupply,
      creators: creatorSupply,
      creatorPercentage: creatorPercentage,
      protocolLabs: protocolLabsSupply,
      filecoinFoundation: filecoinFoundationSupply,
    }
  }
  if (years !== 20) {
    //console.log(`Years: ${years}`)
    //console.log(data)
  }
  return data
}

export function getTezosSupply(years) {
  const saleSupply = 65681 * 5000 + 361122 * 500
  const creatorSupply = saleSupply * 0.25
  const initialSupply = saleSupply + creatorSupply
  let totalSupply = initialSupply
  /*for (let i = 0; i < years; i += 1) {
    totalSupply += initialSupply * 0.05
  }*/
  const minerSupply = totalSupply - initialSupply
  const originalCreatorPercentage = 0.2
  const creatorPercentage = (years === 0 ? originalCreatorPercentage : (creatorSupply / totalSupply))

  return {
    total: totalSupply,
    miners: minerSupply,
    sale: saleSupply,
    creators: creatorSupply,
    creatorPercentage: creatorPercentage
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

export function getTokenSupplyFunction(type, parameters) {
  const requiredKeys = [
    'saleSupply', 'userSupply', 'creatorSupply',
    'initialBlockReward', 'finalBlockReward',
  ]
  requiredKeys.forEach(requiredKey => {
    if (!parameters.hasOwnProperty(requiredKey)) {
      throw `Parameter missing: ${requiredKey}`
    }
  })

  // Return the halving function
  return function(years) {
    if (years === 0) {
      return {
        total: 0,
        miners: 0,
        users: 0,
        sale: 0,
        creators: 0,
        burners: 0,
        apps: 0,
      }
    }

    // Sale Supply
    const saleVest = 2
    const saleSupply =  Math.min(saleVest, years) / saleVest * parameters.saleSupply

    // Creator Supply
    const creatorVest = 4
    const creatorSupply = Math.min(creatorVest, years) / creatorVest * parameters.creatorSupply

    // User Supply
    const yearsPerHalving = 1
    const userDecayCoefficient = Math.log(0.5)/yearsPerHalving
    const userSupply = parameters.userSupply * (1 - Math.exp(userDecayCoefficient*years))

    // Miner Supply
    let minerSupply = 0
    for (let i = 0; i < years; i++) {
      const rewardDecay = i * 500
      const newSupplyThisYear = 55000 * Math.max(parameters.initialBlockReward - rewardDecay, parameters.finalBlockReward)
      //const newSupplyThisYear = Math.pow(10, 9) * 1 / Math.min(16, (i + parseInt(parameters.initialMiningFraction)))
      minerSupply = minerSupply + newSupplyThisYear
    }

    const burnerSupply = minerSupply * 0.8
    const appSupply = minerSupply * 0.2

    const totalSupply = minerSupply + saleSupply + creatorSupply + userSupply

    const supplyData = {
      total: totalSupply,
      miners: minerSupply,
      users: userSupply,
      sale: saleSupply,
      creators: creatorSupply,
      burners: burnerSupply,
      apps: appSupply,
      creatorPercentage: creatorSupply / totalSupply
    }
    return supplyData
  }
}

/*
    //const initialMiningSupply = 330 * Math.pow(10, 6)

    //const initialMinerSupply = parameters.initialMinerSupply

      const decayCoefficientThisYear = Math.min(
        parameters.numberOfMiningDecays,
        Math.floor(i / parameters.miningDecayInterval)
      )
      const newSupplyThisYear = miningSupplyPerYear * Math.pow(
        parameters.miningDecayCoefficient, decayCoefficientThisYear)

      //const newSupplyThisYear = miningSupplyPerYear * (12 - Math.min(9, i / 2) ) / 12
      //console.log(newSupplyThisYear)

export function getTokenSupplyFunction(saleSupplyI,
                                       creatorSupplyI,
                                       minerSupplyPerYearI,
                                       miningDecayCoefficient,
                                       miningDecayInterval,
                                       numberOfMiningDecays) {

}*/

export function getSupply(currencyName, years) {
  switch (currencyName.toLowerCase()) {
    case 'bitcoin':
      return getBitcoinSupply(years)
    case 'ethereum':
      return getEthereumSupply(years)
    case 'zcash':
      return getZcashSupply(years)
    case 'filecoin':
      return getFilecoinSupply(years)
    case 'tezos':
      return getTezosSupply(years)
    default:
      return 0
  }
}

/*
export function getSupplyGrowth(currencyName, years) {
  const thisYearsSupply = getSupply(currencyName, years).total
  const nextYearsSupply = getSupply(currencyName, years+1).total
  const supplyGrowth = (nextYearsSupply - thisYearsSupply) / thisYearsSupply
  return supplyGrowth
}*/