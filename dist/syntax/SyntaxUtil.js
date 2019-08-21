"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringType_1 = require("./types/StringType");
function string(name = "stringArg", maxLength = -1, minLength = -1) {
    return new StringType_1.StringType(name, { maxLength, minLength });
}
exports.string = string;
