"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxParser_1 = require("../../syntax/SyntaxParser");
const SyntaxParserError_1 = require("../../syntax/SyntaxParserError");
const EmbedUtil_1 = require("../../util/EmbedUtil");
const DEFAULT_COMMAND_OPTIONS = {};
/**
 * Class for creating commands
 */
class Command {
    constructor(name, syntax, permissionLevel, executor, opts) {
        this.executor = executor;
        this.parser = new SyntaxParser_1.SyntaxParser(syntax);
        if (name === "remove") {
            console.log("next command construction");
        }
        if (typeof syntax === "string" &&
            syntax.split(" ")[1] &&
            syntax.split(" ")[1].startsWith("description")) {
            console.log("- Assigning command options");
        }
        this.options = {
            name,
            permissionLevel,
        };
        if (typeof syntax === "string" &&
            syntax.split(" ")[1] &&
            syntax.split(" ")[1].startsWith("description")) {
            console.log("- Done");
            console.log("- Assinging defaults...");
        }
        this.options = Object.assign(this.options, DEFAULT_COMMAND_OPTIONS);
        if (typeof syntax === "string" &&
            syntax.split(" ")[1] &&
            syntax.split(" ")[1].startsWith("description")) {
            console.log("- Done");
            console.log("- Assinging parsed options...");
        }
        this.options = Object.assign(this.options, opts);
        if (typeof syntax === "string" &&
            syntax.split(" ")[1] &&
            syntax.split(" ")[1].startsWith("description")) {
            console.log("- Done");
        }
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
    async run(client, message, depth) {
        client.logger.debug(`[cmds][${this.name}] Checking if member has permission to run command...`);
        if (!(await client.provider.hasPermission(message.member, this.options.permissionLevel))) {
            client.logger.debug(`[cmds][${this.name}] No permission - preventing execution.`);
            return;
        }
        client.logger.debug(`[cmds][${this.name}] Has permission - parsing syntax...`);
        let args;
        try {
            args = await this.parser.parse(client, message, message.content
                .trim()
                .split(" ")
                .slice(depth + 1));
        }
        catch (err) {
            let msg = "Oops! Something went wrong behind the scenes. If this keeps happening, DM an admin.";
            if (err instanceof SyntaxParserError_1.SyntaxParserError) {
                switch (err.type) {
                    case "INTERNAL_ERROR": {
                        console.error(err);
                        client.logger.error(err);
                        client.logger.error("---------------");
                        break;
                    }
                    case "PARSE_ERROR": {
                        msg = `Oops! Couldn't parse \`${err.arg}\` to type \`${err.syntax ? err.syntax.typeName : "none"}\`.`;
                        break;
                    }
                }
            }
            else {
                client.logger
                    .error("-".repeat(64))
                    .error(`Error while executing command "${this.name}"`)
                    .error("-".repeat(64));
                console.error(err);
                client.logger.error(err).error("-".repeat(64));
            }
            return message.channel.send(EmbedUtil_1.smallErrorEmbed(msg));
        }
        client.logger.debug(`[cmds][${this.name}] Syntax OK - proceeding with execution...`);
        client.logger.info(`[cmd] ${message.author.tag}` +
            `(${message.author.id}/${message.guild.id}:${message.channel.id}) => ${this.options.name}`);
        this.executor(client, message, args);
        client.logger.debug(`[cmds][${this.name}] Execution OK.`);
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
        this.options.help = Object.assign(this.options.help || {}, {
            description,
        });
        return this;
    }
}
exports.Command = Command;
