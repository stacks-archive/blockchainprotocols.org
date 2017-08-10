export function fetchPrices() {
  return new Promise((resolve, reject) => {
    try {
      const url = 'https://blockstack-site-api.herokuapp.com/v1/prices'
      fetch(url)
      .then((response) => response.text())
      .then((responseText) => JSON.parse(responseText))
      .then((priceList) => {
        let priceObject = {}

        priceObject['filecoin-4'] = {id: 'filecoin', name: 'Filecoin @ $4', price_usd: '4.00'}
        priceObject['filecoin-2'] = {id: 'filecoin', name: 'Filecoin @ $2', price_usd: '2.00'}
        priceObject['filecoin-1'] = {id: 'filecoin', name: 'Filecoin @ $1', price_usd: '1.00'}
        priceObject['tezos'] = {id: 'tezos', name: 'Tezos', price_usd: '0.50'}

        priceList.map((priceItem) => {
          priceObject[priceItem.id] = priceItem
        })

        resolve(priceObject)
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

export const currencyNames = [
  'bitcoin', 'ethereum', 'zcash', 'filecoin-4', 'filecoin-2', 'filecoin-1', 'tezos'
]
