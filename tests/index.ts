import * as floofi from "../";
import { token } from "./token";

const bot = new floofi.Client({ debug: "debug" });

bot.useProvider(floofi.Providers.MemoryProvider);

bot.add(
	new floofi.Command<[string[]]>("owo", "hewwo:string...", 0, (c, m, a) => {
		c.logger.info("owo");
		m.reply(a[0].join(" "));
	}),
);

bot.login(token);
