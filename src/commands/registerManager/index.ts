
const RegisterManager = async (newNick: any, clientMessage: any) => {
  try {
    // if (clientMessage.guild.me.permissions.missing("MANAGE_NICKNAMES"))
    //   return clientMessage.reply("Não possuo permissão ;-; ");
    // if (clientMessage.author.id === clientMessage.guild.ownerID)
    //   return clientMessage.reply("I can't change your nickname.");
    await clientMessage.member.setNickname(
      `${newNick[0]} | ${newNick[1]} | ${newNick[2]}`,
      ""
);
  } catch (error) {
    console.error(error);
    clientMessage.reply("Não possuo permissão ;-; ");
  }
};

export default RegisterManager;
