module.exports = {
  name: 'ratemovie',
  description: 'Rate a movie from 1 to 10',
  async execute(interaction) {
    const movieName = interaction.options.getString('name');
    const score = interaction.options.getInteger('score');
    await interaction.reply(`⭐ You rated "${movieName}" with a ${score}/10!`);
  },
};