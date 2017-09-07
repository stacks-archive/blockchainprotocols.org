import {getSupply} from './supply'

function getSnapshot(currencyID, price, years) {
  const supplyAfterNYears = getSupply(currencyID, years).total
  const coinsInABillionth = (supplyAfterNYears / Math.pow(10, 9)).toFixed(4)
  const priceForABillionth = (coinsInABillionth * price).toFixed(2)

  return {
    supply: supplyAfterNYears,
    supplyFormatted: supplyAfterNYears.toLocaleString(undefined, {maximumFractionDigits:0}),
    coinsInABillionth: coinsInABillionth,
    priceForABillionth: priceForABillionth
  }
}

function processCurrencyRecord(currencyRecord) {
  const currencyID = currencyRecord.id
  const price = parseFloat(currencyRecord.price_usd).toFixed(2)
  const name = currencyRecord.name
  const volume24HoursUSD = parseFloat(currencyRecord['24h_volume_usd']).toLocaleString()
  const percentChange24H = currencyRecord.percent_change_24h

  let marketCapUSD = null
  if (currencyRecord.hasOwnProperty('market_cap_usd')) {
    marketCapUSD = parseFloat(currencyRecord.market_cap_usd).toLocaleString()
  } else {
    const supplyAfter0Years = getSupply(currencyID, 0).total.toFixed(0)
    marketCapUSD = (supplyAfter0Years * price).toLocaleString()
  }

  return {
    id: currencyID,
    name: name,
    price: price,
    marketCapUSD: marketCapUSD,
    volume24HoursUSD: volume24HoursUSD,
    percentChange24H: percentChange24H,
    snapshot4Years: getSnapshot(currencyID, price, 4),
    snapshot20Years: getSnapshot(currencyID, price, 20),
  }
}

const filecoinRecord = {
  id: 'filecoin',
  name: 'Filecoin',
  price_usd: '2.65',
  '24h_volume_usd': '0.0',
  percent_change_24h: '0'
}

const tezosRecord = {
  id: 'tezos',
  name: 'Tezos',
  price_usd: '0.50',
  '24h_volume_usd': '0.0',
  percent_change_24h: '0'
}

export const supportedCurrencies = [
  'bitcoin', 'ethereum', 'bitcoin-cash', 'ripple', 'litecoin', 'ethereum-classic', 'zcash', 'filecoin', 'tezos'
]

export function fetchCurrencies() {
  return new Promise((resolve, reject) => {
    try {
      const url = 'https://blockstack-site-api.herokuapp.com/v1/prices'
      fetch(url)
      .then((response) => response.text())
      .then((responseText) => JSON.parse(responseText))
      .then((priceList) => {
        // Convert the price list into a price map
        let priceMap = {}
        priceList.map((currencyRecord) => {
          priceMap[currencyRecord.id] = currencyRecord
        })
        priceMap['filecoin'] = filecoinRecord
        priceMap['tezos'] = tezosRecord

        // Convert the price map into a list of currencies
        let currencyList = []
        supportedCurrencies.map((currencyID) => {
          if (currencyID in priceMap) {
            const currencyRecord = processCurrencyRecord(priceMap[currencyID])
            currencyList.push(currencyRecord)
          }
        })
        resolve(currencyList)
      })
      .catch((err) => {
        reject(err)
      })
    } catch (err) {
      console.warn(err.stack)
      reject(err)
    }
  })
}

/*
export function getPrice(currencyName) {
  switch (currencyName.toLowerCase()) {
    case 'bitcoin':
      return 2603.85
    case 'ethereum':
      return 309.97
    case 'zcash':
      return 330.74
    default:
      return 0
  }
}
*/

