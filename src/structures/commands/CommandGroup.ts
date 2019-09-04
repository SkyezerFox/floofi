import { Collection } from "discord.js";
import { isUndefined } from "util";

import { Command } from "./Command";

export interface GroupTree {
	commands: Command[];
	groups?: GroupTree[];
	name: string;
}

export const withGroup = (
	groupName: string,
	...cmdsOrSubGroups: Array<Command<any> | CommandGroup>
) => {
	return new CommandGroup(groupName).add(...cmdsOrSubGroups);
};

export class CommandGroup {
	public commands: Collection<string, Command<any>>;
	public subGroups: Collection<string, CommandGroup>;
	public commandAliasMap: Collection<string, string>;
	public groupAliasMap: Collection<string, string>;

	public commandIncrement = 0;
	public groupIncrement = 0;

	public name: string;
	public aliases: string[];

	constructor(name: string, ...aliases: string[]) {
		this.commands = new Collection();
		this.subGroups = new Collection();
		this.commandAliasMap = new Collection();
		this.groupAliasMap = new Collection();

		this.name = name;
		this.aliases = aliases || [];
	}

	/**
	 * Specifically add commands to the group
	 * @param cmds Commands to add
	 */
	public addCommand(...cmds: Array<Command<any>>) {
		console.log("# Adding commands...");
		cmds.forEach((cmd) => {
			this.commands.set(cmd.options.name, cmd);
			if (cmd.options.aliases) {
				cmd.options.aliases.forEach((v) =>
					this.commandAliasMap.set(v, cmd.options.name),
				);
			}
		});
	}

	/**
	 * Specifically add groups to the group
	 * @param groups Groups to add
	 */
	public addGroup(...groups: CommandGroup[]) {
		groups.forEach((group) => {
			this.subGroups.set(group.name, group);
			group.aliases.forEach((v) => this.groupAliasMap.set(v, group.name));
		});
	}

	/**
	 * Adds commands & groups to the group
	 * @param cmdsOrGroups Commands/groups to add
	 */
	public add(...cmdsOrGroups: Array<Command<any> | CommandGroup>) {
		cmdsOrGroups.forEach((v) => {
			if (v instanceof Command) {
				this.addCommand(v);
			} else {
				this.addGroup(v);
			}
		});

		console.log("# Finished adding to group.");

		return this;
	}

	/**
	 * Dynamically remove a command from the group
	 * @param cmds Command to remove
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
	 * Finds a given command by iterating through the group and subgroups
	 * @param commandName Name of the command to find
	 */
	public find(commandName: string): Command<any> | undefined {
		const cmd = this.commands.find((v) =>
			v.options.name ? v.options.name === commandName : false,
		);
		if (cmd) {
			return cmd;
		}

		const iterCmd = this.subGroups
			.map((v) => v.find(commandName))
			.filter((v) => !isUndefined(v))
			.shift();

		if (iterCmd) {
			return iterCmd;
		} else {
			return iterCmd;
		}
	}

	/**
	 * Find a command in a specific group by iterating through the group and specified subgroups
	 * @param groupName Name of the group
	 * @param command Name of the command
	 */
	public findInGroup(
		groupName: string[],
		command: string,
	): Command<any> | undefined {
		if (groupName.length < 1) {
			return this.commands.get(command);
		}

		const group = this.subGroups.get(groupName.shift() || "");
		if (group) {
			return this.findInGroup(groupName, command);
		}
	}

	/**
	 * Gets the depth of the last group that matches the given group names
	 * @param groupNames
	 * @param index
	 */
	public getDeepestGroup(groupNames: string[], index: number = 0): number {
		const nextGroup = groupNames[0];

		if (!nextGroup) {
			return index;
		}

		const group = this.subGroups.get(nextGroup);

		if (!group) {
			return index;
		}

		return group.getDeepestGroup(groupNames.slice(1), (index += 1));
	}

	/**
	 * Looks for a command in the group and returns it, along with the depth of the command
	 * @param args Arguments to look for commands in
	 * @param index Current index
	 */
	public findFromArgs(
		args: string[],
		depth = 1,
	): [Command<any>, number] | undefined {
		const nextGroup = args[0];
		const group =
			this.subGroups.get(nextGroup) ||
			this.subGroups.get(this.groupAliasMap.get(args[0]) || "");

		if (!nextGroup || !group) {
			const cmd = this.commands.get(args[0]);
			if (cmd) {
				return [cmd, depth];
			}
			const aliasedCmdName = this.commandAliasMap.get(args[0]);

			return aliasedCmdName
				? this.commands.get(aliasedCmdName)
					? [this.commands.get(aliasedCmdName) as Command<any>, depth]
					: undefined
				: undefined;
		}

		return group.findFromArgs(args.slice(1), (depth += 1));
	}

	/**
	 * Checks whether the group has an alias
	 * @param name
	 */
	public alias(name: string) {
		return this.aliases ? this.aliases.indexOf(name) !== -1 : false;
	}

	/**
	 * Defines a group alias
	 * @param alias
	 */
	public defAlias(alias: string) {
		this.aliases.push(alias);
		return this;
	}

	/**
	 * Fetch the command tree
	 */
	public fetchCommandTree(): GroupTree {
		return {
			commands: this.commands.array(),
			groups: this.subGroups.map((v) => v.fetchCommandTree()),
			name: this.name,
		};
	}
}
