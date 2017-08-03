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
  const founderSupply = preHalvingAnnualSupply * originalSatoshiMiningPercentage
  const minerSupply = totalSupply - founderSupply

  const founderPercentage = years === 0 ? originalSatoshiMiningPercentage : (founderSupply / totalSupply)

  return {
    total: totalSupply,
    miners: minerSupply,
    sale: saleSupply,
    founders: founderSupply,
    founderPercentage: founderPercentage
  }
}

export function getEthereumSupply(years) {
  const saleSupply = 60 * Math.pow(10, 6)
  const founderSupply = 12 * Math.pow(10, 6)

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

  const totalSupply = minerSupply + saleSupply + founderSupply

  return {
    total: totalSupply,
    miners: minerSupply,
    sale: saleSupply,
    founders: founderSupply,
    founderPercentage: founderSupply / totalSupply
  }
}

export function getFilecoinSupply(years) {
  let data = {
    total: 0,
    miners: 0,
    sale: 0,
    founders: 0,
    founderPercentage: 0.379
  }

  if (years !== 0) {
    // Miner Supply
    const finalMinerSupply = 1.4 * Math.pow(10, 9)
    const minerDecayCoefficient = Math.log(0.7/1.4)/6
    const minerSupply = finalMinerSupply * (1 - Math.exp(minerDecayCoefficient*years))

    // Founder Supply
    const finalFounderSupply = 0.4 * Math.pow(10, 9)
    const founderDecayCoefficient = Math.log(0.2/0.4)/2
    const founderSupply = finalFounderSupply * (1 - Math.exp(founderDecayCoefficient*years))

    // Sale Supply
    const totalSaleSupply = 0.2 * Math.pow(10, 9)
    const saleSupply = Math.min(3, years) / 3. * totalSaleSupply

    // Total Supply
    const totalSupply = minerSupply + saleSupply + founderSupply

    // Founder Percentage
    const founderPercentage = founderSupply / totalSupply

    data = {
      total: totalSupply,
      miners: minerSupply,
      sale: saleSupply,
      founders: founderSupply,
      founderPercentage: founderPercentage
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
  const founderSupply = saleSupply * 0.25
  const initialSupply = saleSupply + founderSupply
  let totalSupply = initialSupply
  /*for (let i = 0; i < years; i += 1) {
    totalSupply += initialSupply * 0.05
  }*/
  const minerSupply = totalSupply - initialSupply
  const originalFounderPercentage = 0.2
  const founderPercentage = (years === 0 ? originalFounderPercentage : (founderSupply / totalSupply))

  return {
    total: totalSupply,
    miners: minerSupply,
    sale: saleSupply,
    founders: founderSupply,
    founderPercentage: founderPercentage
  }
}

export function getZcashSupply(years) {
  const totalSupply = getBitcoinSupply(years).total
  const saleSupply = 0
  const originalFounderPercentage = 0.2
  const founderSupply = getBitcoinSupply(Math.min(4, years)).total * originalFounderPercentage
  const minerSupply = totalSupply - founderSupply
  const founderPercentage = (years === 0 ? originalFounderPercentage : (founderSupply / totalSupply))

  //console.log(`Zcash - total: ${totalSupply}; founder: ${founderSupply}; founder %: ${founderPercentage}`)

  return {
    total: totalSupply,
    miners: minerSupply,
    sale: saleSupply,
    founders: founderSupply,
    founderPercentage: founderPercentage
  }
}

export function getTokenSupplyFunction(type, parameters) {
  const requiredKeys = [
    'saleSupply', 'userSupply', 'creatorSupply', 'initialMiningSupply',
  ]
  requiredKeys.forEach(requiredKey => {
    if (!parameters.hasOwnProperty(requiredKey)) {
      throw `Parameter missing: ${requiredKey}`
    }
  })

  // Return the halving function
  return function(years) {
    // Sale Supply
    const saleVest = 2
    const saleSupply =  Math.min(saleVest, years) / saleVest * parameters.saleSupply

    // Founder Supply
    const founderVest = 4
    const creatorSupply = Math.min(founderVest, years) / founderVest * parameters.creatorSupply

    // User Supply
    const userVest = 12
    const userSupply = Math.min(userVest, years) / userVest * parameters.userSupply

    // Miner Supply
    let minerSupply = 0
    for (let i = 0; i < years; i++) {
      const newSupplyThisYear = parameters.initialMiningSupply * (12 - Math.min(9, i) ) / 12
      //const newSupplyThisYear = Math.pow(10, 9) * 1 / Math.min(16, (i + parseInt(parameters.initialMiningFraction)))
      minerSupply = minerSupply + newSupplyThisYear
    }

    const burnerSupply = minerSupply * 0.9
    const appSupply = minerSupply * 0.1

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
                                       founderSupplyI,
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