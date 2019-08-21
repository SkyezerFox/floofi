"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const events_1 = require("events");
const Command_1 = require("../commands/Command");
const CommandGroup_1 = require("../commands/CommandGroup");
exports.createPlugin = (name, ...props) => {
    return (client) => new Plugin(client, name).add(...props);
};
class Plugin extends events_1.EventEmitter {
    constructor(client, name) {
        super();
        // tslint:disable-next-line: variable-name
        this._on = super.on;
        this.started = false;
        this.client = client;
        this.name = name;
        this.commands = new discord_js_1.Collection();
        this.groups = new discord_js_1.Collection();
        this.clientListeners = [];
        this.logger = this.client.logger;
        this.provider = this.client.provider;
        this._on("init", () => {
            client.logger.debug(`[plugins] INIT plugin "${this.name}"`);
            if (this.started) {
                client.logger.warn(`[plugins] Plugin "${this.name}" got initialized twice!!!`);
            }
            else {
                this.started = true;
            }
        });
        this._on("stop", () => {
            client.logger.debug(`[plugins] STOP plugin "${this.name}"`);
            this.clientListeners.forEach((v) => this.client.removeListener(v[0], v[1]));
            this.client.registry.removeCommand(...this.commands.array());
        });
    }
    /**
     * Specifically adds commands to the plugin
     * @param cmds Commands to add
     */
    addCommand(...cmds) {
        cmds.forEach((cmd) => {
            this.commands.set(cmd.options.name, cmd);
        });
        this.client.registry.addCommand(...cmds);
    }
    /**
     * Specifically adds groups to the plugin
     * @param groups Groups to add
     */
    addGroup(...groups) {
        groups.forEach((group) => {
            this.groups.set(group.name, group);
        });
        this.client.registry.addGroup(...groups);
    }
    /**
     * Add commands/groups to the plugin
     */
    add(...cmdsOrGroups) {
        cmdsOrGroups.forEach((v) => {
            if (v instanceof Command_1.Command) {
                this.addCommand(v);
            }
            else if (v instanceof CommandGroup_1.CommandGroup) {
                this.addGroup(v);
            }
            else if (v instanceof Array) {
                this.on(v[0], v[1]);
            }
            else {
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
    on(eventName, listener) {
        this.client.on(eventName, listener);
        this.clientListeners.push([eventName, listener]);
        return this;
    }
    /**
     * Forcibly stop the plugin
     */
    forceStop() {
        this.emit("stop");
    }
    /**
     * Method for sending data between plugins
     * @param dest Destination plugin
     * @param data Data
     */
    sendMessage(dest, data) {
        const plugin = this.client.pluginManager.plugins.get(dest);
        if (plugin) {
            plugin.emit("message", data);
        }
    }
}
exports.Plugin = Plugin;
