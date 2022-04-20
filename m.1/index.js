// common js
// type: "common" w package.json
const { info, error } = require("./module");
info("jestem informacją");

// ecma
// npm init -y
// "type": "module" w package.json
import { info, error } from "./module-ecma.js";
info("jestem logem");
error("jestem błędem");

// npm install lodash --save
// npm install gulp --save-dev
const lodash = require("lodash");
const { get, find } = require("lodash");

// fs
console.log(__filename); // directory + filename
console.log(__dirname);

// Buffer
// Promise.all
