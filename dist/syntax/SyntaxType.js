"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class for representing syntax types
 */
class SyntaxType {
    constructor(name, optional = true, rest = false, extras) {
        this.typeName = "SyntaxType";
        if (this.constructor.name === "SyntaxType") {
            throw Error("The SyntaxType class may not be instantiated.");
        }
        this.argName = name;
        this.optional = optional;
        this.rest = rest;
        this.options = Object.assign({}, extras);
    }
    /**
     * Attempt to parse the given string argument into the type's output
     * @param {FloofiClient} client - The client object
     * @param {string} value - Value parsed from the message
     * @param {number} index - Current index of the argument
     */
    parse(client, message, value, index) {
        throw Error("The SyntaxType class has no parse method");
    }
}
exports.SyntaxType = SyntaxType;
