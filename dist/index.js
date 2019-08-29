"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// CLIENT
var FloofiClient_1 = require("./FloofiClient");
exports.Client = FloofiClient_1.FloofiClient;
var CommandRegistry_1 = require("./structures/commands/CommandRegistry");
exports.CommandRegistry = CommandRegistry_1.CommandRegistry;
var PluginManager_1 = require("./structures/plugins/PluginManager");
exports.PluginManager = PluginManager_1.PluginManager;
// STRUCTURES
var Command_1 = require("./structures/commands/Command");
exports.Command = Command_1.Command;
var CommandGroup_1 = require("./structures/commands/CommandGroup");
exports.CommandGroup = CommandGroup_1.CommandGroup;
var Plugin_1 = require("./structures/plugins/Plugin");
exports.Plugin = Plugin_1.Plugin;
var FancyEmbed_1 = require("./util/FancyEmbed");
exports.FancyEmbed = FancyEmbed_1.FancyEmbed;
var SettingsProvider_1 = require("./providers/SettingsProvider");
exports.SettingsProvider = SettingsProvider_1.SettingsProvider;
exports.DEFAULT_GUILD_SETTINGS = SettingsProvider_1.DEFAULT_GUILD_SETTINGS;
// UTIL METHODS
var Plugin_2 = require("./structures/plugins/Plugin");
exports.createPlugin = Plugin_2.createPlugin;
var CommandGroup_2 = require("./structures/commands/CommandGroup");
exports.withGroup = CommandGroup_2.withGroup;
// Syntax
const Providers = require("./providers");
exports.Providers = Providers;
const syntax = require("./syntax");
const Util = require("./util");
exports.Util = Util;
const SyntaxTypes = syntax.types;
exports.SyntaxTypes = SyntaxTypes;
