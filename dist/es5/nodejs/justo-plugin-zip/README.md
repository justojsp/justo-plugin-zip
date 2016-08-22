[![NPM version](http://img.shields.io/npm/v/justo-plugin-zip.svg)](https://www.npmjs.org/package/justo-plugin-zip)
[![Build Status](https://travis-ci.org/justojsp/justo-plugin-zip.svg)](https://travis-ci.org/justojsp/justo-plugin-zip)
[![Dependency Status](https://david-dm.org/justojsp/justo-plugin-zip.svg)](https://david-dm.org/justojsp/justo-plugin-zip)
[![devDependency Status](https://david-dm.org/justojsp/justo-plugin-zip/dev-status.svg)](https://david-dm.org/justojsp/justo-plugin-zip#info=devDependencies)

Task to zip.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-plugin-zip
```

## Use

```
const zip = require("justo-plugin-zip");
```

To zip, the task must be called as follows:

```
zip(opts, config : object)
```

Configuration object:

- `base` (string). The root path. This is not included in the output.
- `src` (string or string[]). Files to zip. The paths are relative to `base` if indicated.
- `ignore` (string or string[]). Entries to exclude.
- `files` (object). Files to zip:
  - `base` (string).
  - `src` (string or string[]).
  - `ignore` (string or string[]).
- `dst` (string). Output file.

Example:

```
const zip = require("justo-plugin-zip");

//app/index.html and app/about.html -> build/app.zip
zip("Zip project", {
  base: "app/",
  src: ["index.html", "about.html"],
  dst: "build/app.zip"
});

//app/* -> build/app.zip
zip("Zip project", {
  base: "app/",
  dst: "build/app.zip"
});
```
