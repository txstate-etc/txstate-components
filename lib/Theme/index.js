"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Theme = require("./Theme");

Object.keys(_Theme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Theme[key];
    }
  });
});