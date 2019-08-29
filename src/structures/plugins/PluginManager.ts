import { Collection } from "discord.js";
import { EventEmitter } from "events";

import { FloofiClient } from "../../FloofiClient";
import { Plugin } from "./Plugin";
import { PluginWatcher, PluginWatcherOptions } from "./PluginWatcher";

export interface PluginManagerOptions {
	watch: PluginWatcherOptions;
}

export class PluginManager extends EventEmitter {
	public client: FloofiClient;
	public options: PluginManagerOptions;

	// public fileManager: PluginFileManager;

	public plugins: Collection<string, Plugin>;
	public pluginWatcher: PluginWatcher;

	public baseDir: string;

	constructor(client: FloofiClient, options: PluginManagerOptions) {
		super();

		this.client = client;
		this.options = options;

		// this.fileManager = new PluginFileManager(client);

		this.plugins = new Collection();
		this.pluginWatcher = new PluginWatcher(client, this.options.watch);

		this.baseDir = process.cwd();

		this.client.once("ready", () =>
			this.plugins.forEach((v) => v.emit("init", v, v.client)),
		);

		this.client.logger.verbose("[plugins] Instiantated the PluginManager.");
		this.client.logger.verbose("[plugins] Prepping PluginWatcher...");
	}

	/**
	 * Adds plugins to the manager
	 * @param plugins Plugins to add
	 */
	public add(...plugins: Array<(client: FloofiClient) => Plugin>) {
		plugins.forEach((pluginConstructor) => {
			const pluginToAdd = pluginConstructor(this.client);
			this.client.logger.debug(
				`[plugins] Added "${pluginToAdd.name}"...`,
			);
			this.plugins.set(pluginToAdd.name, pluginToAdd);
		});

		return this.client;
	}

	/**
	 * Stops the plugins with the specified names
	 * @param pluginNames plugin names
	 */
	public stop(...pluginNames: string[]) {
		const pluginsToStop = this.plugins.filter(
			(v) => pluginNames.indexOf(v.name) !== -1,
		);

		this._stop(...pluginsToStop.array());
	}

	/**
	 * Removes and stops the plugins with the specified names
	 * @param pluginNames plugin names
	 */
	public remove(...pluginNames: string[]) {
		const pluginsToStop = this.plugins.filter(
			(v) => pluginNames.indexOf(v.name) !== -1,
		);

		this._stop(...pluginsToStop.array());
		pluginsToStop.forEach((v) => {
			this.plugins.delete(v.name);
			(v as Plugin | undefined) = undefined;
		});
	}

	private _stop(...plugins: Plugin[]) {
		plugins.forEach((v) => v.emit("stop"));
	}
}
