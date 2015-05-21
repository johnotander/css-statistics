var blessed = require('blessed');
var contrib = require('blessed-contrib');
var propTable = require('./properties-table');
var colorTable = require('./colors-table');
var bgColorTable = require('./bg-colors');

module.exports = function(data, options) {
  var screen = blessed.screen();

  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });

  screen.append(propTable(data));
  screen.append(colorTable(data));
  screen.append(bgColorTable(data));
  screen.render()
}
