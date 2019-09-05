"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParserError_1 = require("../SyntaxParserError");
const SyntaxType_1 = require("../SyntaxType");
/**
 * Syntax type used to effectively disable syntax parsing.
 */
class RoleType extends SyntaxType_1.SyntaxType {
    parse(client, message, arg, index) {
        const name = arg.match(/@?.*#[0-9]{4}/);
        const validSnowflake = arg.match(/(?<=<@)[0-9]+(?=>)/);
        if (!validSnowflake && !name) {
            throw new SyntaxParserError_1.SyntaxParserError("PARSE_ERROR", {
                arg,
                index,
                syntax: this,
            });
        }
        let role;
        if (validSnowflake) {
            const value = validSnowflake[0];
            role = message.guild.roles.get(value);
        }
        else if (name) {
            role = message.guild.roles.find((namedRole) => namedRole.name === name[0]);
        }
        if (!role) {
            throw new SyntaxParserError_1.SyntaxParserError("VALUE_ERROR", {
                arg,
                index,
                syntax: this,
            });
        }
        return role;
    }
}
RoleType.typeName = "role";
exports.RoleType = RoleType;
