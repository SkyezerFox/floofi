"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SYNTAX_OPTIONS = {
    optional: false,
    rest: false,
};
/**
 * Class for representing syntax types
 */
class SyntaxType {
    constructor(name, extras) {
        this.typeName = "SyntaxType";
        if (this.constructor.name === "SyntaxType") {
            throw Error("The SyntaxType class may not be instantiated.");
        }
        this.name = name;
        this.options = Object.assign(exports.DEFAULT_SYNTAX_OPTIONS, extras);
    }
    /**
     * Returns whether the argument is rest
     */
    get rest() {
        return this.options.rest;
    }
    /**
     * Gets whether the argument is optional
     */
    get optional() {
        return this.options.optional;
    }
    /**
     * Makes the argument rest, or sets rest mode to the provided arg
     * @param toggle Whether the argument is rest or not
     */
    isRest(toggle = true) {
        this.options.rest = toggle;
    }
    /**
     * Makes the argument optional, or sets optional status to the provided arg
     * @param toggle Whether the argument is optional or not
     */
    isOptional(toggle = true) {
        this.options.optional = toggle;
    }
    parse(client, value, index) {
        throw Error("The SyntaxType class has no parse method");
    }
}
exports.SyntaxType = SyntaxType;
