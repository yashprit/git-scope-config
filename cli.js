#!/usr/bin/env node

'use strict';

var args = require('minimist')(process.argv.slice(2)),
  configGit = require('./');

var location = args.scope;
var key = args.key;
var value = args.value;

if (value) {
  configGit({
    scope: location
  }).set(key, value, function(err, data) {
    console.log(data);
  });
} else {
  configGit({
    scope: location
  }).get(key, function(err, data) {
    console.log(data);
  });
}
