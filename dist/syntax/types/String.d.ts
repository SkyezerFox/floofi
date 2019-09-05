import { Message } from "discord.js";
import { FloofiClient } from "../../FloofiClient";
import { SyntaxType } from "../SyntaxType";
export declare class StringType extends SyntaxType<string> {
    static typeName: string;
    parse(client: FloofiClient, message: Message, arg: string, index: number): string;
}
