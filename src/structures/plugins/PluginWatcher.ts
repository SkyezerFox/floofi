import { EventEmitter } from "events";
import { FloofiClient } from "../../client/FloofiClient";

import { existsSync, FSWatcher, Stats, watch, watchFile } from "fs";
import * as glob from "glob";
import { Logger } from "winston";

export interface PluginWatcherOptions {
	include: string[];
}

export declare interface PluginWatcher extends EventEmitter {
	client: FloofiClient;
	paths: string[];

	on(
		eventName: "error",
		listener: (errorMessage: "INVALID_PATH", path: string) => any,
	): this;
}

/**
 * Second version of the plugin watcher - to dynamically reload plugins on file changes
 */
export class PluginWatcher extends EventEmitter {
	public client: FloofiClient;
	public logger: Logger;

	public options: PluginWatcherOptions;

	public paths: string[];

	public watchers: FSWatcher[];
	public watcherTimeouts: Map<string, number | NodeJS.Timeout>;

	constructor(
		client: FloofiClient,
		options: PluginWatcherOptions = { include: [] },
	) {
		super();
		this.client = client;
		this.logger = this.client.logger;
		this.options = options;

		this.paths = [];
		this.watchers = [];
		this.watcherTimeouts = new Map();

		// this.init();
	}

	/**
	 * Initialise the file watching.
	 */
	public async init() {
		this.logger.verbose("[plugins][watcher] Looking for files...");

		await Promise.all(
			this.options.include.map(
				(v) =>
					new Promise((resolve, reject) =>
						glob(v, async (err, files) => {
							if (err) {
								reject(err);
							}

							files.forEach((path) => this.paths.push(path));
							resolve();
						}),
					),
			),
		);

		this.logger.info(
			`[plugins][watcher] Have ${this.paths.length} paths to watch.`,
		);

		this.paths.forEach(async (path) => {
			if (!existsSync(path)) {
				return this.logger.warn(
					`[plugins][watcher] Included path "${path}" has gone missing! Not watching...`,
				);
			}

			this.logger.verbose(
				`[plugins][watcher] Checking that "${path}" actually contains plugins...`,
			);

			let plugin: undefined | { [x: string]: any };
			try {
				plugin = await import(path);
			} catch (err) {
				this.logger.error(
					`[plugins][watcher] Could not load plugin at "${path}".`,
				);
				this.logger.error(err);
				console.error(err);
				return;
			}

			if (!plugin) {
				this.logger.warn(
					`[plugins][watcher] Entry "${path}" contains no exports. Did you forget to export something?`,
				);
				return;
			}
			const exportKeys = Object.keys(plugin);
			const funcExports = Object.values(plugin).filter(
				(v) => v instanceof Function,
			);

			this.logger.verbose(
				`[plugins][watcher] Found ${exportKeys.length} exports, ${
					funcExports.length
				} of which might be plugins owo`,
			);

			this.watchers.push(
				watch(
					path,
					{ encoding: "utf8", recursive: false, persistent: true },
					this.handleFileChange.bind(this, path),
				),
			);
			this.logger.verbose(
				`[plugins][watcher] Created watcher for path "${path}".`,
			);
		});
	}

	public handleFileChange(path: string, event: string, filename: string) {
		clearTimeout(this.watcherTimeouts.get(path) as number);

		this.watcherTimeouts.set(
			path,
			setTimeout(() => {
				this.logger.verbose(
					`[plugins][watcher] ${event.toUpperCase()} file "${filename}" - worth reloading? ${
						event === "change" ? "Yes" : "No"
					}`,
				);
			}, 1e3),
		);
	}
}
