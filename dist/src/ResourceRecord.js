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
var ResourceIdentifier_1 = require("./ResourceIdentifier");
exports.ResourceRecord = {
    fromResources: function (resources) {
        return resources.reduce(function (record, resource) {
            var _a;
            return (__assign(__assign({}, record), (_a = {}, _a[ResourceIdentifier_1.ResourceIdentifier.iso.string.get(resource)] = resource, _a)));
        }, {});
    }
};
