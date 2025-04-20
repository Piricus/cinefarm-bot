const { loadFilmes } = require('../utils/database');

module.exports = {
  name: 'lista',
  description: 'Mostra todos os filmes na lista.',

  async execute(interaction) {
    const filmes = loadFilmes();

    if (filmes.length === 0) {
      await interaction.reply('📭 Nenhum filme foi adicionado ainda.');
    } else {
      await interaction.reply('🎬 Lista de filmes:
' + filmes.map((f, i) => `${i + 1}. ${f}`).join('\n'));
    }
  },
};
