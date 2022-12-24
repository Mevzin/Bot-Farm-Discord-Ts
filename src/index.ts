import { Client, ClientOptions, Intents } from "discord.js";
import express, { Request, Response } from 'express';
import setActivityBot from "./activities";
import CommandsHandler from "./commands";
import config from "./config.json";
require('dotenv').config()

const app = express();
const token = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.on("ready", () => {
  setActivityBot(client);
  const date = new Date();
  console.log(new Intl.DateTimeFormat('pt-BR').format(date))
});

client.on("messageCreate", (message) => {
  if (message.author.bot || !message.guild) return;
  const parameters = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g) as any;
  const command = parameters.shift().toLowerCase();
  if (!message.content.toLowerCase().startsWith(config.prefix)) return;
  CommandsHandler(command, parameters, message);
});

client.login(token);

app.get('/', (req: Request, res: Response) => {
  return res.send('<h1>Welcome!</h1>').status(200);
})

app.listen(3333, () => console.log("Server On - Port 3333"));