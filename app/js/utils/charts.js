export function getChartOptions(chartData, dimensions) {
  let legend = 'right'
  let chartAreaSettings = {
    left:   75,
    top:    50,
    right:  150,
    bottom: 50
  }
  if (dimensions.width < 768) {
    legend = 'bottom'
    chartAreaSettings = {
      left:   50,
      top:    50,
      right:  50,
      bottom: 50
    }
  }

  return {
    chart1: {
      legend: 'none',
      vAxis: {
        title: '# of transactions',
        logScale: false,
        minValue: 0,
        viewWindow: {
          max: 6000,
          min: 0
        }
      },
      chartArea: chartAreaSettings
    },
    chart2: {
      legend: 'none',
      vAxis: {
        title: '# of transactions',
        logScale: true,
        minValue: 0
      },
      chartArea: chartAreaSettings
    },
    chart3: {
      legend: legend,
      isStacked: 'true',
      colors: chartData.chart3.colors,
      vAxis: {
        title: '# of transactions',
        minValue: 0,
        ticks: [0, .25, .5, .75, 1]
      },
      chartArea: chartAreaSettings
    },
    chart4: {
      legend: legend,
      vAxis: {minValue: 0},
      colors: chartData.chart4.colors,
      chartArea: chartAreaSettings
    },
    chart5: {
      legend: legend,
      vAxis: {minValue: 0},
      colors: chartData.chart5.colors,
      chartArea: chartAreaSettings
    },
    chart6: {
      legend: legend,
      vAxis: {minValue: 0},
      colors: chartData.chart6.colors,
      chartArea: chartAreaSettings
    },
    chart7: {
      legend: legend,
      vAxis: {minValue: 0},
      colors: chartData.chart7.colors,
      chartArea: chartAreaSettings
    }
  }
}

export function getChartData(body) {
  let jsonResponse = JSON.parse(body)

  let chart1Columns = [
    {
      'id': 'x',
      'label': 'Date',
      'type': 'date'
    },
    {
      'id': 'A',
      'label':'"# of transactions',
      'type': 'number'
    }
  ]
  let chart1Rows = [],
      chart2Rows = [],
      chart3Rows = [],
      chart4Rows = [],
      chart5Rows = [],
      chart6Rows = [],
      chart7Rows = []

  /* Chart 1 */
  jsonResponse.total.rows.forEach((row) => {
    let dateString = row.c[0].v,
        dateParts = dateString.split(/[(),]+/),
        date = new Date(dateParts[1], dateParts[2], dateParts[3])
    let modifiedRow = [date, row.c[1].v]
    chart1Rows.push(modifiedRow)
  })

  /* Chart 2 */
  chart2Rows = chart1Rows

  /* Chart 3 */
  jsonResponse.proto.rows.forEach((row) => {
    let dateString = row.c[0].v,
        dateParts = dateString.split(/[(),]+/),
        date = new Date(dateParts[1], dateParts[2], dateParts[3])
    let modifiedRow = [date]
    row.c.slice(1).forEach((rowItem) => {
      let protocolTransactionCount = 0
      if (rowItem.hasOwnProperty('v')) {
        protocolTransactionCount = rowItem.v
      }
      modifiedRow.push(protocolTransactionCount)
    })
    chart3Rows.push(modifiedRow)
  })

  /* Chart 4 */
  jsonResponse.cumulative.rows.forEach((row) => {
    let modifiedRow = [row.c[0].v, row.c[1].v]
    chart4Rows.push(modifiedRow)
  })

  /* Chart 5 */
  jsonResponse.week.rows.forEach((row) => {
    let modifiedRow = [row.c[0].v, row.c[1].v]
    chart5Rows.push(modifiedRow)
  })

  let nonFinancialProtocols = [
    'Eternity Wall',
    'Monegraph',
    'Factom',
    'Blockstack',
    'Stampery Old',
    'Ascribe pool',
  ]
  let financialProtocols = [
    'Colu',
    'Omni Layer',
    'Coinspark',
    'Open Assets'
  ]
  let cumulativeColors = jsonResponse.cumulativeColors
  let nonFinancialColors = [
    cumulativeColors[6],
    cumulativeColors[7],
    cumulativeColors[8],
    cumulativeColors[9],
    cumulativeColors[10],
    cumulativeColors[11],
  ]
  let financialColors = [
    cumulativeColors[0],
    cumulativeColors[2],
    cumulativeColors[5],
    cumulativeColors[12],
  ]

  chart4Rows.forEach((row) => {
    let protocolName = row[0]
    if (financialProtocols.indexOf(protocolName) >= 0) {
      chart6Rows.push(row)
    }
    if (nonFinancialProtocols.indexOf(protocolName) >= 0) {
      chart7Rows.push(row)
    }
  })

  return {
    chart1: {
      rows: chart1Rows,
      columns: chart1Columns
    },
    chart2: {
      rows: chart2Rows,
      columns: chart1Columns
    },
    chart3: {
      rows: chart3Rows,
      columns: jsonResponse.proto.cols,
      colors: jsonResponse.protoColors
    },
    chart4: {
      rows: chart4Rows,
      columns: jsonResponse.cumulative.cols,
      colors: jsonResponse.cumulativeColors
    },
    chart5: {
      rows: chart5Rows,
      columns: jsonResponse.week.cols,
      colors: jsonResponse.weekColors
    },
    chart6: {
      rows: chart6Rows,
      columns: jsonResponse.cumulative.cols,
      colors: financialColors
    },
    chart7: {
      rows: chart7Rows,
      columns: jsonResponse.cumulative.cols,
      colors: nonFinancialColors
    },
  }
}