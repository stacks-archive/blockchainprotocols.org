export function getBitcoinSupply(years) {
  const finalSupply = 21 * Math.pow(10, 6)

  let totalSupply = 0
  const yearsBetweenHalvings = 4
  const initialSupplyPerYear = finalSupply / (2 * yearsBetweenHalvings)

  for (let i = 0; i < years; i++) {
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

export function getTokenSupplyFunction(saleSupplyI,
                                       founderSupplyI,
                                       minerSupplyPerYearI,
                                       miningDecayCoefficient,
                                       miningDecayInterval,
                                       numberOfMiningDecays) {
  return function(years) {
    const saleSupply = saleSupplyI
    const founderSupply = founderSupplyI
    const minerSupplyPerYear = minerSupplyPerYearI

    let minerSupply = 0

    for (let i = 0; i < years; i++) {
      const decayCoefficientThisYear = Math.min(numberOfMiningDecays, Math.floor(i / miningDecayInterval))
      const newSupplyThisYear = minerSupplyPerYear * Math.pow(miningDecayCoefficient, decayCoefficientThisYear)
      minerSupply = minerSupply + newSupplyThisYear
    }

    const totalSupply = minerSupply + saleSupply + founderSupply

    const supplyData = {
      total: totalSupply,
      miners: minerSupply,
      sale: saleSupply,
      founders: founderSupply,
      founderPercentage: founderSupply / totalSupply
    }
    return supplyData
  }
}

export function getBlockstackSupply(years) {
  const saleSupply = 60
  const founderSupply = 12
  const minerSupplyPerYear = 12

  const miningDecayCoefficient = 0.5
  const miningDecayInterval = 4
  const numberOfMiningDecays = 2

  const tokenSupplyFunction = getTokenSupplyFunction(
    saleSupply, founderSupply, minerSupplyPerYear,
    miningDecayCoefficient, miningDecayInterval, numberOfMiningDecays)
  
  return tokenSupplyFunction(years)
}

/*
export function getBlockstackSupply(years) {
  const saleSupply = 60 * Math.pow(10, 6)
  const founderSupply = 12 * Math.pow(10, 6)

  let minerSupply = 0
  const initialSupplyPerYear = 12 * Math.pow(10, 6)
  const yearsBetweenHalvings = 4

  for (let i = 0; i < years; i++) {
    const halvingCoefficientThisYear = Math.min(2, Math.floor(i / yearsBetweenHalvings))
    const newSupplyThisYear = initialSupplyPerYear * Math.pow(0.5, halvingCoefficientThisYear)
    minerSupply = minerSupply + newSupplyThisYear
  }

  const totalSupply = minerSupply + saleSupply + founderSupply

  return {
    total: totalSupply,
    miners: minerSupply,
    sale: saleSupply,
    founders: founderSupply,
    founderPercentage: founderSupply / totalSupply
  }
}*/

export function getSupply(currencyName, years) {
  switch (currencyName.toLowerCase()) {
    case 'bitcoin':
      return getBitcoinSupply(years)
    case 'ethereum':
      return getEthereumSupply(years)
    case 'zcash':
      return getZcashSupply(years)
    case 'blockstack':
      return getBlockstackSupply(years)
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