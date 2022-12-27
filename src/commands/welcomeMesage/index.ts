import { MessageEmbed } from "discord.js";

const WelcomeMessage = (message: any) => {
  console.log(message);
  const embed = new MessageEmbed()
      .setTitle(`Olá, seja bem vindo(a) a familia NVME`)
      .setDescription("A partir de hoje, serei o seu melhor companheiro ^^")
      .addFields(
        {
          name: "Adição de farm",
          value:
            "Para cada adição de farm peço o seguinte\n" +
            "coloque o prefixo:\n" +
            "**n!add** qtd farm\n"+
            "Ex: **n!add qtd farm**\n"+
            "Qualquer problema ou duvida, so entrar em contato com o gerente ou meu criado 💜\n",
          inline: true
        }
      )
      .setColor("#0048BA");
    message.channel.send({ embeds: [embed] });
};

export default WelcomeMessage;