var contrib = require('blessed-contrib');

module.exports = function(data) {
  var propTable = contrib.table({
    keys: true,
    fg: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: true,
    label: 'Properties',
    width: '40%',
    height: '30%',
    border: { type: 'line', fg: 'cyan' },
    columnSpacing: 10,
    columnWidth: [16, 6, 6]
  });

  propTable.focus();

  var propData = data.aggregates.properties.map(function(property) {
    return [property, data.aggregates[property].total, data.aggregates[property].unique];
  });

  propTable.setData({
    headers: ['property', 'total', 'unique'],
    data: propData
  });

  return propTable;
}
