"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxType_1 = require("../SyntaxType");
class StringType extends SyntaxType_1.SyntaxType {
    parse(client, message, arg, index) {
        return arg;
    }
}
StringType.typeName = "string";
exports.StringType = StringType;
