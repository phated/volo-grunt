'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var gruntOptions = require('grunt').cli.optlist;

var flags = {};
_.forEach(gruntOptions, function(optionObj, longname){
  if(optionObj.short){
    flags[optionObj.short] = longname;
  }
  flags[longname] = longname;
});

module.exports = {
  summary: 'Volo command for running grunt tasks using locally installed grunt',

  doc: fs.readFileSync(path.join(__dirname, 'doc.md'), 'utf8'),

  flags: flags,

  run: function(d, v, namedArgs){
    var q = v.require('q');

    // Remove volo from the args being passed to grunt
    var flagNames = _.omit(namedArgs, 'volo');

    // Map all the flags with -- in front
    var flags = _.map(flagNames, function(flags, flagName){
      return '--' + flagName;
    });

    // Get all the other args passed at the command line
    var args = [];
    if(arguments.length > 3){
      args = [].slice.call(arguments, 3);
    }

    // Prefix with n. so spawn knows to grab it from local
    v.spawn('n.grunt', flags.concat(args), {
      useConsole: true
    })
    .then(function () {
        d.resolve();
    })
    .fail(d.reject);
  }
};