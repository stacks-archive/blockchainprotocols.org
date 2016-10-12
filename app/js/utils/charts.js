export function drawChart() {
  var jsonData = $.ajax({
    url: "https://storage.googleapis.com/opreturn-976.appspot.com/op_return_stats.json",
    type: "GET",
    crossDomain: true,
    dataType:"json",
    async: false
  }).responseText;
  var json = JSON.parse(jsonData);

  // Create our data table out of JSON data loaded from server.
  var data = new google.visualization.DataTable(json.total);
  var options = {
    vAxis: {
      logScale: false,
      minValue: 0,
      viewWindow: {
        max: 6000,
        min: 0
      }
    },
    chartArea:{
      left:  75,
      top:   50,
      right: 150,
      bottom:75
    }
  };
  var chart = new google.visualization.AreaChart(document.getElementById('total_div'));
  chart.draw(data, options);


  // Create our data table out of JSON data loaded from server.
  var data = new google.visualization.DataTable(json.total);
  var options = {
    vAxis: {
      logScale: true,
      minValue: 0
    },
    chartArea:{
      left:  75,
      top:   50,
      right: 150,
      bottom:75
    }
  };
  var chart = new google.visualization.AreaChart(document.getElementById('total_div_log'));
  chart.draw(data, options);


  // Create our data table out of JSON data loaded from server.
  var data2 = new google.visualization.DataTable(json.proto);
  var options2 = {
    isStacked: 'true',
    colors: json.protoColors,
    vAxis: {
      minValue: 0,
      ticks: [0, .25, .5, .75, 1]
    },
    chartArea:{
      left:  75,
      top:   50,
      right: 150,
      bottom:75
    }
  };
  var chart2 = new google.visualization.AreaChart(document.getElementById('proto_div'));
  chart2.draw(data2, options2);


  // Create our data table out of JSON data loaded from server.
  var data5 = new google.visualization.DataTable(json.cumulative);
  var options5 = {
    vAxis: {minValue: 0},
    colors: json.cumulativeColors,
    chartArea:{
      left:  75,
      top:   50,
      right: 150,
      bottom:75
    }
  };
  var chart5 = new google.visualization.PieChart(document.getElementById('cumulative_div'));
  chart5.draw(data5, options5);


  // Create our data table out of JSON data loaded from server.
  var data6 = new google.visualization.DataTable(json.week);
  var options6 = {
    vAxis: {minValue: 0},
    colors: json.weekColors,
    chartArea:{
      left:  75,
      top:   50,
      right: 150,
      bottom:75
    }
  };
  var chart6 = new google.visualization.PieChart(document.getElementById('week_div'));
  chart6.draw(data6, options6);
}