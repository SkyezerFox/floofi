import { Collection, GuildMember, Message } from "discord.js";

import { FloofiClient } from "../../client/FloofiClient";
import { Command } from "./Command";
import { CommandGroup, GroupTree } from "./CommandGroup";

export class CommandRegistry {
	public client: FloofiClient;
	public commands: Collection<string, Command<any>>;
	public groups: Collection<string, CommandGroup>;

	public options: { prefix: string };

	public commandAliasMap: Collection<string, string>;
	public groupAliasMap: Collection<string, string>;

	constructor(client: FloofiClient, options: { prefix: string }) {
		this.client = client;
		this.commands = new Collection();
		this.groups = new Collection();

		this.options = options;

		this.commandAliasMap = new Collection();
		this.groupAliasMap = new Collection();

		this.client.on("message", async (m) => {
			if (!m.guild) {
				return;
			}

			const cmd = await this.findCommandFromMessage(m);
			if (cmd) {
				if (
					cmd[0].options.guild &&
					cmd[0].options.guild !== m.guild.id
				) {
					return;
				}
				this.run(m, cmd[0], cmd[1]);
			}
		});

		this.client.logger.verbose("[cmds] Instiantated the CommandRegistry.");
	}

	/**
	 * Specifically adds commands the registry
	 * @param cmds Commands to add
	 */
	public addCommand(...cmds: Array<Command<any>>) {
		cmds.forEach((cmd) => {
			this.commands.set(cmd.options.name, cmd);
			if (cmd.options.aliases) {
				cmd.options.aliases.forEach((v) =>
					this.commandAliasMap.set(v, cmd.options.name),
				);
			}

			this.client.logger.debug(
				`[cmds] Added group "${cmd.name}" to the top-level registry.`,
			);
		});

		this.client.logger.debug(
			`[cmds] Added ${cmds.length} commands to the top-level registry.`,
		);
	}

	/**
	 * Specifically adds groups to the registry
	 * @param groups Groups to add
	 */
	public addGroup(...groups: CommandGroup[]) {
		groups.forEach((group) => {
			this.groups.set(group.name, group);
			group.aliases.forEach((v) => this.groupAliasMap.set(v, group.name));

			this.client.logger.debug(
				`[cmds] Added group "${group.name}" to the top-level registry.`,
			);
		});

		this.client.logger.debug(
			`[cmds] Added ${groups.length} groups to the top-level registry.`,
		);
	}

	/**
	 * Adds groups/commands to the registry
	 */
	public add(...cmdsOrGroups: Array<Command<any> | CommandGroup>) {
		cmdsOrGroups.forEach((v) => {
			if (v instanceof Command) {
				this.addCommand(v);
			} else {
				this.addGroup(v);
			}
		});

		return this;
	}

	/**
	 * Removes commands from the registry
	 */
	public removeCommand(...cmds: Array<Command<any> | string>) {
		cmds.forEach((cmd) => {
			if (typeof cmd === "string") {
				this.commands.delete(cmd);
			} else {
				const i = this.commands.array().indexOf(cmd);
				if (i !== -1) {
					this.commands.delete(this.commands.keyArray()[i]);
				}
			}
		});
	}

	/**
	 * Runs a command in the context of message
	 * @param message Message to run command with
	 * @param command Command to run
	 */
	public run(message: Message, command: Command<any>, depth: number) {
		this.client.logger.info(
			`[cmd] ${message.author.tag} (${message.author.id}/${
				message.guild.id
			}:${message.channel.id}) => ${command.options.name}`,
		);

		return command.run(this.client, message, depth);
	}

	/**
	 * Attempts to find a matching command in a given message
	 * @param message The message to search in
	 */
	public async findCommandFromMessage(
		message: Message,
	): Promise<[Command<any>, number] | undefined> {
		const prefix = await this.client.provider.getPrefix(message.guild.id);

		if (!message.content.startsWith(prefix)) {
			return;
		}

		this.client.logger.debug(
			`[cmds] Message "${
				message.id
			}" is potentially a command - looking further...`,
		);

		const args = message.content
			.slice(prefix.length)
			.trim()
			.split(" ");

		const groupName = args[0];
		const group =
			this.groups.get(groupName) ||
			this.groups.get(this.groupAliasMap.get(args[0]) || "");

		if (groupName && group) {
			this.client.logger.debug(
				`[cmds][${message.id}] Group "${
					group.name
				}" matches - looking for commands...`,
			);

			const groupCmd = group.findFromArgs(args.slice(1));

			if (groupCmd) {
				this.client.logger.debug(
					`[cmds][${message.id}] Found command "${
						groupCmd[0].name
					}" (depth ${groupCmd[1]}) in group "${group.name}".`,
				);
				return groupCmd;
			}

			this.client.logger.debug(`[cmds][${message.id}] No matches.`);
		}

		const cmd = this.commands.get(args[0]);

		if (cmd) {
			return [cmd, 0];
		}
		const aliasedCmdName = this.commandAliasMap.get(args[0]);

		return aliasedCmdName
			? this.commands.get(aliasedCmdName)
				? [this.commands.get(aliasedCmdName) as Command<any>, 0]
				: undefined
			: undefined;
	}

	/**
	 * Return the entire command tree in object form
	 */
	public fetchCommandObjectTree() {
		return {
			commands: this.commands.array(),
			groups: this.groups.array(),
		};
	}

	/**
	 * Return the entire command tree
	 */
	public fetchCommandTree() {
		return {
			commands: this.commands.array(),
			groups: this.groups.map((group) => group.fetchCommandTree()),
		};
	}

	/**
	 * Create user-specific help data
	 * @param member The member to create the help info for
	 */
	public async createHelpData(member: GuildMember) {
		const permissionLevel = await this.client.provider.getUserPermission(
			member.guild.id,
			member.id,
		);

		const unravel = (tree: GroupTree, name: string) =>
			tree.commands.map(
				(cmd) =>
					`${name} ${cmd.name} - ${
						cmd.options.help
							? cmd.options.help.description ||
							  "No description provided."
							: "No description provided."
					}`,
			);

		const tree = this.fetchCommandTree();
	}
}
