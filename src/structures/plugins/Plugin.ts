import { Collection } from "discord.js";
import { EventEmitter } from "events";
import { Logger } from "winston";

import { FloofiClient } from "../../FloofiClient";
import { SettingsProvider } from "../../providers/SettingsProvider";
import { ClientEvents, ClientEventType } from "../../util/ClientEvents";
import { Command } from "../commands/Command";
import { CommandGroup } from "../commands/CommandGroup";

export type Listener = (...args: any[]) => any;
export type DefinedListener = [ClientEventType, ClientEvents[ClientEventType]];
export type PluginListener = (plugin: Plugin, client: FloofiClient) => any;

export const createPlugin = (
	name: string,
	...props: Array<
		Command<any> | CommandGroup | DefinedListener | PluginListener
	>
): ((client: FloofiClient) => Plugin) => {
	return (client) => new Plugin(client, name).add(...props);
};

export class Plugin extends EventEmitter {
	public client: FloofiClient;
	public name: string;

	public commands: Collection<string, Command<any>>;
	public groups: Collection<string, CommandGroup>;

	public clientListeners: DefinedListener[];

	public logger: Logger;
	public provider: SettingsProvider;

	// tslint:disable-next-line: variable-name
	public _on = super.on;

	private started = false;

	constructor(client: FloofiClient, name: string) {
		super();
		this.client = client;
		this.name = name;

		this.commands = new Collection();
		this.groups = new Collection();

		this.clientListeners = [];

		this.logger = this.client.logger;
		this.provider = this.client.provider;

		this._on("init", () => {
			client.logger.debug(`[plugins] INIT plugin "${this.name}"`);

			if (this.started) {
				client.logger.warn(
					`[plugins] Plugin "${this.name}" got initialized twice!!!`,
				);
			} else {
				this.started = true;
			}
		});

		this._on("stop", () => {
			client.logger.debug(`[plugins] STOP plugin "${this.name}"`);
			this.clientListeners.forEach((v) =>
				this.client.removeListener(v[0], v[1]),
			);
			this.client.registry.removeCommand(...this.commands.array());
		});
	}

	/**
	 * Specifically adds commands to the plugin
	 * @param cmds Commands to add
	 */
	public addCommand(...cmds: Array<Command<any>>) {
		cmds.forEach((cmd) => {
			this.commands.set(cmd.options.name, cmd);
		});
		this.client.registry.addCommand(...cmds);
	}

	/**
	 * Specifically adds groups to the plugin
	 * @param groups Groups to add
	 */
	public addGroup(...groups: CommandGroup[]) {
		groups.forEach((group) => {
			this.groups.set(group.name, group);
		});
		this.client.registry.addGroup(...groups);
	}

	/**
	 * Add commands/groups to the plugin
	 */
	public add(
		...cmdsOrGroups: Array<
			Command<any> | CommandGroup | DefinedListener | PluginListener
		>
	) {
		cmdsOrGroups.forEach((v) => {
			if (v instanceof Command) {
				this.addCommand(v);
			} else if (v instanceof CommandGroup) {
				this.addGroup(v);
			} else if (v instanceof Array) {
				this.on(v[0], v[1]);
			} else {
				this._on("init", v);
			}
		});

		return this;
	}

	/**
	 * Adds a removable event listener to the client
	 * @param eventName
	 * @param listener
	 */
	public on<EventName extends ClientEventType>(
		eventName: EventName,
		listener: ClientEvents[EventName],
	) {
		this.client.on(eventName, listener);
		this.clientListeners.push([eventName, listener]);
		return this;
	}

	/**
	 * Forcibly stop the plugin
	 */
	public forceStop() {
		this.emit("stop");
	}

	/**
	 * Method for sending data between plugins
	 * @param dest Destination plugin
	 * @param data Data
	 */
	public sendMessage(dest: string, data: any) {
		const plugin = this.client.pluginManager.plugins.get(dest);
		if (plugin) {
			plugin.emit("message", data);
		}
	}
}
