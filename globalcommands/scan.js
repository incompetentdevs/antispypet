    const { SlashCommandBuilder, PermissionFlagsBits, ButtonBuilder, ActionRowBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
    const colors = require('../helpers');
    const axios = require('axios');

    module.exports = {
        data: new SlashCommandBuilder()
            .setName('scan')
            .setDescription('Scans for SpyPet bots')
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
        async execute(interaction, client) {
            if (!interaction.guild) return interaction.reply({ content: 'You can only use this in a guild.' });

            const embed = new EmbedBuilder()
                .setTitle(`Scanning ${await getEmoji('icon_loading')}`)
                .setColor(colors.blend)
                .setDescription('This will take a few seconds.');

            await interaction.reply({ embeds: [embed] });

            axios.get(`https://kickthespy.pet/getBot?id=${interaction.guild.id}`)
                .then(async response => {
                    embed.setTitle(`Scan complete! ${await getEmoji('icon_shield_exclamation3').then(emoji => emoji)}`)
                    embed.setFooter({ text: 'AntiSpyPet will periodically scan and let you know if it finds malicious accounts.' })

                    if (response.data && response.data.id) {
                        embed.setDescription(`<@${response.data.id}>`);
                    } else {
                        return console.log('idfk what happened');
                    }

                    const confirm = new ButtonBuilder()
                        .setCustomId('ban_bots')
                        .setLabel('Remove Bots')
                        .setStyle(ButtonStyle.Primary);

                    const cancel = new ButtonBuilder()
                        .setURL('https://discord.com/oauth2/authorize?client_id=1232410730641362976')
                        .setLabel('Invite AntiSpyPet')
                        .setStyle(ButtonStyle.Link);

                    const row = new ActionRowBuilder()
                        .addComponents(confirm, cancel);

                    interaction.editReply({ embeds: [embed], components: [row] });
                })
                .catch(async error => {
                    if (error.response.data.error === 'Bot not found') {
                        embed.setTitle(`Scan complete! ${await getEmoji('icon_shield_check3').then(emoji => emoji)}`)
                        embed.setDescription('You\'re all clear no bots found here!')

                        const confirm = new ButtonBuilder()
                            .setCustomId('confirm')
                            .setLabel('Remove Bots')
                            .setDisabled(true)
                            .setStyle(ButtonStyle.Primary);

                        const cancel = new ButtonBuilder()
                            .setURL('https://discord.com/oauth2/authorize?client_id=1232410730641362976')
                            .setLabel('Invite AntiSpyPet')
                            .setStyle(ButtonStyle.Link);

                        const row = new ActionRowBuilder()
                            .addComponents(confirm, cancel);

                        return interaction.editReply({ embeds: [embed], components: [row] });
                    }

                    console.error(error);
                });

        },
    };