import { Message as ErisMessage } from "eris";

import { Client } from "../ErisClient";
import { exists } from "../util/Util";

const EquivalentMessageObjectKeys = ["content", "cleanContent"];

export declare interface Message {
	content: string;
	cleanContent: string;
}

export class Message {
	public client: Client;

	// Store the original message object.
	// tslint:disable-next-line: variable-name
	private _message: ErisMessage;

	constructor(client: Client, message: ErisMessage) {
		this.client = client;
		this._message = message;

		EquivalentMessageObjectKeys.forEach((key) =>
			Object.defineProperty(
				this,
				key,
				(this._message as { [x: string]: any })[key],
			),
		);
	}

	/**
	 * Whether or not the post is a cross-post.
	 * This is true if the message was cross-posted using an announcements channel.
	 */
	get crosspost() {
		return exists(this._message.messageReference);
	}

	get author() {}
}
