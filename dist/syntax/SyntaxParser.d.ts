import { Channel, GuildMember, Message, PartialGuild, Role, TextChannel, User } from "discord.js";
import { FloofiClient } from "../FloofiClient";
import { SyntaxType } from "./SyntaxType";
export declare type ParseableType = boolean | number | string | Channel | GuildMember | PartialGuild | Role | TextChannel | User;
export declare type ReturnableType = ParseableType | ParseableType[];
export declare type ExtractParseableType<T extends ReturnableType> = T extends ParseableType[] ? ParseableType[][number] : T;
export declare type ParseableTypeRepresentation = "boolean" | "number" | "string" | "channel" | "guild" | "member" | "role" | "user";
/**
 * Class for dealing with syntax parsing
 */
export declare class SyntaxParser<T extends ReturnableType[]> {
    syntax: Array<SyntaxType<ExtractParseableType<T[number]>>>;
    flags: any[];
    multiSyntax: boolean;
    private _syntax;
    private _flags;
    constructor(syntax: string | string[]);
    /**
     * Add a syntax variant to the parser.
     * @param syntax Syntax to add
     */
    addSyntax(syntax: string): this;
    /**
     * Remove a syntax variant from the parser.
     * @param index Index of the variant
     */
    removeSyntax(index: number): this;
    /**
     * Add a flag to the syntax parser.
     * @param flagName Name of the flag, and possible aliases
     * @param syntax Syntax parsing to perform on the flag
     */
    addFlag(flagName: string | string[], syntax: string): this;
    /**
     * Remove a flag from the parser.
     * @param flagName Name or alias of the flag
     */
    removeFlag(flagName: string): this;
    /**
     * Parses message content into valid values
     */
    parse(client: FloofiClient, message: Message, args: string[]): T;
    /**
     * Refreshes the syntax types by checking if they have been updated.
     */
    private refresh;
    /**
     * Creates a syntax type from a string.
     * @param s String representation of the type
     */
    private createType;
    /**
     * Creates a syntax flag from a string
     * @param f String representation of the flag
     */
    private createFlag;
}
