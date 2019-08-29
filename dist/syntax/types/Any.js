"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxType_1 = require("../SyntaxType");
/**
 * Syntax type used to effectively disable syntax parsing.
 */
class AnyType extends SyntaxType_1.SyntaxType {
    constructor() {
        super(...arguments);
        this.typeName = "any";
    }
    parse(client, message, arg) {
        return arg;
    }
}
exports.AnyType = AnyType;
