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
var AttributesC_1 = require("./AttributesC");
var RelationshipsC_1 = require("./RelationshipsC");
exports.JsonApiDataC = t.partial({
    type: NonEmptyString_1.NonEmptyString,
    id: NonEmptyString_1.NonEmptyString,
    attributes: AttributesC_1.AttributesC,
    relationships: RelationshipsC_1.RelationshipsC
});
