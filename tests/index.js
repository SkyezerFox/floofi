const floofi = require("..");

const bot = new floofi.Client({ debug: "debug" });

bot.useProvider(floofi.Providers.MemoryProvider);

bot.add(
	new floofi.Command("owo", "hewwo:string", 0, (c, m, a) => {
		m.reply(a);
	})
);

bot.login(require("./token"));
