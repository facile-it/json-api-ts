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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var monocle_ts_1 = require("monocle-ts");
var ArrayC_1 = require("./io/ArrayC");
var RelationshipsCacheC_1 = require("./io/RelationshipsCacheC");
var RelationshipsRecord_1 = require("./RelationshipsRecord");
var ResourceIdentifier_1 = require("./ResourceIdentifier");
var fromRelationships = function (x) {
    return RelationshipsCacheC_1.RelationshipsCacheC.is(x)
        ? x
        : [0, {}, x];
};
var lenses = {
    counter: new monocle_ts_1.Lens(function (s) { return s[0]; }, function (a) { return function (s) { return ([a, s[1], s[2]]); }; }),
    global: new monocle_ts_1.Lens(function (s) { return s[1]; }, function (a) { return function (s) { return ([s[0], a, s[2]]); }; }),
    local: new monocle_ts_1.Lens(function (s) { return s[2]; }, function (a) { return function (s) { return ([s[0], s[1], a]); }; })
};
var monoid = {
    empty: [0, {}, {}],
    concat: function (x, y) {
        var _a = [x, y].map(fromRelationships), xs = _a[0], ys = _a[1];
        var locals = Object.values(lenses.local.get(ys))
            .reduce(function (array, item) { return (__spreadArrays(array, (ArrayC_1.ArrayC().is(item) ? item : [item]))); }, []);
        return [
            lenses.counter.get(xs) + (lenses.counter.get(ys) || locals.length),
            __assign(__assign(__assign({}, lenses.global.get(xs)), lenses.global.get(ys)), locals.reduce(function (record, identifier) {
                var _a;
                return (__assign(__assign({}, record), (_a = {}, _a[ResourceIdentifier_1.ResourceIdentifier.iso.string.get(identifier)] = identifier, _a)));
            }, {})),
            __assign(__assign({}, lenses.local.get(xs)), lenses.local.get(ys))
        ];
    }
};
exports.RelationshipsCache = {
    fromRelationships: fromRelationships,
    emptyLocal: function (cache) {
        return lenses.local.set({})(fromRelationships(cache));
    },
    nestLocal: function (cache, key) {
        return (function (cache) {
            return lenses.local.set(RelationshipsRecord_1.RelationshipsRecord.nest(lenses.local.get(cache), key))(cache);
        })(fromRelationships(cache));
    },
    lens: lenses,
    monoid: {
        self: monoid
    }
};
