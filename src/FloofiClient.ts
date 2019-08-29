import { Client, ClientOptions } from "discord.js";
import * as winston from "winston";

import { SettingsProvider, SettingsProviderOptions } from "./providers/SettingsProvider";
import { Command } from "./structures/commands/Command";
import { CommandGroup } from "./structures/commands/CommandGroup";
import { CommandRegistry } from "./structures/commands/CommandRegistry";
import { PluginManager, PluginManagerOptions } from "./structures/plugins/PluginManager";
import * as Constants from "./util/Constants";

/**
 * FloofiClientOptions
 *
 * @typedef
 * @property {string} [debug] - Whether to log debug info
 * @property {string} [name="username"] - Name of the bot
 * @property {boolean} offline - Whether or not the bot should start in offline mode
 * @property {Object} pluginOptions - Options for the PluginManager
 * @property {string} token - Token to use to connect to Discord
 */
interface FloofiClientOptions extends ClientOptions {
	debug?: "verbose" | "debug";
	name: string;
	offline: boolean;
	pluginOptions: PluginManagerOptions;
	token: string;
}

const DEFAULT_FLOOFI_OPTIONS: Partial<FloofiClientOptions> = {
	name: "floofi",
	offline: false,
	pluginOptions: { watch: { include: [] } },
	token: "",
};

/**
 * Main client for interacting with Discord
 */
export class FloofiClient extends Client {
	public options: FloofiClientOptions;

	public registry: CommandRegistry;
	public pluginManager: PluginManager;
	public provider: SettingsProvider;

	public logger: winston.Logger;

	public add: (
		...commandsOrGroup: Array<Command<any> | CommandGroup>
	) => CommandRegistry;

	// UTILITY METHODS

	constructor(opts?: Partial<FloofiClientOptions>) {
		super(opts);
		this.options = Object.assign(
			DEFAULT_FLOOFI_OPTIONS,
			opts,
		) as FloofiClientOptions;

		this.logger = winston.createLogger({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.timestamp(),
				winston.format.simple(),
				winston.format.printf((info) => {
					const { level, message } = info;
					return `${new Date().toISOString()} ${level} ${message}`;
				}),
			),
			transports: new winston.transports.Console({
				level:
					this.options.debug === "verbose"
						? "verbose"
						: this.options.debug === "debug"
						? "debug"
						: "info",
			}),
		});

		this.logger.verbose(
			`floofi v${Constants.VERSION}-${
				process.env.NODE_ENV === "development" ? "dev" : "prod"
			} - hewwo!! >w<`,
		);

		this.logger.verbose(
			`floofi v${Constants.VERSION}-${
				process.env.NODE_ENV === "development" ? "dev" : "prod"
			} - yes if you're wondering, this bot was programmed by a furry`,
		);

		this.provider = new SettingsProvider(this);
		this.registry = new CommandRegistry(this, {
			prefix: this.provider.options.defaults.guild.prefix,
		});

		// Bind the plugin manager to the add function
		this.add = this.registry.add.bind(this.registry);

		this.pluginManager = new PluginManager(
			this,
			this.options.pluginOptions,
		);

		this.on("debug", (m) => this.logger.debug(m));
		this.provider.on("error", (msg) =>
			this.logger.error(`[settings] ${msg}`),
		);
		this.provider.on("warn", (msg) =>
			this.logger.warn(`[settings] ${msg}`),
		);

		this.on("error", (err) => this.logger.error(err));

		this.logger.verbose(`Using name "${this.options.name}"`);
		this.logger.verbose("READY woot we're all set to go!!! ^w^");
	}

	/**
	 * Log in to Discord
	 * @param {string} [token] - Token to use while connecting to Discord, defaults to the one provided in options.
	 * @param $number} [attempt=0] - Value used at runtime to determine how many times the login flow has been attempted - YOU SHOULDN'T USE THIS.
	 */
	public async login(token?: string, attempt = 0) {
		this.logger.info("Logging in...");

		if (this.options.token === "" && !token) {
			this.logger.warn("No token provided - proceeding in offline mode.");
			this.options.offline = true;
			return this.options.token;
		} else if (!this.options.token) {
			this.options.token = token as string;
		}

		if (attempt === 0) {
			this.logger.verbose(
				"[settings] Asking the SettingsProvider to initialize...",
			);
			if (this.provider.constructor.name === "SettingsProvider") {
				this.logger.warn(
					"[settings] You are using the default SettingsProvider - nothing will work as intended!!",
				);
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
		} catch (err) {
			if (attempt === 5) {
				this.logger.error(
					"Could not connect to Discord after 5 attempts.",
				);
				process.exit();
				return this.options.token;
			}

			if (
				err
					.toString()
					.startsWith("Error: Incorrect login details were provided.")
			) {
				this.logger.warn(
					"Invalid token provided - proceeding in offline mode.",
				);
				this.options.offline = true;
				return this.options.token;
			}

			this.logger.error(err);

			switch (err.code) {
				case "ENOTFOUND": {
					this.logger.warn(
						"Could not connect to Discord. Trying again in 5000ms...",
					);
					this.setTimeout(
						() => this.login(this.options.token, attempt + 1),
						5e3,
					);
					break;
				}
				default: {
					this.logger.error(
						"UNEXPECTED ERROR - aaaa!!! this wasn't supposed to happen ;-;",
					);
					this.logger.error(
						"floofi received an unexpected error message from Discord.",
					);
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
	public useProvider<
		Provider extends SettingsProvider,
		Options extends SettingsProviderOptions
	>(
		provider: new (client: FloofiClient, opts?: Partial<Options>) =>
			| Provider
			| Provider,
		opts?: Partial<Options>,
	) {
		this.provider = new provider(this, opts);
		return this;
	}
}
