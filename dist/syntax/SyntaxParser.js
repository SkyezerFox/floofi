"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParseError_1 = require("./SyntaxParseError");
const SyntaxType_1 = require("./SyntaxType");
const NumberType_1 = require("./types/NumberType");
const StringType_1 = require("./types/StringType");
/**
 * Class for dealing with syntax
 */
class SyntaxParser {
    constructor(syntax) {
        if (syntax instanceof Array) {
            if (syntax.slice(0, 1)[0] instanceof SyntaxType_1.SyntaxType) {
                this.types = syntax;
            }
            else {
                this.types = syntax.map((v) => this.stringArrayToTypes(v));
            }
        }
        else {
            this.types = this.stringArrayToTypes(syntax);
        }
        // If multiple syntaxes are provided - ensures the longest matching syntax is always tested first
        if (this.types instanceof Array &&
            this.types.slice(0, 1)[0] instanceof Array) {
            this.types.sort((a, b) => b.length - a.length);
        }
    }
    /**
     * Converts a syntax string array into
     * @param syntaxString The syntax string/type string array to convert to types
     */
    stringArrayToTypes(syntaxString) {
        if (syntaxString instanceof Array) {
            return this._arrToTypes(syntaxString);
        }
        else {
            return this._arrToTypes(syntaxString.split(" "));
        }
    }
    /**
     * Parses strings to the arguments
     * @param args Arguments to parse
     */
    parse(client, args) {
        let normalArgs = [];
        let restArgs = [];
        // If multiple syntaxes are provided
        if (this.types instanceof Array &&
            this.types.slice(0, 1)[0] instanceof Array) {
            const errors = [];
            let parsedArgs;
            for (let i = 0; i < this.types.length; i++) {
                try {
                    const syntax = this.types[i];
                    normalArgs = args;
                    if (args.length > syntax.length) {
                        if (!syntax[syntax.length - 1].rest) {
                            throw new SyntaxParseError_1.SyntaxParseError("INTERNAL_ERROR");
                        }
                        normalArgs = args.slice(0, syntax.length - 1);
                        restArgs = args.slice(syntax.length - 1);
                    }
                    else if (args.length < syntax.length) {
                        // Missing required arguments
                        if (!syntax[args.length].optional) {
                            throw new SyntaxParseError_1.SyntaxParseError("PARSE_ERROR");
                        }
                    }
                    // Map the args with assigned syntaxes to their parsed values - parse the rest values to the rest type
                    parsedArgs = normalArgs
                        .map((v, j) => {
                        return syntax[j].parse(client, v, j);
                    })
                        .concat(restArgs.map((v, j) => syntax[syntax.length - 1].parse(client, v, j)));
                    break;
                }
                catch (err) {
                    errors.push(err);
                }
            }
            if (!parsedArgs && errors.length >= 1) {
                throw errors[0];
            }
            else {
                return args;
            }
        }
        try {
            const syntax = this.types;
            if (args.length > syntax.length) {
                if (!syntax[syntax.length - 1].rest) {
                    throw new SyntaxParseError_1.SyntaxParseError("INTERNAL_ERROR");
                }
                normalArgs = args.slice(0, syntax.length - 1);
                restArgs = args.slice(syntax.length - 1);
            }
            return normalArgs
                .map((v, j) => syntax[j].parse(client, v, j))
                .concat(restArgs.map((v, i) => syntax[syntax.length - 1].parse(client, v, i)));
        }
        catch (err) {
            throw new Error(err);
        }
    }
    _arrToTypes(str) {
        return str.map((v) => {
            let rest = false;
            const nameArr = v.split(":");
            if (v.split(":")[1].startsWith("...")) {
                rest = true;
            }
            const type = rest
                ? nameArr[1].endsWith(">") || nameArr[1].endsWith("]")
                    ? nameArr[1].slice(3, -1)
                    : nameArr[1].slice(3)
                : nameArr[1].endsWith(">") || nameArr[1].endsWith("]")
                    ? nameArr[1].slice(0, -1)
                    : nameArr[1];
            const name = nameArr[0].startsWith("<") || nameArr[0].startsWith("[")
                ? nameArr[0].slice(1)
                : nameArr[0];
            switch (type) {
                case "string": {
                    return new StringType_1.StringType(name, {
                        rest,
                    });
                }
                case "number": {
                    return new NumberType_1.NumberType(name, {
                        rest,
                    });
                }
                default: {
                    throw Error(`Invalid type "${v}"`);
                }
            }
        });
    }
}
exports.SyntaxParser = SyntaxParser;
