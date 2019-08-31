"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParserError_1 = require("../SyntaxParserError");
const SyntaxType_1 = require("../SyntaxType");
/**
 * Syntax type used to effectively disable syntax parsing.
 */
class VCType extends SyntaxType_1.SyntaxType {
    constructor() {
        super(...arguments);
        this.typeName = "channel";
    }
    parse(client, message, arg, index) {
        const name = arg.match(/#[a-zA-Z0-9 \-]+/);
        const validSnowflake = arg.match(/(?<=<#)[0-9]+(?=>)/);
        if (!validSnowflake && !name) {
            throw new SyntaxParserError_1.SyntaxParserError("PARSE_ERROR", {
                arg,
                index,
                syntax: this,
            });
        }
        let channel;
        if (validSnowflake) {
            const value = validSnowflake[0];
            channel = message.guild.channels.get(value);
        }
        else if (name) {
            channel = message.guild.channels.find((namedChannel) => namedChannel.name === name[0]);
        }
        if (!channel) {
            throw new SyntaxParserError_1.SyntaxParserError("VALUE_ERROR", {
                arg,
                index,
                syntax: this,
            });
        }
        if (channel.type !== "voice") {
            throw new SyntaxParserError_1.SyntaxParserError("VALUE_ERROR", {
                arg,
                index,
                syntax: this,
            });
        }
        return channel;
    }
}
exports.VCType = VCType;
