import { Collection } from "discord.js";
import { EventEmitter } from "events";
import { existsSync, readdirSync, statSync, watchFile } from "fs";
import { resolve } from "path";

import { FloofiClient } from "../../client/FloofiClient";
import { Plugin } from "./Plugin";

/**
 * Class for dynamically reloading plugins from the file system
 */
export class PluginFileManager extends EventEmitter {
	public client: FloofiClient;
	public plugin?: Plugin;

	constructor(client: FloofiClient) {
		super();
		this.client = client;
	}

	/**
	 * Recursively looks for plugins in path
	 * @param path Path to search in
	 */
	public async loadPluginsFromFile(path: string, watch = false) {
		this.client.logger.debug(
			`[plugins] Attempting to load plugins from "${path}"...`,
		);
		if (!existsSync(path)) {
			this.emit("error", "ENOTFOUND");
		}

		if (statSync(path).isDirectory()) {
			this.client.logger.debug(
				`[plugins] Location appears to be a directory. Attempting to load subfolders...`,
			);

			const directoryFiles = readdirSync(path);
			directoryFiles.map((file) =>
				this.loadPluginsFromFile(resolve(path, file), watch),
			);
		} else if (path.split(".").pop() !== "ts") {
			this.client.logger.debug(
				`[plugins] Skipping "${path}" as it does not appear to be loadable...`,
			);
		} else {
			this.client.logger.debug(`[plugins] Importing plugins...`);
			import(path).then(
				(fileData) =>
					this.handleFileLoad(fileData, watch ? path : undefined),
				(err) => {
					this.emit("error", "IMPORT_ERROR");
				},
			);
		}
	}

	/**
	 * Attempts to find plugins in exported module data
	 * @param plugins Loaded module
	 */
	public async handleFileLoad(
		plugins: { [x: string]: Plugin },
		watch?: string,
	) {
		const pluginKeys = Object.keys(plugins);
		const exports = new Collection<string, any>();

		pluginKeys.forEach((pluginKey) =>
			exports.set(pluginKey, plugins[pluginKey]),
		);

		const pluginsToLoad: Collection<
			string,
			(client: FloofiClient) => Plugin
		> = exports.filter((v) => v instanceof Function);

		this.client.logger.debug(
			`[plugins] Found ${pluginsToLoad.size} plugins to load.`,
		);

		if (watch) {
			this.client.logger.debug(
				`[plugins] Watching enabled - creating watcher...`,
			);
		} else {
			this.client.pluginManager.add(...pluginsToLoad.array());
		}

		return pluginsToLoad.size;
	}
}

// Event Typing
export declare interface PluginFileManager extends EventEmitter {
	client: FloofiClient;
	plugin?: Plugin;

	on(
		eventName: "error",
		listener: (err: "ENOTFOUND" | "IMPORT_ERROR") => void,
	): this;
}
