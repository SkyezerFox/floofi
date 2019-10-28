import { Channel, Client } from "eris";

export declare interface TextChannel {
	type: "guild" | "dm";
}

/**
 * Represents a channel in which text can be sent.
 */
export class TextChannel {
	public client: Client;

	// tslint:disable-next-line: variable-name
	public _channel: Channel;
	constructor(client: Client, channel: Channel) {
		this.client = client;
		this._channel = channel;
	}
}
