import { EventEmitter } from "events";
import { Client, Util } from "../..";
export declare interface MediaPlayer extends EventEmitter {
    on(eventName: string, listener: Util.TSUtil.Listener<any>): this;
}
interface Track {
    name: string;
    duration: number;
    type: "yt" | "sc";
}
export declare class MediaPlayer extends EventEmitter {
    client: Client;
    queue: Track[];
    constructor(client: Client);
    init(): Promise<void>;
}
export {};
