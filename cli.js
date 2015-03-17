#!/usr/bin/env node

'use strict';

var
  args = require('minimist')(process.argv.slice(2)),
  configGit = require('./');

var location = args.l;
var key = args.k;

configGit({
  location: location
}).get(key, function(err, data) {
  console.log(data);
});
