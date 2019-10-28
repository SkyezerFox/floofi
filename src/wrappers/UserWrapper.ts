import { User as ErisUser } from "eris";

import { Client } from "../ErisClient";
import { exists } from "../util/Util";

const EquivalentUserObjectKeys = ["id", "username", "discriminator", "bot"];

export declare interface User {
	id: string;

	username: string;
	discriminator: string;

	bot: boolean;

	avatarURL: string;
}

export class User {
	public client: Client;

	// Store the original user object.
	// tslint:disable-next-line: variable-name
	private _user: ErisUser;

	constructor(client: Client, user: ErisUser) {
		this.client = client;
		this._user = user;

		EquivalentUserObjectKeys.forEach((key) =>
			Object.defineProperty(
				this,
				key,
				(this._user as { [x: string]: any })[key],
			),
		);
	}

	/**
	 * The full user tag.
	 */
	get tag(): string {
		return `${this.username}#${this.tag}`;
	}

	//#region Avatar

	/**
	 * The file type of the user's avatar.
	 */
	get avatarType(): string {
		return this.avatarURL.split(".").pop() || "unknown";
	}

	/**
	 * Gets the avatar hash of the user.
	 */
	get avatar(): string {
		return this.avatarIsDefault
			? this._user.defaultAvatar
			: (this._user.avatar as string);
	}

	/**
	 * Whether or not the user has an animated profile picture.
	 */
	get avatarIsAnimated(): boolean {
		return this.avatarType === "gif";
	}

	/**
	 * Whether or not the user has a default profile picture.
	 */
	get avatarIsDefault(): boolean {
		return exists(this._user.avatar);
	}
}
