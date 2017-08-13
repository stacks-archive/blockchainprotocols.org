import {getSupply} from './supply'

function processCurrencyRecord(currencyRecord, years) {
  const id = currencyRecord.id
  const price = parseFloat(currencyRecord.price_usd).toFixed(2)
  const name = currencyRecord.name
  const supply = getSupply(id, years).total
  const coinsInABillionth = (supply / Math.pow(10, 9)).toFixed(4)
  const priceForABillionth = (coinsInABillionth * price).toFixed(2)
  const volume24HoursUSD = parseFloat(currencyRecord['24h_volume_usd']).toLocaleString()
  const percentChange24H = currencyRecord.percent_change_24h

  let marketCap = null
  if (currencyRecord.hasOwnProperty('market_cap_usd')) {
    marketCap = parseFloat(currencyRecord.market_cap_usd).toLocaleString()
  } else {
    const supplyAfter0Years = getSupply(id, 0).total.toFixed(0)
    marketCap = (supplyAfter0Years * price).toLocaleString()
  }

  return {
    id: id,
    name: name,
    price: price,
    supply: supply,
    coinsInABillionth: coinsInABillionth,
    priceForABillionth: priceForABillionth,
    marketCapUSD: marketCap,
    volume24HoursUSD: volume24HoursUSD,
    percentChange24H: percentChange24H
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
  'bitcoin', 'ethereum', 'zcash', 'filecoin', 'tezos'
]

export function fetchCurrencies(years) {
  return new Promise((resolve, reject) => {
    try {
      const url = 'https://blockstack-site-api.herokuapp.com/v1/prices'
      fetch(url)
      .then((response) => response.text())
      .then((responseText) => JSON.parse(responseText))
      .then((priceList) => {
        console.log(priceList)

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
            const currencyRecord = processCurrencyRecord(priceMap[currencyID], years)
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

