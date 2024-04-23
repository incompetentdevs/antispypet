global.dbready = false;

require('dotenv').config();
const chalk = require('chalk');
require('./helpers');
const fs = require('fs');
const mongoose = require('mongoose');
const { Client, GatewayIntentBits, Partials, Events } = require('discord.js');
const path = require('node:path');
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
	],
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember],
});

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		global.dbready = true;
		console.log(chalk.greenBright('CONNECTED'), 'Connected to database!');
	})
	.catch((err) => {
		console.log(err);
	});


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => {
	return file.endsWith('.js') && !file.startsWith('--');
});


for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	let events = require(filePath);
	// check if events module exports a single object and convert it to array.
	if (!Array.isArray(events)) {
		events = [events];
	}
	for (const event of events) {
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client));
		} else {
			client.on(event.name, (...args) => event.execute(...args, client));
		}
	}
}

client.login(process.env.TOKEN);

client.on('rateLimit', function (rateLimitData) {
	console.log('the rate limit has been hit!  Slow\'r down a tad.');
	console.log({ rateLimitData });
});

client.on(Events.ClientReady, function (client) {
	global.currentClient = client;
});