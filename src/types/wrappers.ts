import { Collection } from "discord.js";

type DMMessageType = "dm" | "group";
type GuildMessageType = "guild";

type MessageType = DMMessageType | GuildMessageType;
type MessageFlags = Array<"CROSSPOSTED" | "IS_CROSSPOST" | "SUPPRESS_EMBEDS">;

/**
 * Represents a wrapped message object.
 */
export interface Message<T extends TextChannel> {
  id: string;

  channel: Channel;
  guild?: Guild;
  author: User;
  member?: GuildMember;

  content: string;
  timestamp: number;
  edited_timestamp?: number;

  tts: boolean;
  mentionsEveryone: boolean;
  mentions: MessageMentions;

  attatchments: Attachment[];
  embeds?: Embed[];
  reactions?: Collection<string, Reaction>;

  nonce?: string;
  pinned: boolean;

  webhookId?: string;

  type: MessageType;
  isSystemMessage: boolean;

  activity?: Activity;
  application?: ApplicationCache;

  hasParentCrosspost: boolean;
  isCrossPost: boolean;
  parentMessage?: Message<TextChannel>;

  flags?: MessageFlags;

  reply(content: string): Promise<Message<T>>;
}

export interface Channel {
  id: string;
  name: string;
}

export interface TextChannel extends Channel {
  send(content: string): Promise<Message<TextChannel>>;
}

export interface DMChannel extends TextChannel {
  send(content: string): Promise<Message<DMChannel>>;
}

export interface GuildChannel<T extends Guild = Guild> {
  guild: T;
}

export interface VoiceChannel<T extends Guild = Guild> extends GuildChannel<T> {
  members: Collection<string, GuildMember>;
}

export interface Guild {}
export interface User {}
export interface GuildMember {}

export interface Activity {}
export interface Application {}

export interface Role {}

export interface Reaction {}

export interface Embed {}
export interface Attachment {}

export interface MessageMentions {
  roles: Collection<string, Role>;
  users: Collection<string, User>;
  channels: Collection<string, Channel>;
}
