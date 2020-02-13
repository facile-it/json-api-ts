#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Either_1 = require("fp-ts/lib/Either");
var pipeable_1 = require("fp-ts/lib/pipeable");
var TaskEither_1 = require("fp-ts/lib/TaskEither");
var src_1 = require("../src");
var ArrayC_1 = require("../src/io/ArrayC");
var DocumentC_1 = require("../src/io/DocumentC");
var Json_1 = require("../src/Json");
var TE = pipeable_1.pipeable(TaskEither_1.taskEither);
var E = pipeable_1.pipeable(Either_1.either);
pipeable_1.pipe(Json_1.Json.fromFile(process.argv[2]), TE.map(function (u) {
    if (!DocumentC_1.DocumentC.is(u)) {
        console.warn('Cannot find a JSON:API document');
        return u;
    }
    var count = null === u.data || undefined === u.data
        ? 0
        : ArrayC_1.ArrayC().is(u.data)
            ? u.data.length
            : 1;
    console.log(">\u00A6  Decoding " + count + " item(s) with " + (u.included || []).length + " relationship(s)");
    return u;
}), TE.map(src_1.decode))()
    .then(function (either) { return pipeable_1.pipe(either, E.map(JSON.stringify), Either_1.fold(function (error) {
    throw error;
}, function (data) { return console.log(data); })); })
    .catch(function (error) { return console.error(error); });
