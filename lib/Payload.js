"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ArrayC_1 = require("./io/ArrayC");
var DocumentC_1 = require("./io/DocumentC");
var RawData_1 = require("./RawData");
var ResourceRecord_1 = require("./ResourceRecord");
exports.Payload = {
    fromJson: function (u) {
        if (!DocumentC_1.DocumentC.is(u)) {
            return RawData_1.RawData.fromJson(u, {});
        }
        var resources = ResourceRecord_1.ResourceRecord.fromResources(u.included || []);
        return ArrayC_1.ArrayC().is(u.data)
            ? u.data.map(function (data) { return RawData_1.RawData.fromJson(data, resources); })
            : RawData_1.RawData.fromJson(u.data, resources);
    }
};
