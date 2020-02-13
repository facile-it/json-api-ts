#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Either_1 = require("fp-ts/lib/Either");
var pipeable_1 = require("fp-ts/lib/pipeable");
var TaskEither_1 = require("fp-ts/lib/TaskEither");
var CompoundDocument_1 = require("../src/CompoundDocument");
var Document_1 = require("../src/Document");
var ArrayC_1 = require("../src/io/ArrayC");
var Json_1 = require("../src/Json");
var RelationshipsCache_1 = require("../src/RelationshipsCache");
var TE = pipeable_1.pipeable(TaskEither_1.taskEither);
var E = pipeable_1.pipeable(Either_1.either);
pipeable_1.pipe(Json_1.Json.fromFile(process.argv[2]), TE.map(function (u) {
    var count = null === u || undefined === u
        ? 0
        : ArrayC_1.ArrayC().is(u)
            ? u.length
            : 1;
    console.log(">\u00A6  Encoding " + count + " item(s)");
    return u;
}), TE.map(function (u) { return CompoundDocument_1.CompoundDocument.fromJson(u, true); }), TE.map(function (w) {
    var _a = w(), data = _a[0], relationships = _a[1];
    var cache = RelationshipsCache_1.RelationshipsCache.fromRelationships(relationships);
    var counter = RelationshipsCache_1.RelationshipsCache.lens.counter.get(cache);
    var included = Object.keys(RelationshipsCache_1.RelationshipsCache.lens.global.get(cache)).length;
    console.log(" \u00A6> " + included + " resource(s) found among " + counter + " relationship(s)");
    return w;
}), TE.map(Document_1.Document.fromCompoundDocument))()
    .then(function (either) { return pipeable_1.pipe(either, E.map(JSON.stringify), Either_1.fold(function (error) {
    throw error;
}, function (data) { return console.log(data); })); })
    .catch(function (error) { return console.error(error); });
