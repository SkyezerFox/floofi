"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParseError_1 = require("../../syntax/SyntaxParseError");
const SyntaxParser_1 = require("../../syntax/SyntaxParser");
const EmbedUtil_1 = require("../../util/EmbedUtil");
const DEFAULT_COMMAND_OPTIONS = {};
/**
 * Class for creating commands
 */
class Command {
    constructor(name, syntax, permissionLevel, executor, opts) {
        this.executor = executor;
        this.parser = new SyntaxParser_1.SyntaxParser(syntax);
        this.options = {
            name,
            permissionLevel,
            syntax: this.parser.types,
        };
        this.options = Object.assign(this.options, DEFAULT_COMMAND_OPTIONS);
        this.options = Object.assign(this.options, opts);
    }
    /**
     * The name of the command
     */
    get name() {
        return this.options.name;
    }
    /**
     * Runs the command
     * @param client The client
     * @param message The message to run the command with
     * @param depth The depth the command was called at
     */
    run(client, message, depth) {
        let args;
        try {
            args = this.parser.parse(client, message.content
                .trim()
                .split(" ")
                .slice(depth + 1));
        }
        catch (err) {
            let msg = "Oops! Something went wrong behind the scence. How about you try again?";
            if (err instanceof SyntaxParseError_1.SyntaxParseError) {
                switch (err.type) {
                    case "INTERNAL_ERROR": {
                        msg =
                            "Oops! Something went wrong behind the scence. How about you try again?";
                    }
                    case "PARSE_ERROR": {
                        msg = `Oops! Couldn't parse \`${err.arg}\` to type \`${err.syntax ? err.syntax.typeName : "none"}\`.`;
                    }
                }
            }
            return message.channel.send(EmbedUtil_1.smallErrorEmbed(msg));
        }
        this.executor(client, message, args);
    }
    /**
     * Checks whether the given alias is an alias of the command
     * @param name
     */
    alias(alias) {
        return this.options.aliases
            ? this.options.aliases.indexOf(alias) !== -1
            : false;
    }
    /**
     * Add a description to the command
     * @param description Description to use
     */
    withDescription(description) {
        this.options.help = Object.assign(this.options.help, { description });
        return this;
    }
}
exports.Command = Command;
