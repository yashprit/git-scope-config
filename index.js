'use strict';

var exec = require("child_process").exec;

/**
 * Setting up command
 * @param {[type]} location [description]
 * @param {[type]} action   [description]
 */
function ConfigGit(location, action) {
  this._prefix = ["git config"];
  this._location = "--" + location;
  this._action = action;
}

ConfigGit.prototype.exec = function(key, value, cb) {

}

ConfigGit.prototype.get = function() {

}

var configGit = function() {
  exec("git config --global github.token", function(error, stdout, stderr) {
    if (error) {
      cb(error);
      return;
    }

    if (stdout) {
      cb(null, stdout);
    }

    if (!stdout) {
      cb(new Error("token is not set yet, run git-config --token token"));
    }

    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  })
}
