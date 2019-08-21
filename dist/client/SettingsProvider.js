"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const DEFAULT_GUILD_SETTINGS = {
    prefix: "!",
    rolePermissions: {},
    userPermissions: {},
};
const DEFAULT_PROVIDER_SETTINGS = {
    defaults: {
        guild: DEFAULT_GUILD_SETTINGS,
    },
};
/**
 * Class for managing settings
 */
class SettingsProvider extends events_1.EventEmitter {
    constructor(client, options) {
        super();
        this.client = client;
        this.options = Object.assign(DEFAULT_PROVIDER_SETTINGS, options);
        this.client.logger.verbose("[settings] Instiantated the SettingsProvider.");
    }
    /**
     * Called by the client when loging in
     */
    async init() {
        this.emit("warn", "The base SettingsProvider class has no init method.");
        return true;
    }
    /**
     * Get settings for the given guild id
     * @param id Guild id
     */
    async get(id) {
        this.emit("warn", "The base SettingsProvider class has no get method.");
        return DEFAULT_GUILD_SETTINGS;
    }
    /**
     * Get a particular prop of the given settings
     */
    async getProp(id, key) {
        return (await this.get(id))[key];
    }
    /**
     * Get a guild's prefix
     * @param id Guild ID
     */
    async getPrefix(id) {
        return await this.getProp(id, "prefix");
    }
    /**
     * Check if a guild member has the given permission level
     */
    async hasPermission(member, permissionLevel) {
        const rolePermissions = await Promise.all(member.roles.map(async (v) => await this.getRolePermission(member.guild.id, v.id)));
        if (Math.max(...rolePermissions) >= permissionLevel ||
            (await this.getUserPermission(member.guild.id, member.id)) >=
                permissionLevel) {
            return true;
        }
        return false;
    }
    /**
     * Fetch permission level for given user id in given guild id
     * @param guild Guild ID
     * @param userID User ID
     */
    async getUserPermission(guild, userID) {
        const userPerms = await this.getProp(guild, "userPermissions");
        if (userPerms[userID]) {
            return userPerms[userID];
        }
        else {
            return 0;
        }
    }
    /**
     * Fetch permission level for given role id in given guild id
     * @param guild Guild ID
     * @param roleID Role ID
     */
    async getRolePermission(guild, roleID) {
        const rolePerms = await this.getProp(guild, "rolePermissions");
        if (rolePerms[roleID]) {
            return rolePerms[roleID];
        }
        else {
            return 0;
        }
    }
    /**
     * Set new guild settings
     */
    async set(id, newSettings) {
        this.emit("warn", "The base SettingsProvider class has no get method.");
        return false;
    }
    /**
     * Set a particular property of the settings
     * @param id Guild ID
     * @param key Key of the prop
     * @param value New value
     */
    async setProp(id, key, value) {
        return await this.set(id, Object.assign(await this.get("id"), { [key]: value }));
    }
}
exports.SettingsProvider = SettingsProvider;
