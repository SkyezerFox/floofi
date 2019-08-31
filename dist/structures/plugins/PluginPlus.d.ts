import { EventEmitter } from "events";
export declare interface Plugin {
    pluginWillLoad: () => void;
    pluginWillInit: () => void;
    pluginWillStop: () => void;
    pluginWillUnload: () => void;
    pluginWillReload: () => void;
}
export declare class Plugin extends EventEmitter {
    readonly name: string;
}
