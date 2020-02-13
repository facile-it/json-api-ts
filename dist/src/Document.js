"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var CompoundDocument_1 = require("./CompoundDocument");
var RelationshipsCache_1 = require("./RelationshipsCache");
var fromCompoundDocument = function (w) {
    var _a = w(), data = _a[0], relationships = _a[1];
    var cache = RelationshipsCache_1.RelationshipsCache.fromRelationships(relationships);
    var included = Object.values(RelationshipsCache_1.RelationshipsCache.lens.global.get(cache));
    return __assign({ data: data }, (included.length > 0 ? { included: included } : null));
};
var fromJson = function (u) { return fromCompoundDocument(CompoundDocument_1.CompoundDocument.fromJson(u, true)); };
exports.Document = {
    fromCompoundDocument: fromCompoundDocument,
    fromJson: fromJson
};
