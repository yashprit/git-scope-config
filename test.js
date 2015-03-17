'use strict';

var ConfigGit = require('./');

describe("config git", function() {

  var configGit;

  beforeEach(function() {
    configGit = new ConfigGit("global");
  });

  it("should return set value for key", function(done) {
    configGit.process("github.token", "yash", done)
  });

  it("should return value of key", function(done) {
    configGit.process("github.token", done)
  });

})
