"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const __1 = require("../");
const SettingsProvider_1 = require("./SettingsProvider");
class MemoryProvider extends __1.SettingsProvider {
    constructor(client) {
        super(client);
        this.guilds = new discord_js_1.Collection();
    }
    async get(id) {
        return this.guilds.get(id) || SettingsProvider_1.DEFAULT_GUILD_SETTINGS;
    }
    async set(id, value) {
        this.guilds.set(id, value);
        return true;
    }
    async init() {
        this.client.logger.verbose('[settings] Using provider "MemoryProvider"');
        return true;
    }
}
exports.MemoryProvider = MemoryProvider;
