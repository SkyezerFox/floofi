import { RichEmbed } from "discord.js";

import { FloofiClient } from "../FloofiClient";
import { FancyEmbed } from "./FancyEmbed";

/**
 * Create a rather nice error embed for use in messages
 * @param {string} msg - The message the embed should say
 */
export const smallErrorEmbed = (msg: string) =>
	new RichEmbed().setDescription(`:x: ${msg}`).setColor(0xff5555);

/**
 * Create an even nicer big error embed for use in messages
 * @param {FloofiClient} client - The client object, allows for the setting of the bot's name as the footer
 * @param {string} title - The title of the embed
 * @param {string} msg - The message of the embed
 */
export const bigErrorEmbed = (
	client: FloofiClient,
	title: string,
	msg: string,
) =>
	new FancyEmbed(client)
		.setTitle(`:x: ${title}`)
		.setDescription(msg)
		.setColor(0xff5555)
		.setTimestamp();

/**
 * Create a rather nice check embed for use in messages
 * @param {string} msg - The message the embed should say
 */
export const smallCheckEmbed = (msg: string) =>
	new RichEmbed()
		.setDescription(`:white_check_mark: ${msg}`)
		.setColor(0x55ff55);

/**
 * Create an even nicer big check embed for use in messages
 * @param {FloofiClient} client - The client object, allows for the setting of the bot's name as the footer
 * @param {string} title - The title of the embed
 * @param {string} msg - The message of the embed
 */
export const bigCheckEmbed = (title: string, msg: string) =>
	new RichEmbed()
		.setTitle(`:white_check_mark: ${title}`)
		.setDescription(`msg`)
		.setColor(0x55ff55)
		.setTimestamp();
