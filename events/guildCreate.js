const { Events, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const colors = require('../helpers');
const axios = require('axios');

module.exports = {
    name: Events.GuildCreate,
    async execute(guild) {
        const confirm = new ButtonBuilder()
            .setURL('https://discord.gg/aauJvVHPnq')
            .setLabel('Support Server')
            .setStyle(ButtonStyle.Link);

        const cancel = new ButtonBuilder()
            .setURL('https://discord.com/oauth2/authorize?client_id=1232410730641362976')
            .setLabel('Invite AntiSpyPet')
            .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder()
            .addComponents(confirm, cancel);

        const embed = new EmbedBuilder()
            .setTitle('Thanks for inviting AntiSpyPet')
            .setColor(colors.blend)
            .setDescription('I\'ll periodically scan your server for malicious scraping accounts but you can run a manual check using /scan');

        const c = guild.systemChannel;

        if (!c) return;

        c.send({ embeds: [embed], components: [row] });

    },
};
