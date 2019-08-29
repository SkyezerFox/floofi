"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const winston = require("winston");
const SettingsProvider_1 = require("./providers/SettingsProvider");
const CommandRegistry_1 = require("./structures/commands/CommandRegistry");
const PluginManager_1 = require("./structures/plugins/PluginManager");
const Constants = require("./util/Constants");
const DEFAULT_FLOOFI_OPTIONS = {
    name: "floofi",
    offline: false,
    pluginOptions: { watch: { include: [] } },
    token: "",
};
/**
 * Main client for interacting with Discord
 */
class FloofiClient extends discord_js_1.Client {
    // UTILITY METHODS
    constructor(opts) {
        super(opts);
        this.options = Object.assign(DEFAULT_FLOOFI_OPTIONS, opts);
        this.logger = winston.createLogger({
            format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.simple(), winston.format.printf((info) => {
                const { level, message } = info;
                return `${new Date().toISOString()} ${level} ${message}`;
            })),
            transports: new winston.transports.Console({
                level: this.options.debug === "verbose"
                    ? "verbose"
                    : this.options.debug === "debug"
                        ? "debug"
                        : "info",
            }),
        });
        this.logger.verbose(`floofi v${Constants.VERSION}-${process.env.NODE_ENV === "development" ? "dev" : "prod"} - hewwo!! >w<`);
        this.logger.verbose(`floofi v${Constants.VERSION}-${process.env.NODE_ENV === "development" ? "dev" : "prod"} - yes if you're wondering, this bot was programmed by a furry`);
        this.provider = new SettingsProvider_1.SettingsProvider(this);
        this.registry = new CommandRegistry_1.CommandRegistry(this, {
            prefix: this.provider.options.defaults.guild.prefix,
        });
        // Bind the plugin manager to the add function
        this.add = this.registry.add.bind(this.registry);
        this.pluginManager = new PluginManager_1.PluginManager(this, this.options.pluginOptions);
        this.on("debug", (m) => this.logger.debug(m));
        this.provider.on("error", (msg) => this.logger.error(`[settings] ${msg}`));
        this.provider.on("warn", (msg) => this.logger.warn(`[settings] ${msg}`));
        this.on("error", (err) => this.logger.error(err));
        this.logger.verbose(`Using name "${this.options.name}"`);
        this.logger.verbose("READY woot we're all set to go!!! ^w^");
    }
    /**
     * Log in to Discord
     * @param {string} [token] - Token to use while connecting to Discord, defaults to the one provided in options.
     * @param $number} [attempt=0] - Value used at runtime to determine how many times the login flow has been attempted - YOU SHOULDN'T USE THIS.
     */
    async login(token, attempt = 0) {
        this.logger.info("Logging in...");
        if (this.options.token === "" && !token) {
            this.logger.warn("No token provided - proceeding in offline mode.");
            this.options.offline = true;
            return this.options.token;
        }
        else if (!this.options.token) {
            this.options.token = token;
        }
        if (attempt === 0) {
            this.logger.verbose("[settings] Asking the SettingsProvider to initialize...");
            if (this.provider.constructor.name === "SettingsProvider") {
                this.logger.warn("[settings] You are using the default SettingsProvider - nothing will work as intended!!");
            }
            await this.provider.init();
            this.pluginManager.pluginWatcher.init();
        }
        if (this.options.offline) {
            this.logger.warn("Offline mode enabled - client will not login.");
            return this.options.token;
        }
        try {
            this.logger.verbose("[auth] Talking to Discord...");
            await super.login(this.options.token);
            this.logger.info("Ready.");
        }
        catch (err) {
            if (attempt === 5) {
                this.logger.error("Could not connect to Discord after 5 attempts.");
                process.exit();
                return this.options.token;
            }
            if (err
                .toString()
                .startsWith("Error: Incorrect login details were provided.")) {
                this.logger.warn("Invalid token provided - proceeding in offline mode.");
                this.options.offline = true;
                return this.options.token;
            }
            this.logger.error(err);
            switch (err.code) {
                case "ENOTFOUND": {
                    this.logger.warn("Could not connect to Discord. Trying again in 5000ms...");
                    this.setTimeout(() => this.login(this.options.token, attempt + 1), 5e3);
                    break;
                }
                default: {
                    this.logger.error("UNEXPECTED ERROR - aaaa!!! this wasn't supposed to happen ;-;");
                    this.logger.error("floofi received an unexpected error message from Discord.");
                    this.logger.error(`Error Message: ${err}`);
                }
            }
        }
        return this.options.token;
    }
    /**
     * Set the SettingsProvider
     * @param {Function} provider - The constructor function of the provider to use
     * @param {*} opts - Options to parse to the provider at runtime
     */
    useProvider(provider, opts) {
        this.provider = new provider(this, opts);
        return this;
    }
}
exports.FloofiClient = FloofiClient;
