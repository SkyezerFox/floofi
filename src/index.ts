// CLIENT
export { FloofiClient as Client } from "./client/FloofiClient";
export { CommandRegistry } from "./structures/commands/CommandRegistry";
export { PluginManager } from "./structures/plugins/PluginManager";

// STRUCTURES
export { Command } from "./structures/commands/Command";
export { CommandGroup } from "./structures/commands/CommandGroup";
export { Plugin } from "./structures/plugins/Plugin";
export { FancyEmbed } from "./util/FancyEmbed";

export {
	SettingsProvider,
	DEFAULT_GUILD_SETTINGS,
	GuildSettings,
} from "./client/SettingsProvider";

// UTIL METHODS
export { createPlugin } from "./structures/plugins/Plugin";
export { withGroup } from "./structures/commands/CommandGroup";

// TYPES
export { StringType } from "./syntax/types/StringType";
export { NumberType } from "./syntax/types/NumberType";

// UTIL
export * from "./util/EmbedUtil";
