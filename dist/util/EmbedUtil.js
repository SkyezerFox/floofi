"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const FancyEmbed_1 = require("./FancyEmbed");
exports.smallErrorEmbed = (msg) => new discord_js_1.RichEmbed().setDescription(`:x: ${msg}`).setColor(0xff5555);
exports.bigErrorEmbed = (title, msg) => new FancyEmbed_1.FancyEmbed()
    .setTitle(`:x: ${title}`)
    .setDescription(msg)
    .setColor(0xff5555)
    .setTimestamp();
exports.smallCheckEmbed = (msg) => new discord_js_1.RichEmbed()
    .setDescription(`:white_checkmark: ${msg}`)
    .setColor(0x55ff55);
exports.bigCheckEmbed = (msg) => new discord_js_1.RichEmbed()
    .setDescription(`:white_checkmark: ${msg}`)
    .setColor(0x55ff55);
