import * as floofi from "../src";
import { test } from "./plugin";

const bot = new floofi.Client({
	debug: "verbose",
}).pluginManager.add(test);

bot.login("NDI5NjMxNjI1ODQwNjg5MTUy.XURtjw.FoN1Br9f89Unt7VenSWwuija7ic");
