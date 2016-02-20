//imports
const path = require("path");
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const op = require("../../../dist/es5/nodejs/justo-plugin-zip/lib/op").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";
  var DST_DIR, DST;

  init("*", function() {
    DST_DIR = Dir.createTmpDir();
    DST = DST_DIR.path;
  });

  fin("*", function() {
    DST_DIR.remove();
  });

  test("op(config)", function(done) {
    op([{
      src: [path.join(DATA, "a.txt"), path.join(DATA, "b.txt"), path.join(DATA, "empty/")],
      dst: path.join(DST, "output.zip")
    }], function() {
      file(DST, "output.zip").must.exist();
      done();
    }).must.be.eq(3);
  });

  test("op(config) - with base", function(done) {
    op([{
      base: DATA,
      src: ["a.txt", "b.txt", "empty/"],
      dst: path.join(DST, "output.zip")
    }], function() {
      file(DST, "output.zip").must.exist();
      done();
    }).must.be.eq(3);

  });

  test("op(config) - with base, but without src", function(done) {
    op([{
      base: DATA,
      dst: path.join(DST, "output.zip")
    }], function() {
      file(DST, "output.zip").must.exist();
      done();
    }).must.be.eq(8);

  });

  test("op(config) - with ignore", function(done) {
    op([{
      base: DATA,
      ignore: ["empty", "one/c.txt", "one/onetwo/"],
      dst: path.join(DST, "output.zip")
    }], function() {
      file(DST, "output.zip").must.exist();
      done();
    }).must.be.eq(5);
  });
})();
