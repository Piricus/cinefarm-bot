const { loadFilmes, saveFilmes } = require('../utils/database');

module.exports = {
  name: 'removerfilme',
  description: 'Remove um filme da lista.',
  options: [{ name: 'nome', type: 3, description: 'Nome do filme', required: true }],

  async execute(interaction) {
    const nome = interaction.options.getString('nome');
    let filmes = loadFilmes();

    if (!filmes.includes(nome)) {
      await interaction.reply({ content: 'Esse filme não está na lista!', ephemeral: true });
      return;
    }

    filmes = filmes.filter(f => f !== nome);
    saveFilmes(filmes);

    await interaction.reply(`🗑️ Filme **${nome}** removido da lista.`);
  },
};
