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
exports.RelationshipsRecord = {
    nest: function (relationships, key) {
        return Object.keys(relationships)
            .reduce(function (record, k) {
            var _a;
            return (__assign(__assign({}, record), (_a = {}, _a[key + "." + k] = relationships[k], _a)));
        }, {});
    }
};
