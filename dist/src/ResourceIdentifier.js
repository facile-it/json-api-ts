"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var monocle_ts_1 = require("monocle-ts");
exports.ResourceIdentifier = {
    iso: {
        string: new monocle_ts_1.Iso(function (s) { return s.type + ":" + s.id; }, function (a) {
            var strings = a.split(':');
            return {
                type: strings[0],
                id: strings[1]
            };
        })
    }
};
