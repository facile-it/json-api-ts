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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var t = __importStar(require("io-ts"));
var ArrayC_1 = require("./io/ArrayC");
var EntityC_1 = require("./io/EntityC");
var Resource_1 = require("./Resource");
var fromRecord = function (_a, relationships) {
    var _type = _a._type, _id = _a._id, attributes = __rest(_a, ["_type", "_id"]);
    return (__assign(__assign(__assign({}, (EntityC_1.EntityC.is({ _type: _type, _id: _id })
        ? {
            type: '' + _type,
            id: '' + _id
        }
        : null)), (Object.keys(attributes).length > 0
        ? { attributes: attributes }
        : null)), (Object.keys(relationships).length > 0
        ? {
            relationships: Object.keys(relationships)
                .reduce(function (carry, key) {
                var _a;
                var resource = relationships[key];
                return __assign(__assign({}, carry), (_a = {}, _a[key] = {
                    data: ArrayC_1.ArrayC().is(resource)
                        ? resource.map(Resource_1.Resource.lens.identifier.get)
                        : Resource_1.Resource.lens.identifier.get(resource)
                }, _a));
            }, {})
        }
        : null)));
};
var fromJson = function (u, relationships) {
    return t.UnknownRecord.is(u)
        ? fromRecord(u, relationships)
        : u;
};
exports.JsonApiData = {
    fromJson: fromJson
};
