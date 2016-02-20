"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 








op;var _path = require("path");var _path2 = _interopRequireDefault(_path);var _yazl = require("yazl");var _yazl2 = _interopRequireDefault(_yazl);var _fs = require("fs");var _fs2 = _interopRequireDefault(_fs);var _justoFs = require("justo-fs");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params, done) {
  var files = [];


  if (params.length >= 1) {
    params = Object.assign({}, params[0]);}


  if (!params.files) params.files = [];
  if (params.base || params.src) params.files.push({ base: params.base, src: params.src, ignore: params.ignore });var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {


    for (var _iterator = params.files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var item = _step.value;
      var base = item.base;
      var src = item.src;
      var ignore = item.ignore;

      if (!src) src = ["."];
      if (typeof src == "string") src = [src];
      if (typeof ignore == "string") ignore = [ignore];var _iteratorNormalCompletion4 = true;var _didIteratorError4 = false;var _iteratorError4 = undefined;try {

        for (var _iterator4 = src[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {var _item = _step4.value;
          var file = { 
            path: base ? _path2.default.join(base, _item) : _item, 
            as: _path2.default.join(_item) };


          _item = (0, _justoFs.entry)(file.path);

          if (_item instanceof _justoFs.File) addFileToFiles(file, ignore);else 
          if (_item instanceof _justoFs.Dir) addDirToFiles(file, base, ignore);}} catch (err) {_didIteratorError4 = true;_iteratorError4 = err;} finally {try {if (!_iteratorNormalCompletion4 && _iterator4.return) {_iterator4.return();}} finally {if (_didIteratorError4) {throw _iteratorError4;}}}}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}




  return zip(files, params.dst, done);


  function addItemToFiles(item, ignore) {
    if (ignore) {var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
        for (var _iterator2 = ignore[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var i = _step2.value;
          if (item.as.startsWith(_path2.default.join(i))) return;}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}}



    files.push(item);}



  function addFileToFiles(file, ignore) {
    addItemToFiles(Object.assign({ type: "file" }, file), ignore);}



  function addDirToFiles(dir, base, ignore) {
    var entries;

    entries = new _justoFs.Dir(dir.path).entries;

    if (entries.length === 0) {
      addItemToFiles(Object.assign(dir, { type: "dir", path: dir.as }), ignore);} else 
    {var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {
        for (var _iterator3 = entries[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var _entry = _step3.value;
          var file = { 
            path: _entry.path, 
            as: base ? _entry.path.replace(_path2.default.normalize(base), "").substr(1) : _entry.path };


          if (_entry instanceof _justoFs.File) addFileToFiles(file, ignore);else 
          if (_entry instanceof _justoFs.Dir) addDirToFiles(file, base, ignore);}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}}}}








function zip(src, dst, done) {
  var output;


  output = new _yazl2.default.ZipFile();var _iteratorNormalCompletion5 = true;var _didIteratorError5 = false;var _iteratorError5 = undefined;try {

    for (var _iterator5 = src[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {var _entry2 = _step5.value;
      if (_entry2.type == "dir") output.addEmptyDirectory(_entry2.path, _entry2.as);else 
      output.addFile(_entry2.path, _entry2.as);}} catch (err) {_didIteratorError5 = true;_iteratorError5 = err;} finally {try {if (!_iteratorNormalCompletion5 && _iterator5.return) {_iterator5.return();}} finally {if (_didIteratorError5) {throw _iteratorError5;}}}



  output.outputStream.pipe(_fs2.default.createWriteStream(dst)).on("close", function () {
    done();});


  output.end();


  return src.length;}