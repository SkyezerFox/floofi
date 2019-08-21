import { Message, RichEmbed } from "discord.js";

import { FloofiClient } from "../../client/FloofiClient";
import { SyntaxParseError } from "../../syntax/SyntaxParseError";
import { ReturnableParserType, SyntaxParser } from "../../syntax/SyntaxParser";
import { SyntaxType } from "../../syntax/SyntaxType";
import { smallErrorEmbed } from "../../util/EmbedUtil";

interface ExtraCommandOptions {
	aliases?: string[];
	guild?: string;
	help?: CommandHelp;
}

interface CommandHelp {
	description?: string;
}

interface CommandOptions {
	name: string;
	syntax:
		| Array<SyntaxType<ReturnableParserType>>
		| Array<Array<SyntaxType<ReturnableParserType>>>;
	permissionLevel: number;

	aliases?: string[];
	guild?: string;
	help?: CommandHelp;
}

// Represents the command executor type
type Executor<ArgumentTypes extends ReturnableParserType[] = []> = (
	client: FloofiClient,
	message: Message,
	args: ArgumentTypes,
) => any;

const DEFAULT_COMMAND_OPTIONS: ExtraCommandOptions = {};

/**
 * Class for creating commands
 */
export class Command<ArgumentTypes extends ReturnableParserType[] = []> {
	public options: CommandOptions;
	public executor: Executor<ArgumentTypes>;
	public parser: SyntaxParser;

	constructor(
		name: string,
		syntax:
			| string
			| string[]
			| string[][]
			| Array<Array<SyntaxType<ReturnableParserType>>>
			| Array<SyntaxType<ReturnableParserType>>,

		permissionLevel: number,
		executor: Executor<ArgumentTypes>,
		opts?: ExtraCommandOptions,
	) {
		this.executor = executor;
		this.parser = new SyntaxParser(syntax);

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
	public async run(client: FloofiClient, message: Message, depth: number) {
		client.logger.debug(
			`[cmds][${
				this.name
			}] Checking if member has permission to run command...`,
		);
		if (
			!(await client.provider.hasPermission(
				message.member,
				this.options.permissionLevel,
			))
		) {
			client.logger.debug(
				`[cmds][${this.name}] No permission - preventing execution.`,
			);
			return;
		}

		client.logger.debug(
			`[cmds][${this.name}] Has permission - parsing syntax...`,
		);

		let args;
		try {
			args = this.parser.parse(
				client,
				message.content
					.trim()
					.split(" ")
					.slice(depth + 1),
			);
		} catch (err) {
			let msg =
				"Oops! Something went wrong behind the scenes. If this keeps happening, DM an admin.";
			if (err instanceof SyntaxParseError) {
				switch (err.type) {
					case "INTERNAL_ERROR": {
						console.error(err);
						client.logger.error(err);
						client.logger.error("---------------");
						break;
					}

					case "PARSE_ERROR": {
						msg = `Oops! Couldn't parse \`${err.arg}\` to type \`${
							err.syntax ? err.syntax.typeName : "none"
						}\`.`;
						break;
					}
				}
			} else {
				console.error(err);
				client.logger.error(err);
				client.logger.error("---------------");
			}

			return message.channel.send(smallErrorEmbed(msg));
		}

		client.logger.debug(
			`[cmds][${this.name}] Syntax OK - proceeding with execution...`,
		);
		this.executor(client, message, args as ArgumentTypes);

		client.logger.debug(`[cmds][${this.name}] Execution OK.`);
	}

	/**
	 * Checks whether the given alias is an alias of the command
	 * @param name
	 */
	public alias(alias: string) {
		return this.options.aliases
			? this.options.aliases.indexOf(alias) !== -1
			: false;
	}

	/**
	 * Add a description to the command
	 * @param description Description to use
	 */
	public withDescription(description: string) {
		this.options.help = Object.assign(this.options.help || {}, {
			description,
		});
		return this;
	}
}
