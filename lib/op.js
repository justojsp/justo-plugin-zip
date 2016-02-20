//imports
import path from "path";
import yazl from "yazl";
import fs from "fs";
import {File, Dir, entry} from "justo-fs";

/**
 * Task operation.
 */
export default function op(params, done) {
  var files = [];

  //(1) arguments
  if (params.length >= 1) {
    params = Object.assign({}, params[0]);
  }

  if (!params.files) params.files = [];
  if (params.base || params.src) params.files.push({base: params.base, src: params.src, ignore: params.ignore});

  //(2) get files to zip
  for (let item of params.files) {
    let base = item.base;
    let src = item.src;
    let ignore = item.ignore;

    if (!src) src = ["."];
    if (typeof(src) == "string") src = [src];
    if (typeof(ignore) == "string") ignore = [ignore];

    for (let item of src) {
      let file = {
        path: (base ? path.join(base, item) : item),
        as: path.join(item)
      };

      item = entry(file.path);

      if (item instanceof File) addFileToFiles(file, ignore);
      else if (item instanceof Dir) addDirToFiles(file, base, ignore);
    }
  }

  //(3) zip
  return zip(files, params.dst, done);

  //helper
  function addItemToFiles(item, ignore) {
    if (ignore) {
      for (let i of ignore) {
        if (item.as.startsWith(path.join(i))) return;
      }
    }

    files.push(item);
  }

  //file is {path, as}
  function addFileToFiles(file, ignore) {
    addItemToFiles(Object.assign({type: "file"}, file), ignore);
  }

  //dir is {path, as}
  function addDirToFiles(dir, base, ignore) {
    var entries;

    entries = new Dir(dir.path).entries;

    if (entries.length === 0) { //empty dir is special case
      addItemToFiles(Object.assign(dir, {type: "dir", path: dir.as}), ignore);
    } else {
      for (let entry of entries) {
        var file = {
          path: entry.path,
          as: (base ? entry.path.replace(path.normalize(base), "").substr(1) : entry.path)
        };

        if (entry instanceof File) addFileToFiles(file, ignore);
        else if (entry instanceof Dir) addDirToFiles(file, base, ignore);
      }
    }
  }
}

/**
 * Zip.
 */
function zip(src, dst, done) {
  var output;

  //(1) zip
  output = new yazl.ZipFile();

  for (let entry of src) {
    if (entry.type == "dir") output.addEmptyDirectory(entry.path, entry.as);
    else output.addFile(entry.path, entry.as);
  }

  //(2) save
  output.outputStream.pipe(fs.createWriteStream(dst)).on("close", function() {
    done();
  });

  output.end();

  //(3) return
  return src.length;
}
