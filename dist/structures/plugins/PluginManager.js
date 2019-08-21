"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const events_1 = require("events");
const PluginWatcher_1 = require("./PluginWatcher");
class PluginManager extends events_1.EventEmitter {
    constructor(client, options) {
        super();
        this.client = client;
        this.options = options;
        // this.fileManager = new PluginFileManager(client);
        this.plugins = new discord_js_1.Collection();
        this.pluginWatcher = new PluginWatcher_1.PluginWatcher(client, this.options.watch);
        this.baseDir = process.cwd();
        this.client.once("ready", () => this.plugins.forEach((v) => v.emit("init", v, v.client)));
        this.client.logger.verbose("[plugins] Instiantated the PluginManager.");
        this.client.logger.verbose("[plugins] Prepping PluginWatcher...");
    }
    /**
     * Adds plugins to the manager
     * @param plugins Plugins to add
     */
    add(...plugins) {
        plugins.forEach((pluginConstructor) => {
            const pluginToAdd = pluginConstructor(this.client);
            this.client.logger.debug(`[plugins] Added "${pluginToAdd.name}"...`);
            this.plugins.set(pluginToAdd.name, pluginToAdd);
        });
        return this.client;
    }
    /**
     * Stops the plugins with the specified names
     * @param pluginNames plugin names
     */
    stop(...pluginNames) {
        const pluginsToStop = this.plugins.filter((v) => pluginNames.indexOf(v.name) !== -1);
        this._stop(...pluginsToStop.array());
    }
    /**
     * Removes and stops the plugins with the specified names
     * @param pluginNames plugin names
     */
    remove(...pluginNames) {
        const pluginsToStop = this.plugins.filter((v) => pluginNames.indexOf(v.name) !== -1);
        this._stop(...pluginsToStop.array());
        pluginsToStop.forEach((v) => {
            this.plugins.delete(v.name);
            v = undefined;
        });
    }
    _stop(...plugins) {
        plugins.forEach((v) => v.emit("stop"));
    }
}
exports.PluginManager = PluginManager;
