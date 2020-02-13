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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Either_1 = require("fp-ts/lib/Either");
var t = __importStar(require("io-ts"));
var NumberFromString_1 = require("io-ts-types/lib/NumberFromString");
var lodash_1 = require("lodash");
var JsonApiDataC_1 = require("./io/JsonApiDataC");
var ResourceIdentifierC_1 = require("./io/ResourceIdentifierC");
var ResourceIdentifier_1 = require("./ResourceIdentifier");
var fromRelationships = function (data, resources) {
    return Object.keys(data)
        .reduce(function (relationships, key) {
        var _a, _b, _c;
        var relationship = data[key];
        var strings = key.split('.');
        return lodash_1.merge(relationships, strings.length > 1
            ? (_a = {},
                _a[strings[0]] = fromRelationships((_b = {}, _b[strings.slice(1).join('.')] = relationship, _b), resources),
                _a) : (_c = {},
            _c[key] = (t.array(ResourceIdentifierC_1.ResourceIdentifierC).is(relationship.data)
                ? relationship.data
                    .map(function (identifier) { return fromJsonApiData(resources[ResourceIdentifier_1.ResourceIdentifier.iso.string.get(identifier)], resources); })
                : fromJsonApiData(resources[ResourceIdentifier_1.ResourceIdentifier.iso.string.get(relationship.data)], resources)),
            _c));
    }, {});
};
var fromJsonApiData = function (data, resources) {
    return lodash_1.merge(__assign(__assign({}, (ResourceIdentifierC_1.ResourceIdentifierC.is(data)
        ? {
            _type: data.type,
            _id: Either_1.getOrElse(function () { return data.id; })(NumberFromString_1.NumberFromString.decode(data.id))
        }
        : null)), data.attributes), fromRelationships(data.relationships || {}, resources));
};
var fromJson = function (u, resources) {
    return JsonApiDataC_1.JsonApiDataC.is(u)
        ? fromJsonApiData(u, resources)
        : u;
};
exports.RawData = {
    fromJson: fromJson
};
