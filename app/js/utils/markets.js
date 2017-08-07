export function fetchPrices() {
  return new Promise((resolve, reject) => {
    try {
      const url = 'https://blockstack-site-api.herokuapp.com/v1/prices'
      fetch(url)
      .then((response) => response.text())
      .then((responseText) => JSON.parse(responseText))
      .then((priceList) => {
        let priceObject = {}

        priceObject['filecoin'] = {id: 'filecoin', name: 'Filecoin', price_usd: '1.00'}
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

export const currencyNames = ['Bitcoin', 'Ethereum', 'Zcash', 'Filecoin']
