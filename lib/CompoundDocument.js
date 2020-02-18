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
var Array_1 = require("fp-ts/lib/Array");
var function_1 = require("fp-ts/lib/function");
var pipeable_1 = require("fp-ts/lib/pipeable");
var Writer_1 = require("fp-ts/lib/Writer");
var t = __importStar(require("io-ts"));
var ArrayC_1 = require("./io/ArrayC");
var EntityC_1 = require("./io/EntityC");
var NonEmptyArrayC_1 = require("./io/NonEmptyArrayC");
var ResourceIdentifierC_1 = require("./io/ResourceIdentifierC");
var JsonApiData_1 = require("./JsonApiData");
var RelationshipsCache_1 = require("./RelationshipsCache");
var m = Writer_1.getMonad(RelationshipsCache_1.RelationshipsCache.monoid.self);
var M = pipeable_1.pipeable(m);
var fromUnknown = function (u) {
    return m.of(u);
};
var fromArray = function (u) {
    return Array_1.array.traverse(m)(u, fromJson);
};
var fromRecord = function (u) {
    return Object.keys(u)
        .reduce(function (writer, key) {
        return pipeable_1.pipe(writer, M.chain(
        // The accumulator (bag of relationships) has to be modified depending on returned data (the actual JSON).
        function (attributes) { return Writer_1.pass(pipeable_1.pipe(fromJson(u[key]), M.map(function (data) {
            var _a, _b;
            return !t.UnknownRecord.is(data) && !ArrayC_1.ArrayC().is(data)
                /**
                 * No transformation needed with a scalar, just map the value in the result (as an [attribute][1]).
                 *
                 * [1]: https://jsonapi.org/format/#document-resource-object-attributes
                 */
                ? [
                    __assign(__assign({}, attributes), (_a = {}, _a[key] = data, _a)),
                    function_1.identity
                ]
                // Beware: *non-empty* array.
                : ResourceIdentifierC_1.ResourceIdentifierC.is(data) || NonEmptyArrayC_1.NonEmptyArrayC(ResourceIdentifierC_1.ResourceIdentifierC).is(data)
                    /**
                     * Child resources must be added to the bag of [relationships][1] (the accumulator). Leave the
                     * attributes alone.
                     *
                     * [1]: https://jsonapi.org/format/#document-resource-object-relationships
                     */
                    ? [
                        attributes,
                        function (relationships) {
                            var _a;
                            return RelationshipsCache_1.RelationshipsCache.monoid.self
                                .concat(relationships, (_a = {}, _a[key] = data, _a));
                        }
                    ]
                    /**
                     * A nested non-resource object must be added to the attributes just like a scalar, while current
                     * relationships have to mirror the nesting.
                     */
                    : [
                        __assign(__assign({}, attributes), (_b = {}, _b[key] = data, _b)),
                        function (relationships) { return RelationshipsCache_1.RelationshipsCache.nestLocal(relationships, key); }
                    ];
        }))); }));
    }, fromUnknown({}));
};
var fromJson = function (u, primaryData) {
    if (primaryData === void 0) { primaryData = false; }
    return !t.UnknownRecord.is(u) && !ArrayC_1.ArrayC().is(u)
        ? fromUnknown(u)
        : Writer_1.pass(// pass() allows both Writer elements to be modified at once.
        pipeable_1.pipe(Writer_1.listen(// Expose Writer accumulator.
        (ArrayC_1.ArrayC().is(u)
            ? fromArray(u)
            : fromRecord(u))), M.map(function (_a) {
            var data = _a[0], relationships = _a[1];
            var cache = RelationshipsCache_1.RelationshipsCache.fromRelationships(relationships);
            var locals = RelationshipsCache_1.RelationshipsCache.lens.local.get(cache);
            /**
             * If resulting data is an entity - or if we're parsing [primary data][1] -, convert it to JSON:API format and
             * flush local relationships.
             * Otherwise, just forward everything to the upper level.
             *
             * [1]: https://jsonapi.org/format/#document-top-level
             */
            return primaryData &&
                !NonEmptyArrayC_1.NonEmptyArrayC(ResourceIdentifierC_1.ResourceIdentifierC).is(data) || // Prevent repeating the conversion.
                EntityC_1.EntityC.is(data)
                ? [
                    ArrayC_1.ArrayC().is(data)
                        ? data.map(function (record) { return JsonApiData_1.JsonApiData.fromJson(record, locals); })
                        : JsonApiData_1.JsonApiData.fromJson(data, locals),
                    RelationshipsCache_1.RelationshipsCache.emptyLocal
                ]
                : [data, function_1.identity];
        })));
};
exports.CompoundDocument = {
    fromArray: fromArray,
    fromJson: fromJson,
    fromRecord: fromRecord,
    fromUnknown: fromUnknown
};
