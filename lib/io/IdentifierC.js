"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var t = __importStar(require("io-ts"));
var NonEmptyString_1 = require("io-ts-types/lib/NonEmptyString");
exports.IdentifierC = t.union([
    t.number,
    NonEmptyString_1.NonEmptyString
]);
