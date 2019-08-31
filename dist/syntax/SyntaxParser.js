"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParserError_1 = require("./SyntaxParserError");
const types = require("./types");
// Array of valid type names
const validTypes = [
    "boolean",
    "number",
    "string",
    "channel",
    "member",
    "guild",
    "invite",
    "role",
    "user",
    "vc",
];
// #region Matching RegExps
/**
 * Base RegExp used for testing validity of syntax strings.
 */
const validStringTest = new RegExp(`[a-zA-z]+:(${validTypes.join("|")})(\\?)?(\.{3})?`);
/**
 * Captures argument names.
 */
const typeNameMatcher = new RegExp(`[a-zA-z]+(?=:(${validTypes.join("|")})(\\?)?(\.{3})?)`);
/**
 * Captures argument type.
 */
const typeMatcher = new RegExp(`(?<=[a-zA-z]+:)(${validTypes.join("|")})(?=(\\?)?(\.{3})?)`);
/**
 * Captures argument optionality.
 */
const optionalMatcher = new RegExp(`(?<=[a-zA-z]+:(${validTypes.join("|")}))(\\?)?(?=(\.{3})?)`);
/**
 * Captures whether or not an argument is rest.
 */
const restMatcher = new RegExp(`(?<=[a-zA-z]+:(${validTypes.join("|")})(\\?)?)(\.{3})?`);
// #endregion
const typeMap = {
    any: types.AnyType,
    boolean: types.BooleanType,
    number: types.NumberType,
    string: types.StringType,
    channel: types.ChannelType,
    invite: types.InviteType,
    member: types.MemberType,
    role: types.RoleType,
    user: types.UserType,
    vc: types.VCType,
};
/**
 * Util function that creates types from string representnations
 * @param type
 */
const createType = (name, type, extras) => {
    return new typeMap[type](name, extras);
};
/**
 * Class for dealing with syntax parsing
 */
class SyntaxParser {
    constructor(syntax) {
        if (syntax instanceof Array) {
            this.multiSyntax = true;
            this._syntax = syntax;
        }
        else {
            this.multiSyntax = false;
            this._syntax = syntax.split(" ");
        }
        this._flags = [];
        this.syntax = [];
        this.flags = [];
        this.refresh();
    }
    // #region SyntaxParser methods
    /**
     * Add a syntax variant to the parser.
     * @param syntax Syntax to add
     */
    addSyntax(syntax) {
        this._syntax.push(syntax);
        this.refresh();
        return this;
    }
    /**
     * Remove a syntax variant from the parser.
     * @param index Index of the variant
     */
    removeSyntax(index) {
        this._syntax.splice(index, 1);
        this.refresh();
        return this;
    }
    /**
     * Add a flag to the syntax parser.
     * @param flagName Name of the flag, and possible aliases
     * @param syntax Syntax parsing to perform on the flag
     */
    addFlag(flagName, syntax) {
        this._flags.push([flagName, syntax]);
        this.refresh();
        return this;
    }
    /*
     * Remove a flag from the parser.
     * @param flagName Name or alias of the flag
     *
    public removeFlag(flagName: string) {
        const flagToRemove = this._flags.find((v) => {
            if (v[0] instanceof Array) {
                return v[0].reduce<boolean>(
                    (equals, val) => (equals ? val === flagName : false),
                    true,
                );
            }
            return v[0] === flagName;
        });

        if (!flagToRemove) {
            return this;
        }

        this._flags.splice(this._flags.indexOf(flagToRemove), 1);

        this.refresh();
        return this;
    }
    */
    /**
     * Parses message content into valid values
     */
    async parse(client, message, args) {
        const parsedSyntax = [];
        let onRestArgument = false;
        // Check if missing required arguments
        const missingOptionalArguments = this.syntax.reduce((failed, syntax, i) => {
            if (failed) {
                return failed;
            }
            // if syntax is required
            if (!syntax.isOptional) {
                // if no argument exists
                if (!args[i]) {
                    return i;
                }
            }
            return null;
        }, null);
        // If there are missing required arguments, throw
        if (missingOptionalArguments) {
            throw new SyntaxParserError_1.SyntaxParserError("PARSE_ERROR", {
                index: missingOptionalArguments,
                syntax: this.syntax[missingOptionalArguments],
            });
        }
        // If there are too many arguments, and the last argument isn't rest
        if (args.length > this.syntax.length &&
            !this.syntax[this.syntax.length - 1].isOptional) {
            throw new SyntaxParserError_1.SyntaxParserError("PARSE_ERROR", {
                arg: args[this.syntax.length],
                index: this.syntax.length,
            });
        }
        // Actual syntax parsing
        /** @todo Support asynchronous types */
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (!onRestArgument && this.syntax[i].isRest) {
                onRestArgument = true;
            }
            const syntaxIndex = onRestArgument ? this.syntax.length - 1 : i;
            const syntax = this.syntax[syntaxIndex];
            if (onRestArgument && i === syntaxIndex) {
                parsedSyntax.push([
                    await syntax.parse(client, message, arg, i),
                ]);
            }
            else if (onRestArgument) {
                parsedSyntax[syntaxIndex].push(await syntax.parse(client, message, arg, i));
            }
            else {
                parsedSyntax.push(await syntax.parse(client, message, arg, i));
            }
        }
        return parsedSyntax;
    }
    // #endregion
    //#region SyntaxParser Private Methods
    /**
     * Refreshes the syntax types by checking if they have been updated.
     */
    refresh() {
        if (this._syntax.length !== this.syntax.length) {
            this.syntax = this._syntax.map((s) => this.createType(s));
        }
        if (this._flags.length !== this.flags.length) {
            this.flags = this._flags.map((f) => this.createFlag(f));
        }
        return this;
    }
    /**
     * Creates a syntax type from a string.
     * @param s String representation of the type
     */
    createType(s) {
        const valid = validStringTest.test(s);
        const typeMatch = s.match(typeMatcher);
        const typeNameMatch = s.match(typeNameMatcher);
        // Check if syntax string is valid
        if (!typeNameMatch) {
            throw new SyntaxParserError_1.SyntaxParserError("INTERNAL_ERROR", {
                message: `Invalid type name`,
            });
        }
        if (!typeMatch) {
            throw new SyntaxParserError_1.SyntaxParserError("INTERNAL_ERROR", {
                message: "Invalid type",
            });
        }
        if (!valid) {
            throw new SyntaxParserError_1.SyntaxParserError("INTERNAL_ERROR", {
                message: "Invalid syntax string",
            });
        }
        const type = typeMatch[0];
        const typeName = typeNameMatch[0];
        const rest = restMatcher.test(s);
        const optional = optionalMatcher.test(s);
        return createType(typeName, type, { rest, optional });
    }
    /**
     * Creates a syntax flag from a string
     * @param f String representation of the flag
     */
    createFlag(f) {
        return "";
    }
}
exports.SyntaxParser = SyntaxParser;
