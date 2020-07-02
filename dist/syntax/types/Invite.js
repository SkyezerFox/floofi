"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParserError_1 = require("../SyntaxParserError");
const SyntaxType_1 = require("../SyntaxType");
/**
 * Syntax type used to effectively disable syntax parsing.
 */
class InviteType extends SyntaxType_1.SyntaxType {
    async parse(client, message, arg, index) {
        if (!arg.match(/\b(https:\/\/)?(discord\.gg\/)?[a-zA-Z]+\b/)) {
            throw new SyntaxParserError_1.SyntaxParserError("PARSE_ERROR", {
                arg,
                index,
                syntax: this,
            });
        }
        const invite = await client.fetchInvite(arg).catch((err) => {
            throw new SyntaxParserError_1.SyntaxParserError("VALUE_ERROR", {
                arg,
                index,
                syntax: this,
            });
        });
        return invite;
    }
}
InviteType.typeName = "invite";
exports.InviteType = InviteType;
