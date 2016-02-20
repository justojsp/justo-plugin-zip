//imports
import {simple} from "justo";

//api
module.exports = simple({ns: "org.justojs.plugin", name: "zip"}, require("./lib/op").default);
