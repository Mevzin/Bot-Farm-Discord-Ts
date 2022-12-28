import { Client, ClientOptions, GatewayIntentBits  } from "discord.js";
import express, { Request, Response } from "express";
import setActivityBot from "./activities";
import CommandsHandler from "./commands";
import mongoose from "mongoose";
import config from "./config.json";
require("dotenv").config();

const app = express();
const token = process.env.DISCORD_TOKEN;
const dbUser = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASS;
const dbUrl =`mongodb+srv://${dbUser}:${dbPassword}@apicluster.rwbzk.mongodb.net/?retryWrites=true&w=majority`;


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.AutoModerationConfiguration,
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


app.get('/', (req: Request, res: Response) => {
  return res.send('<h1>Welcome!</h1>').status(200);
})

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected mongo db!");
    app.listen(3000, () => console.log("Server On - Port 3333"));
    client.login(token);
  })
  .catch((err) => console.log("Error: ", err));
