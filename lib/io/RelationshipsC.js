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
var ResourceIdentifierC_1 = require("./ResourceIdentifierC");
exports.RelationshipsC = t.record(NonEmptyString_1.NonEmptyString, t.type({
    data: t.union([
        ResourceIdentifierC_1.ResourceIdentifierC,
        t.array(ResourceIdentifierC_1.ResourceIdentifierC)
    ])
}));
