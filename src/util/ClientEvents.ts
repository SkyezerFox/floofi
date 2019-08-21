import {
	Channel,
	ClientUserGuildSettings,
	ClientUserSettings,
	Collection,
	Emoji,
	Guild,
	GuildMember,
	Message,
	MessageReaction,
	RateLimitInfo,
	Role,
	Snowflake,
	TextChannel,
	User,
	UserResolvable,
} from "discord.js";

// A type containing every single possible event emmitable by the Discord.JS client
export type ClientEventType =
	| "channelCreate"
	| "channelPinsUpdate"
	| "channelUpdate"
	| "clientUserGuildSettingsUpdate"
	| "clientUserSettingsUpdate"
	| "debug"
	| "disconnect"
	| "emojiCreate"
	| "emojiDelete"
	| "emojiUpdate"
	| "error"
	| "guildBanAdd"
	| "guildBanRemove"
	| "guildCreate"
	| "guildDelete"
	| "guildMemberAdd"
	| "guildMemberAvailable"
	| "guildMemberRemove"
	| "guildMembersChunk"
	| "guildMemberSpeaking"
	| "guildMemberUpdate"
	| "guildUnavailable"
	| "guildUpdate"
	| "guildIntegrationsUpdate"
	| "message"
	| "messageDelete"
	| "messageDeleteBulk"
	| "messageReactionAdd"
	| "messageReactionRemove"
	| "messageReactionRemoveAll"
	| "messageUpdate"
	| "presenceUpdate"
	| "rateLimit"
	| "ready"
	| "reconnecting"
	| "resume"
	| "roleCreate"
	| "roleDelete"
	| "roleUpdate"
	| "typingStart"
	| "typingStop"
	| "userNoteUpdate"
	| "userUpdate"
	| "voiceStateUpdate"
	| "warn"
	| "webhookUpdate";

// A stupid interface declaring every possible event syntax usable by the Discord.JS client
export interface ClientEvents {
	channelCreate: (channel: Channel) => void;
	channelDelete: (channel: Channel) => void;
	channelPinsUpdate: (channel: Channel, time: Date) => void;
	channelUpdate: (oldChannel: Channel, newChannel: Channel) => void;
	clientUserGuildSettingsUpdate: (
		clientUserGuildSettings: ClientUserGuildSettings,
	) => void;
	clientUserSettingsUpdate: (clientUserSettings: ClientUserSettings) => void;
	debug: (info: string) => void;
	disconnect: (event: any) => void;
	emojiCreate: (emoji: Emoji) => void;
	emojiDelete: (emoji: Emoji) => void;
	emojiUpdate: (oldEmoji: Emoji, newEmoji: Emoji) => void;
	error: (error: Error) => void;
	guildBanAdd: (guild: Guild, user: User) => void;
	guildBanRemove: (guild: Guild, user: User) => void;
	guildCreate: (guild: Guild) => void;
	guildDelete: (guild: Guild) => void;
	guildMemberAdd: (member: GuildMember) => void;
	guildMemberAvailable: (member: GuildMember) => void;
	guildMemberRemove: (member: GuildMember) => void;
	guildMembersChunk: (members: GuildMember[], guild: Guild) => void;
	guildMemberSpeaking: (member: GuildMember, speaking: boolean) => void;
	guildMemberUpdate: (oldMember: GuildMember, newMember: GuildMember) => void;
	guildUnavailable: (guild: Guild) => void;
	guildUpdate: (oldGuild: Guild, newGuild: Guild) => void;
	guildIntegrationsUpdate: (guild: Guild) => void;
	message: (message: Message) => void;
	messageDelete: (message: Message) => void;
	messageDeleteBulk: (messages: Collection<Snowflake, Message>) => void;
	messageReactionAdd: (messageReaction: MessageReaction, user: User) => void;
	messageReactionRemove: (
		messageReaction: MessageReaction,
		user: User,
	) => void;
	messageReactionRemoveAll: (message: Message) => void;
	messageUpdate: (oldMessage: Message, newMessage: Message) => void;
	presenceUpdate: (oldMember: GuildMember, newMember: GuildMember) => void;
	rateLimit: (rateLimit: RateLimitInfo) => void;
	ready: () => void;
	reconnecting: () => void;
	resume: (replayed: number) => void;
	roleCreate: (role: Role) => void;
	roleDelete: (role: Role) => void;
	roleUpdate: (oldRole: Role, newRole: Role) => void;
	typingStart: (channel: Channel, user: User) => void;
	typingStop: (channel: Channel, user: User) => void;
	userNoteUpdate: (
		user: UserResolvable,
		oldNote: string,
		newNote: string,
	) => void;
	userUpdate: (oldUser: User, newUser: User) => void;
	voiceStateUpdate: (oldMember: GuildMember, newMember: GuildMember) => void;
	warn: (info: string) => void;
	webhookUpdate: (channel: TextChannel) => void;
}
