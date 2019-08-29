import { GuildMember, Message, MessageReaction, RichEmbed, User } from "discord.js";
import { EventEmitter } from "events";

import { FloofiClient } from "../../FloofiClient";
import { FancyEmbed } from "../../util/FancyEmbed";

/**
 * Class for representing a paged embed
 */
export class PagedEmbed extends EventEmitter {
	public client: FloofiClient;
	public message: Message;
	public user: GuildMember;

	public pages: RichEmbed[];

	constructor(
		client: FloofiClient,
		message: Message,
		intialiser: GuildMember,
		pageData: RichEmbed[],
	) {
		super();

		this.client = client;
		this.message = message;
		this.user = intialiser;

		this.pages = [];

		this.on("handleReaction", this.handleReaction);
	}

	/**
	 * Add pages
	 * @param embeds Embeds to add
	 */
	public addPage(...embeds: RichEmbed[]) {
		this.pages = this.pages.concat(...embeds);
	}

	public handleReaction(reaction: MessageReaction, user: User) {
		if (reaction.message.id !== this.message.id) {
			return;
		}
	}
}
