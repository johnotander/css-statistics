#!/usr/bin/env node

var program = require('commander');
var cssstats = require('..');
var dashboard = require('../cli/dashboard');
var fs = require('fs');

var version = '0.0.1'

console.log('CSS Statistics CLI (' + version + ')');

program
  .version(version);

program
  .command('file [file]')
  .description('read a local css file')
  .action(function(file) {
    if (!file) {
      console.log('Please specify a CSS file');
      return;
    }

    try {
      var css = fs.readFileSync(file, 'utf8');
      var stats = cssstats(css);
      console.log(JSON.stringify(stats, null, 2));
    } catch (e) {
      console.log('CSS Statistics encountered an error reading ' + file);
      console.log(e);
    }
  });

program
  .command('report [file]')
  .description('a CLI report of the stats in ASCII/ANSI')
  .action(function(file) {
    if (!file) {
      console.log('Please specify a CSS file');
      return;
    }

    try {
      var css = fs.readFileSync(file, 'utf8');
      var stats = cssstats(css);
    } catch (e) {
      console.log('CSS Statistics encountered an error reading ' + file);
      console.log(e);
    }
    dashboard(stats);
  });

program.parse(process.argv);
