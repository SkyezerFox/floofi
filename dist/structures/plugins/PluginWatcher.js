"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const fs_1 = require("fs");
const glob = require("glob");
/**
 * Second version of the plugin watcher - to dynamically reload plugins on file changes
 */
class PluginWatcher extends events_1.EventEmitter {
    constructor(client, options = { include: [] }) {
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
    async init() {
        this.logger.verbose("[plugins][watcher] Looking for files...");
        await Promise.all(this.options.include.map((v) => new Promise((resolve, reject) => glob(v, async (err, files) => {
            if (err) {
                reject(err);
            }
            files.forEach((path) => this.paths.push(path));
            resolve();
        }))));
        this.logger.info(`[plugins][watcher] Have ${this.paths.length} paths to watch.`);
        this.paths.forEach(async (path) => {
            if (!fs_1.existsSync(path)) {
                return this.logger.warn(`[plugins][watcher] Included path "${path}" has gone missing! Not watching...`);
            }
            this.logger.verbose(`[plugins][watcher] Checking that "${path}" actually contains plugins...`);
            let plugin;
            try {
                plugin = await Promise.resolve().then(() => require(path));
            }
            catch (err) {
                this.logger.error(`[plugins][watcher] Could not load plugin at "${path}".`);
                this.logger.error(err);
                console.error(err);
                return;
            }
            if (!plugin) {
                this.logger.warn(`[plugins][watcher] Entry "${path}" contains no exports. Did you forget to export something?`);
                return;
            }
            const exportKeys = Object.keys(plugin);
            const funcExports = Object.values(plugin).filter((v) => v instanceof Function);
            this.logger.verbose(`[plugins][watcher] Found ${exportKeys.length} exports, ${funcExports.length} of which might be plugins owo`);
            this.watchers.push(fs_1.watch(path, { encoding: "utf8", recursive: false, persistent: true }, this.handleFileChange.bind(this, path)));
            this.logger.verbose(`[plugins][watcher] Created watcher for path "${path}".`);
        });
    }
    handleFileChange(path, event, filename) {
        clearTimeout(this.watcherTimeouts.get(path));
        this.watcherTimeouts.set(path, setTimeout(() => {
            this.logger.verbose(`[plugins][watcher] ${event.toUpperCase()} file "${filename}" - worth reloading? ${event === "change" ? "Yes" : "No"}`);
        }, 1e3));
    }
}
exports.PluginWatcher = PluginWatcher;
