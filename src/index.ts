// CLIENT
export { FloofiClient as Client } from "./FloofiClient";
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
} from "./providers/SettingsProvider";

// UTIL METHODS
export { createPlugin } from "./structures/plugins/Plugin";
export { withGroup } from "./structures/commands/CommandGroup";

// Syntax
import * as Providers from "./providers";
import * as syntax from "./syntax";
import * as Util from "./util";

const SyntaxTypes = syntax.types;

export { Util, Providers, SyntaxTypes };
