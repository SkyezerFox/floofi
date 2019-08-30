"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxType_1 = require("../SyntaxType");
/**
 * Syntax type used to effectively disable syntax parsing.
 */
class MemberType extends SyntaxType_1.SyntaxType {
    constructor() {
        super(...arguments);
        this.typeName = "member";
    }
    parse(client, message, arg) {
        return arg;
    }
}
exports.MemberType = MemberType;
