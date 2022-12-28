import { ActivityType, Client } from "discord.js";
import config from "./../config.json";


const setActivityBot = (client: Client) => {
  let i = 0;
  const status = [
    `Use ${config.prefix}help para ver os comandos!`,
    `${client.channels.cache.size} canais`,
  ];
  client.user?.setStatus("online");
  setInterval(
    () =>
      client.user?.setActivity(`${status[i++ % status.length]}`, {
        type:  ActivityType.Watching,
      }),
    5000
  );
};

export default setActivityBot;
