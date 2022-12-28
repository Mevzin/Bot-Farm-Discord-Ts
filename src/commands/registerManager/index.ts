import { PermissionsBitField } from "discord.js"

const RegisterManager = async (newNick: any, clientMessage: any) => {
  if (clientMessage.mentions.members.first() == undefined){
    return clientMessage.reply(
      "Mencione voce mesmo para poder alterar seu nome!"
    );
  } 
  const user = clientMessage.mentions.members.first();
  try {
    if (!clientMessage.member.permissions.has("MANAGE_NICKNAMES"))
      return clientMessage.reply("Não possuo permissão ;-; ");
    if (clientMessage.author.id === clientMessage.guild.ownerID)
      return clientMessage.reply("Não posso mudar este nick!");
    if (newNick[3] == undefined) {
      await user.setNickname(``, "");
      clientMessage.reply("Nick restaurado para o padrão!");
    } else {
      await user.setNickname(
        `${newNick[1]} | ${newNick[2]} | ${newNick[3]}`,
        ""
      );
      clientMessage.reply(
        `Nick alterado para ${newNick[1]} | ${newNick[2]} | ${newNick[3]}`
      );
    }
  } catch (error) {
    console.error(error);
    clientMessage.reply("Não possuo permissão ;-; err");
  }
};

export default RegisterManager;
