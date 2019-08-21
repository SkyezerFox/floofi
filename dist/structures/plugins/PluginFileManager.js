"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const events_1 = require("events");
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * Class for dynamically reloading plugins from the file system
 */
class PluginFileManager extends events_1.EventEmitter {
    constructor(client) {
        super();
        this.client = client;
    }
    /**
     * Recursively looks for plugins in path
     * @param path Path to search in
     */
    async loadPluginsFromFile(path, watch = false) {
        this.client.logger.debug(`[plugins] Attempting to load plugins from "${path}"...`);
        if (!fs_1.existsSync(path)) {
            this.emit("error", "ENOTFOUND");
        }
        if (fs_1.statSync(path).isDirectory()) {
            this.client.logger.debug(`[plugins] Location appears to be a directory. Attempting to load subfolders...`);
            const directoryFiles = fs_1.readdirSync(path);
            directoryFiles.map((file) => this.loadPluginsFromFile(path_1.resolve(path, file), watch));
        }
        else if (path.split(".").pop() !== "ts") {
            this.client.logger.debug(`[plugins] Skipping "${path}" as it does not appear to be loadable...`);
        }
        else {
            this.client.logger.debug(`[plugins] Importing plugins...`);
            Promise.resolve().then(() => require(path)).then((fileData) => this.handleFileLoad(fileData, watch ? path : undefined), (err) => {
                this.emit("error", "IMPORT_ERROR");
            });
        }
    }
    /**
     * Attempts to find plugins in exported module data
     * @param plugins Loaded module
     */
    async handleFileLoad(plugins, watch) {
        const pluginKeys = Object.keys(plugins);
        const exports = new discord_js_1.Collection();
        pluginKeys.forEach((pluginKey) => exports.set(pluginKey, plugins[pluginKey]));
        const pluginsToLoad = exports.filter((v) => v instanceof Function);
        this.client.logger.debug(`[plugins] Found ${pluginsToLoad.size} plugins to load.`);
        if (watch) {
            this.client.logger.debug(`[plugins] Watching enabled - creating watcher...`);
        }
        else {
            this.client.pluginManager.add(...pluginsToLoad.array());
        }
        return pluginsToLoad.size;
    }
}
exports.PluginFileManager = PluginFileManager;
