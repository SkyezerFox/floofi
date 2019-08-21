import { RichEmbed, RichEmbedOptions } from "discord.js";
import { FloofiClient } from "../client/FloofiClient";

/**
 * A nice, fancy embed
 */
export class FancyEmbed extends RichEmbed {
	constructor(client: FloofiClient, data?: RichEmbedOptions) {
		super(data);

		this.setFooter(`${client.options.name}`, client.user.avatarURL);
		this.setTimestamp();
	}
}
