import { Collection, Message, RichEmbed, TextChannel } from "discord.js";

import { FloofiClient } from "../../client/FloofiClient";
import { PagedEmbed } from "./PagedEmbed";

/**
 * Class for managing paged embeds
 */
export class PagerManager {
	public client: FloofiClient;
	public pagers: Collection<string, PagedEmbed>;

	constructor(client: FloofiClient) {
		this.client = client;
		this.pagers = new Collection();

		this.client.on("messageReactionAdd", (reaction, user) => {
			const pager = this.pagers.get(reaction.message.id);
			if (pager) {
				pager.handleReaction(reaction, user);
			}
		});

		this.client.on("messageDelete", (message) => {
			const pager = this.pagers.get(message.id);
			if (pager) {
				pager.emit("destroy");
				this.pagers.delete(message.id);
			}
		});
	}

	/**
	 * Create a paged embed
	 * @param message The message to attach the pager to
	 * @param data
	 */
	public createPager(message: Message, data: RichEmbed[]) {
		const pager = new PagedEmbed(
			this.client,
			message,
			message.member,
			data,
		);

		this.pagers.set(message.id, pager);
	}
}
