var contrib = require('blessed-contrib');

module.exports = function(data) {
  var fontColorTable = contrib.table({
    keys: true,
    fg: 'white',
    selectedFg: 'white',
    selectedBg: 'blue',
    interactive: true,
    label: 'Font Colors',
    width: '10%',
    height: '30%',
    border: { type: 'line', fg: 'cyan' },
    columnSpacing: 0,
    columnWidth: [20]
  });

  var fontColorData = data.declarations.unique.color.map(function(decl) {
    return [decl.value];
  });

  console.log(fontColorData);

  fontColorTable.setData({
    headers: [''],
    data: fontColorData
  });

  return fontColorTable;
}
