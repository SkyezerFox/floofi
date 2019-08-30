"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SYNTAX_OPTIONS = {
    concat: false,
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
    get concat() {
        return this.options.concat;
    }
    /**
     * Makes the argument rest, or sets rest mode on this arg.
     * @param toggle Whether the argument is rest or not
     */
    isRest(toggle = true) {
        this.options.rest = toggle;
    }
    /**
     * Makes the argument optional, or sets optional status on this arg.
     * @param toggle Whether the argument is optional or not
     */
    isOptional(toggle = true) {
        this.options.optional = toggle;
    }
    /**
     * Makes the argument concatenable, or sets concatenation enabled on this arg.
     * @param toggle Whether or not the argument is concatenable
     */
    isConcat(toggle = true) {
        this.options.concat = toggle;
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
