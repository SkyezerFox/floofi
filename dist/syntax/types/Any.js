"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxType_1 = require("../SyntaxType");
/**
 * Syntax type used to effectively disable syntax parsing.
 */
class AnyType extends SyntaxType_1.SyntaxType {
    parse(client, message, arg) {
        return arg;
    }
}
AnyType.typeName = "any";
exports.AnyType = AnyType;
