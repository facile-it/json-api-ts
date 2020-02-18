"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document_1 = require("./Document");
var Payload_1 = require("./Payload");
exports.encode = Document_1.Document.fromJson;
exports.decode = Payload_1.Payload.fromJson;
