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
var JsonApiDataC_1 = require("./JsonApiDataC");
var ResourceC_1 = require("./ResourceC");
exports.DocumentC = t.intersection([
    t.type({
        data: t.union([
            JsonApiDataC_1.JsonApiDataC,
            t.array(JsonApiDataC_1.JsonApiDataC),
            t.null
        ])
    }),
    t.partial({
        included: t.array(ResourceC_1.ResourceC)
    })
]);
