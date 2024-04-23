const { Events, EmbedBuilder } = require("discord.js");
const colors = require('../helpers')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, client) {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'ban_bots') {
            const embed = new EmbedBuilder()
                .setTitle(`This feature isn\'t finished baking yet  ${await getEmoji('icon_xmark')}`)
                .setColor(colors.blend)
                .setDescription('Don\'t worry you can still ban those pesky bots manually!');
            
            interaction.reply({ embeds: [embed], ephemeral: true });
        }
	},
};