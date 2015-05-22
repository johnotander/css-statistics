var blessed = require('blessed');
var contrib = require('blessed-contrib');
var propTable = require('./properties-table');
var colorTable = require('./colors-table');
var bgColorTable = require('./bg-colors');

module.exports = function(data, options) {
  var screen = blessed.screen();
  var grid = new contrib.grid({ rows: 3, cols: 3, screen: screen });

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  var propData = data.aggregates.properties.map(function(property) {
    return [property, data.aggregates[property].total, data.aggregates[property].unique];
  });

  var fontColorData = data.declarations.unique.color.map(function(decl) {
    return [decl.value];
  });

  var bgColorData = data.declarations.unique.backgroundColor.map(function(decl) {
    return [decl.value];
  });

  var specificityData = data.selectors.map(function(selector) {
    return selector.specificity_10;
  });

  rulesetSizeData = data.rules.map(function(rule) {
    return rule.declarations.length;
  });

  var propertiesTable = grid.set(0, 0, 1, 1, contrib.table, {
    keys: true,
    fg: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: true,
    label: 'Properties - ' + propData.length,
    border: { type: 'line', fg: 'cyan' },
    columnSpacing: 10,
    columnWidth: [16, 6, 6]
  });

  propertiesTable.setData({
    headers: ['property', 'total', 'unique'],
    data: propData
  });

  var fontColorTable = grid.set(0, 1, 1, 1, contrib.table, {
    keys: true,
    fg: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: true,
    label: 'Font Colors - ' + fontColorData.length,
    border: { type: 'line', fg: 'cyan' },
    columnSpacing: 10,
    columnWidth: [16, 6, 6]
  });

  fontColorTable.setData({
    headers: [''],
    data: fontColorData
  });

  var bgColorTable = grid.set(0, 2, 1, 1, contrib.table, {
    keys: true,
    fg: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: true,
    label: 'Background Colors - ' + bgColorData.length,
    border: { type: 'line', fg: 'cyan' },
    columnSpacing: 10,
    columnWidth: [16, 6, 6]
  });

  bgColorTable.setData({
    headers: [''],
    data: bgColorData
  });

  var specificityLineChart = grid.set(1, 0, 1, 3, contrib.line, {
    style: {
      line: "yellow",
      text: "green",
      baseline: "blue"
    },
    xLabelPadding: 1,
    xPadding: 1,
    label: 'Specificity - ' + specificityData.length
  });

  specificityLineChart.setData([{ 
    x: ['start', 'end'],
    y: specificityData
  }]);

  var sparkLines = grid.set(2, 0, 1, 3, contrib.sparkline, {
    label: 'CSS Charts',
    tags: true,
    style: {
      fg: 'blue'
    }
  });

  sparkLines.setData(
    ['Specificity', 'Ruleset Size'],
    [specificityData, rulesetSizeData]
  );

  screen.render()
}
