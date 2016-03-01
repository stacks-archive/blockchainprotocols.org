import d3 from 'd3';

const chartWidth = 800,
      chartHeight = 400,
      margin = {top: 20, right: 20, bottom: 30, left: 50}

function parseDate(date) {
  return d3.time.format("%d-%b-%y").parse(String(date))
}

export function drawDailyRegistrationsChart(selector, chartData) {
  let data = chartData.items;

  let width = chartWidth - margin.left - margin.right,
      height = chartHeight - margin.top - margin.bottom;

  let x = d3.time.scale()
      .range([0, width]);

  let y = d3.scale.linear()
      .range([height, 0]);

  let xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  let yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  let area = d3.svg.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.registrations); });

  let svg = d3.select(selector).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.registrations = +d.registrations;
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.registrations; })]);

  svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Daily Registrations");
}

export function drawTotalRegistrationsChart(selector, chartData) {
  let data = chartData.items;

  let width = chartWidth - margin.left - margin.right,
      height = chartHeight - margin.top - margin.bottom;

  let totalRegistrations = 0;
  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.registrations = +d.registrations;
    totalRegistrations = totalRegistrations + d.registrations;
    d.totalRegistrations = totalRegistrations;
  });

  let x = d3.time.scale()
      .range([0, width]);

  let y = d3.scale.linear()
      .range([height, 0]);

  let xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  let yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  let area = d3.svg.area()
      .x(function(d) { return x(d.date); })
      .y0(height)
      .y1(function(d) { return y(d.totalRegistrations); });

  let svg = d3.select(selector).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.totalRegistrations; })]);

  svg.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Total Registrations");
}