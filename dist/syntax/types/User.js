"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParserError_1 = require("../SyntaxParserError");
const SyntaxType_1 = require("../SyntaxType");
/**
 * Syntax type used to effectively disable syntax parsing.
 */
class UserType extends SyntaxType_1.SyntaxType {
    constructor() {
        super(...arguments);
        this.typeName = "member";
    }
    parse(client, message, arg, index) {
        const name = arg.match(/@.*#[0-9]{4}/);
        const validSnowflake = arg.match(/(?<=<@)[0-9]+(?=>)/);
        if (!validSnowflake && !name) {
            throw new SyntaxParserError_1.SyntaxParserError("PARSE_ERROR", {
                arg,
                index,
                syntax: this,
            });
        }
        let user;
        if (validSnowflake) {
            const value = validSnowflake[0];
            user = client.users.get(value);
        }
        else if (name) {
            user = client.users.find((namedUser) => namedUser.tag === name[0]);
        }
        if (!user) {
            throw new SyntaxParserError_1.SyntaxParserError("VALUE_ERROR", {
                arg,
                index,
                syntax: this,
            });
        }
        return user;
    }
}
exports.UserType = UserType;
