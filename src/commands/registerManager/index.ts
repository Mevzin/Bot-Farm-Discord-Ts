import { PermissionsBitField, Permissions  } from "discord.js";

const categoryID = "1052756154821902377";

const RegisterManager = async (newNick: any, clientMessage: any) => {
  if (clientMessage.mentions.members.first() == undefined) {
    return clientMessage.reply(
      "Mencione um membro para pode efetuar o registro"
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
      try {
        const channel = clientMessage.guild.channels
          .create({
            name: `📂 ${newNick[1]} ${newNick[2]} ${newNick[3]}`,
            type: 0
          })
          .then((channel: any) => {
            const categoryID = "1052756154821902377";
            channel.setParent(categoryID)
            channel.permissionOverwrites.set([
              {
                id: clientMessage.guild.id,
                deny: [PermissionsBitField.Flags.ViewChannel],
              },
              {
                id: user.user.id,
                allow: [PermissionsBitField.Flags.ViewChannel],
              },
            ]);
          })
          .catch((err: Error) => console.log(err));
      } catch (error) {
        console.error(error);
      }
      clientMessage.reply(
        `Nick alterado para ${newNick[1]} | ${newNick[2]} | ${newNick[3]}`
      );
    }
  } catch (error) {
    console.error(error);
    clientMessage.reply("Você não possui permissão para isso!");
  }
};

export default RegisterManager;
