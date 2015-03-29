'use strict';

var exec = require("child_process").exec;

module.exports = ConfigGit;


var COMMAND_PREFIX = "git config";

var configuration = {
  action: function(action) {
    return "-- " + action;
  },
  scope: function(loc) {
    return "--" + loc;
  }
}

var execute = function(command, cb) {
  exec(command, cb);
}

function ConfigGit(opts) {
  if (!(this instanceof ConfigGit))
    return new ConfigGit(opts);

  opts = opts || {};

  this.commands = [COMMAND_PREFIX];

  for (var key in opts) {
    if (opts[key]) {
      this[key] = opts[key];
      var commandParts = configuration[key](opts[key]);
      this.commands.push(commandParts);
    }
  }
}

/**
 * Static Object acts like constant
 */
ConfigGit.Scope = {
  FILE: "file",
  GLOBAL: "global",
  LOCAL: "local",
  SYSTEM: "system"
}

ConfigGit.Action = {
  GET: "--get",
  GET_ALL: "--get-all",
  UNSET: "--unset",
  UNSET_ALL: "--unset-all"
}

/**
 * Read file from given path
 *
 * @api @public
 *
 * @param  {String} path to git config file
 * @param {Function} cb callback to execute after reading file
 *
 */
ConfigGit.prototype.execFile = function(path, cb) {
  if (this.scope === ConfigGit.Scope.FILE) {

  } else {
    cb(new Error("mismatch options"))
  }
}

/**
 * Sync file at path
 *
 * @api @public
 *
 * @param  {String} path path of file
 *
 * @return {void}
 */
ConfigGit.prototype.sync = function(path) {

}

/**
 * Get value of given key
 *
 * @api @public
 *
 * @param {String} key config key
 * @param {Function} cb callback to execute after running command
 *
 */
ConfigGit.prototype.get = function get(key, cb) {
  var commandFrag = [];
  if (this.scope === ConfigGit.Scope.GLOBAL || this.scope === ConfigGit.Scope.SYSTEM ||
    this.scope === ConfigGit.Scope.LOCAL) {

    if (typeof key === "function") {
      cb = key
      key = ConfigGit.Action.GET_ALL;
    }


    commandFrag.push(key);
    var shellCommand = this.commands.concat(commandFrag).join(" ");
    console.log(shellCommand);
    execute(shellCommand, function(err, data) {
      console.log(err, data);
      if (err) {
        cb(err);
      }

      if (data) {
        cb(null, data);
      }
    });
  } else {
    cb(new Error("mismatch scope and name"))
  }
}

/**
 * Set value for given key
 *
 * @api @public
 *
 * @param {String}   key   name
 * @param {String}   value value that need to be set
 * @param {Function} cb    execute after running command
 *
 */
ConfigGit.prototype.set = function set(key, value, cb) {
  var commandFrag = [];

  if (!(typeof key === "string" && typeof value === "string" && typeof cb === "function")) {
    cb(new Error("Wrong argument provided"));
  }

  if (this.scope === ConfigGit.Scope.GLOBAL || this.scope === ConfigGit.Scope.SYSTEM ||
    this.scope === ConfigGit.Scope.LOCAL) {

    commandFrag.push(key);
    commandFrag.push(value);
    var shellCommand = this.commands.concat(commandFrag).join(" ");
    execute(shellCommand, function(err, data) {
      if (err) {
        cb(err);
      }

      if (data === "") {
        cb(null, true);
      }

    });
  } else {
    cb(new Error("mismatch scope and name"))
  }
}

ConfigGit.prototype.unset = function(key, cb) {

  var commandFrag = [];

  if (typeof key === "function") {
    cb = key;
    key = null;
  }

  if (this.scope === ConfigGit.Scope.GLOBAL || this.scope === ConfigGit.Scope.SYSTEM ||
    this.scope === ConfigGit.Scope.LOCAL) {

    if (key) {
      commandFrag.push(ConfigGit.Action.UNSET);
      commandFrag.push(key);
    } else {
      commandFrag.push(ConfigGit.Action.UNSET_ALL);
    }

    var shellCommand = this.commands.concat(commandFrag).join(" ");
    execute(shellCommand, function(err, data) {
      if (err) {
        cb(err);
      }

      if (data === "") {
        cb(null, true);
      }

    });
  } else {
    cb(new Error("mismatch scope and name"))
  }
}
