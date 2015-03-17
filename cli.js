#!/usr/bin/env node

'use strict';

var
  args = require('minimist')(process.argv.slice(2)),
  configGit = require('./');

var action = args.a;
var location = args.l;
var key = args.k;
var value = args.v;

console.log(args);

configGit({
  location: location,
  action: action
}).get(key, function(err, data) {
  console.log(data);
})

/*var configGit = (location, action);
configGit.process(key, value, function(err, std) {
  console.log(std)
})*/
