"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// CLIENT
var FloofiClient_1 = require("./client/FloofiClient");
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
// UTIL METHODS
var Plugin_2 = require("./structures/plugins/Plugin");
exports.createPlugin = Plugin_2.createPlugin;
var CommandGroup_2 = require("./structures/commands/CommandGroup");
exports.withGroup = CommandGroup_2.withGroup;
// TYPES
var StringType_1 = require("./syntax/types/StringType");
exports.StringType = StringType_1.StringType;
var NumberType_1 = require("./syntax/types/NumberType");
exports.NumberType = NumberType_1.NumberType;
// UTIL
__export(require("./util/EmbedUtil"));
