"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class FancyEmbed extends discord_js_1.RichEmbed {
    constructor(data) {
        super(data);
        this.setTimestamp();
    }
}
exports.FancyEmbed = FancyEmbed;
