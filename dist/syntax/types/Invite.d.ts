import { Invite, Message } from "discord.js";
import { FloofiClient } from "../../FloofiClient";
import { SyntaxType } from "../SyntaxType";
/**
 * Syntax type used to effectively disable syntax parsing.
 */
export declare class InviteType extends SyntaxType<Invite> {
    static typeName: string;
    parse(client: FloofiClient, message: Message, arg: string, index: number): Promise<Invite>;
}
