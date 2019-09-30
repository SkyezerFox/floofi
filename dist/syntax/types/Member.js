"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParserError_1 = require("../SyntaxParserError");
const SyntaxType_1 = require("../SyntaxType");
/**
 * Syntax type used to effectively disable syntax parsing.
 */
class MemberType extends SyntaxType_1.SyntaxType {
    constructor() {
        super(...arguments);
        this.typeName = "member";
    }
    parse(client, message, arg, index) {
        const name = arg.match(/@.*#[0-9]{4}/);
        const validSnowflake = arg.match(/(?<=<@!?)[0-9]+(?=>)/);
        if (!validSnowflake && !name) {
            throw new SyntaxParserError_1.SyntaxParserError("PARSE_ERROR", {
                arg,
                index,
                syntax: this,
            });
        }
        let member;
        if (validSnowflake) {
            const value = validSnowflake[0];
            member = message.guild.members.get(value);
        }
        else if (name) {
            member = message.guild.members.find((namedMember) => namedMember.user.tag === name[0]);
        }
        if (!member) {
            throw new SyntaxParserError_1.SyntaxParserError("VALUE_ERROR", {
                arg,
                index,
                syntax: this,
            });
        }
        return member;
    }
}
exports.MemberType = MemberType;
