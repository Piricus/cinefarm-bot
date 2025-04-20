module.exports = {
  name: 'ajuda',
  description: 'Mostra todos os comandos do bot.',
  async execute(interaction) {
    await interaction.reply(`
🎬 **Comandos disponíveis:**
- \`/adicionarfilme [nome]\` — adiciona um filme à lista
- \`/removerfilme [nome]\` — remove um filme da lista
- \`/lista\` — mostra os filmes salvos
- \`/sorteio\` — sorteia um filme entre os indicados
- \`/imdb\` — mostra o ranking IMDB CineFarm
- \`/ajuda\` — mostra esta lista de comandos
    `);
  },
};
