"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("fp-ts/lib/function");
var t = __importStar(require("io-ts"));
var is = function () { return function (u) { return u instanceof Array; }; };
exports.ArrayC = function () { return new t.Type('Array', is(), function (u, c) { return is()(u)
    ? t.success(u)
    : t.failure(u, c); }, function_1.identity); };
