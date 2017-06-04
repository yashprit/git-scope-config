#!/usr/bin/env node

'use strict';

var args = require('minimist')(process.argv.slice(2)),
  configGit = require('./');

var location = args.scope;
var key = args.key;
var value = args.value;
var action = args.action;

var configGit = configGit({
  scope: location
});

if (action) {
  if (value) {
    configGit[action](key, value, function(err, data) {
      console.log(data);
    });
  } else {
    configGit[action](key, function(err, data) {
      console.log(data);
    });
  }
} else {
  if (value) {
    configGit.set(key, value, function(err, data) {
      console.log(err, data);
    });
  } else {
    configGit.get(key, function(err, data) {
      console.log(err, data);
    });
  }
}