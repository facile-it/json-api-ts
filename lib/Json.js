"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Either_1 = require("fp-ts/lib/Either");
var pipeable_1 = require("fp-ts/lib/pipeable");
var TaskEither_1 = require("fp-ts/lib/TaskEither");
var fs_1 = require("fs");
var TE = pipeable_1.pipeable(TaskEither_1.taskEither);
var fromString = function (s) { return Either_1.tryCatch(function () { return JSON.parse(s); }, function (error) { return error instanceof Error
    ? error
    : Error('Cannot parse JSON data'); }); };
var fromFile = function (path) { return pipeable_1.pipe(TaskEither_1.taskify(fs_1.readFile)(path), TE.mapLeft(function (_a) {
    var message = _a.message;
    return Error(message);
}), TE.map(function (b) { return b.toString(); }), TE.chain(function (s) { return TaskEither_1.fromEither(fromString(s)); })); };
exports.Json = {
    fromFile: fromFile,
    fromString: fromString
};
