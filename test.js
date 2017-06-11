'use strict';

var
  test = require('tape'),
  configGit = require('./');

test("can set key and value", function(t) {
  configGit({
    scope: "global"
  }).set("github.token", "yashp", function(err, data) {
    t.ok(!err, 'Set should not have any error');
    t.ok(data, 'Set should give no output');
    t.end();
  });
});

test("can get key", function(t) {
  configGit({
    scope: "global"
  }).get("github.token", function(err, data) {
    t.ok(!err, 'Get should not have any error');
    t.equal(data, "yashp", "Get should give you output");
    t.end();
  });
});

test("can remove key", function(t) {
  configGit({
    scope: "global"
  }).unset("github.token", function(err, data) {
    t.ok(!err, 'Unset should not give any error');
    t.ok(data, 'Unset should not have any output');
    t.end();
  });
});
