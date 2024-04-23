// add a refresh every 30 min [ADD]
// usage: getEmoji('name');
// example 2: ${await getEmoji('Twitter')}

const { emojiGuilds } = require('../config.json');

const emojiDatabase = [];

global.getEmojiObject = async function(emojiname) {
    try {
        const searchEmoji = emojiDatabase.find(emoji => emoji.name == emojiname);

        if (!searchEmoji) return;

        return searchEmoji;
    } catch (error) {
        console.error(`error on getEmoji global: ${error}`);
        return;
    }
}

global.getEmoji = async function(emojiname) {
    try {
        const searchEmoji = emojiDatabase.find(emoji => emoji.name == emojiname);

        if (!searchEmoji) return '❌';

        return searchEmoji.toString();
    } catch (error) {
        console.error(`error on getEmoji global: ${error}`);
        return '❌';
    }
}

global.getEmojiId = async function(emojiname) {
    try {
        const searchEmoji = emojiDatabase.find(emoji => emoji.name == emojiname);

        if (!searchEmoji) return;

        return searchEmoji.id;
    } catch (error) {
        console.error(`error on getEmoji global: ${error}`);
        return;
    }
}

module.exports = {
	name: 'ready',
	async execute(client) {
        emojiGuilds.forEach(async guild => {
            try {
                const g = await client.guilds.fetch(guild);

                g.emojis.cache.forEach((emoji => {
                    emojiDatabase.push(emoji)
                }));
            } catch (error) {
                console.error(`emoji guild ${guild} causing error: ${error}`);
            }
        });
	},
};