"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const FancyEmbed_1 = require("./FancyEmbed");
/**
 * Create a rather nice error embed for use in messages
 * @param {string} msg - The message the embed should say
 */
exports.smallErrorEmbed = (msg) => new discord_js_1.RichEmbed().setDescription(`:x: ${msg}`).setColor(0xff5555);
/**
 * Create an even nicer big error embed for use in messages
 * @param {FloofiClient} client - The client object, allows for the setting of the bot's name as the footer
 * @param {string} title - The title of the embed
 * @param {string} msg - The message of the embed
 */
exports.bigErrorEmbed = (client, title, msg) => new FancyEmbed_1.FancyEmbed(client)
    .setTitle(`:x: ${title}`)
    .setDescription(msg)
    .setColor(0xff5555)
    .setTimestamp();
/**
 * Create a rather nice check embed for use in messages
 * @param {string} msg - The message the embed should say
 */
exports.smallCheckEmbed = (msg) => new discord_js_1.RichEmbed()
    .setDescription(`:white_check_mark: ${msg}`)
    .setColor(0x55ff55);
/**
 * Create an even nicer big check embed for use in messages
 * @param {FloofiClient} client - The client object, allows for the setting of the bot's name as the footer
 * @param {string} title - The title of the embed
 * @param {string} msg - The message of the embed
 */
exports.bigCheckEmbed = (title, msg) => new discord_js_1.RichEmbed()
    .setTitle(`:white_check_mark: ${title}`)
    .setDescription(msg)
    .setColor(0x55ff55)
    .setTimestamp();
