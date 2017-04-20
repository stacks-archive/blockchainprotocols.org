function getBitcoinSupply(years) {
  const endSupply = 21 * Math.pow(10, 6)
  let supply = 0
  let halvings = Math.floor(years / 4)

  // Handle the extra years
  const extraYears = years % 4
  const amountPerExtraYear = endSupply / (Math.pow(2, halvings+1) * 4)
  supply += extraYears * amountPerExtraYear

  // Handle the halvings
  for (let i = 0; i < halvings; i++) {
    let amountPerHalving = endSupply / (Math.pow(2, halvings-i))
    supply += amountPerHalving
  }

  return supply
}

function getEthereumSupply(years) {
  let supply = 72 * Math.pow(10, 6)

  if (years > 0) {
    supply = supply + years * 12 * Math.pow(10, 6)
  }

  return supply
}

function getZcashSupply(years) {
  return getBitcoinSupply(years)
}

export function getSupply(currencyName, years) {
  switch (currencyName.toLowerCase()) {
    case 'bitcoin':
      return getBitcoinSupply(years)
    case 'ethereum':
      return getEthereumSupply(years)
    case 'zcash':
      return getBitcoinSupply(years)
    default:
      return 0
  }
}

export function fetchPrices() {
  return new Promise((resolve, reject) => {
    try {
      const url = 'https://blockstack-site-api.herokuapp.com/v1/prices'
      fetch(url)
      .then((response) => response.text())
      .then((responseText) => JSON.parse(responseText))
      .then((priceList) => {
        let priceObject = {}

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

export function getPrice(currencyName) {
  switch (currencyName.toLowerCase()) {
    case 'bitcoin':
      return 1236.60
    case 'ethereum':
      return 49.50
    case 'zcash':
      return 66.65
    default:
      return 0
  }
}

export const currencyNames = ['Bitcoin', 'Ethereum', 'Zcash']
