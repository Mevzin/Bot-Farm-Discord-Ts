import { Client, ClientOptions, Intents } from "discord.js";
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

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected!");
    app.listen(3333, () => console.log("Server On - Port 3333"));
    client.login(token);
  })
  .catch((err) => console.log("Error: ", err));

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.on("ready", () => {
  setActivityBot(client);
});

client.on("messageCreate", (message) => {
  if (message.author.bot || !message.guild) return;
  const parameters = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g) as any;
  const command = parameters.shift().toLowerCase();
  if (!message.content.toLowerCase().startsWith(config.prefix)) return;
  CommandsHandler(command, parameters);
});

app.get("/", (req: Request, res: Response) => {
  return res.send("<h1>Welcome!</h1>");
});
