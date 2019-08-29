import { RichEmbed } from "discord.js";
import { FloofiClient } from "../FloofiClient";
import { FancyEmbed } from "./FancyEmbed";
/**
 * Create a rather nice error embed for use in messages
 * @param {string} msg - The message the embed should say
 */
export declare const smallErrorEmbed: (msg: string) => RichEmbed;
/**
 * Create an even nicer big error embed for use in messages
 * @param {FloofiClient} client - The client object, allows for the setting of the bot's name as the footer
 * @param {string} title - The title of the embed
 * @param {string} msg - The message of the embed
 */
export declare const bigErrorEmbed: (client: FloofiClient, title: string, msg: string) => FancyEmbed;
/**
 * Create a rather nice check embed for use in messages
 * @param {string} msg - The message the embed should say
 */
export declare const smallCheckEmbed: (msg: string) => RichEmbed;
/**
 * Create an even nicer big check embed for use in messages
 * @param {FloofiClient} client - The client object, allows for the setting of the bot's name as the footer
 * @param {string} title - The title of the embed
 * @param {string} msg - The message of the embed
 */
export declare const bigCheckEmbed: (title: string, msg: string) => RichEmbed;
