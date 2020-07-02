import { Message, TextChannel } from "discord.js";
import { FloofiClient } from "../../FloofiClient";
import { SyntaxType } from "../SyntaxType";
/**
 * Syntax type used to effectively disable syntax parsing.
 */
export declare class ChannelType extends SyntaxType<TextChannel> {
    static typeName: string;
    parse(client: FloofiClient, message: Message, arg: string, index: number): TextChannel;
}
