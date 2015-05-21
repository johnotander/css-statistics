var contrib = require('blessed-contrib');

module.exports = function(data) {
  var bgColorTable = contrib.table({
    keys: true,
    fg: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: true,
    label: 'BgColors',
    width: '10%',
    height: '30%',
    border: { type: 'line', fg: 'cyan' },
    columnSpacing: 0,
    columnWidth: [20]
  });

  var bgColorData = data.declarations.unique.backgroundColor.map(function(decl) {
    return [decl.value];
  });

  bgColorTable.setData({
    headers: [''],
    data: bgColorData
  });

  return bgColorTable;
}
