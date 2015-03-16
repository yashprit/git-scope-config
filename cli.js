#!/usr/bin/env node

'use strict';
var meow = require('meow');
var configGit = require('./lib');

var cli = meow({
  help: [
    'Usage',
    '  config-git <input>',
    '',
    'Example',
    '  config-git Unicorn'
  ].join('\n')
});

configGit (cli.input[0]);
