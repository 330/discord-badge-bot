const Discord = require("discord.js");
const client = new Discord.Client();
const catjs = require("./cat.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr");
const chalk = require("chalk");
require("./util/eventLoader")(client);
const express = require("express");
const http = require("http");

var prefix = catjs.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./cmds/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} command will load.`);
  files.forEach(f => {
    let props = require(`./cmds/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./cmds/${command}`)];
      let cmd = require(`./cmds/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./cmds/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./cmds/${command}`)];
      let cmd = require(`./cmds/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


client.on("ready", async () => {
  setInterval(() => {
    client.guilds.cache.forEach(sunucu => {
      if (!sunucu.id === "GUILD ID") return;
      sunucu.members.cache
        .filter(e => !e.user.bot && e.user.flags)
        .map(cat => {
          let flags = cat.user.flags.toArray();
          if (flags.includes("HOUSE_BRAVERY")) {
            if (cat.roles.cache.has("ROLE ID")) { //Role id HypeSquad Balance
              cat.roles.remove("ROLE ID");  //Role id HypeSquad Balance
            }
            if (cat.roles.cache.has("ROLE ID")) {  //Role id HypeSquad Brilliance
              cat.roles.remove("ROLE ID"); //Role id HypeSquad Brilliance
            }
            if (!cat.roles.cache.has("ROLE ID")) { //Role id HypeSquad Bravery house
              cat.roles.add("ROLE ID"); //Role id HypeSquad Bravery house
            }
         } 

          if (flags.includes("HOUSE_BRILLIANCE")) {
            if (cat.roles.cache.has("ROLE ID")) { //Role id HypeSquad Balance
              cat.roles.remove("ROLE ID"); //Role id HypeSquad Balance
            }
            if (cat.roles.cache.has("ROLE ID")) { //Role id HypeSquad Bravery
              cat.roles.remove("ROLE ID"); //Role id HypeSquad Bravery
            }
            if (!cat.roles.cache.has("ROLE ID")) { //Role idHypeSquad Brilliance house
              cat.roles.add("ROLE ID"); //Role id HypeSquad Brilliance house
            }
          }

          if (flags.includes("HOUSE_BALANCE")) {
            if (cat.roles.cache.has("ROLE ID")) { //Role id HypeSquad Brilliance
              cat.roles.remove("ROLE ID"); //Role id HypeSquad Brilliance
            } 
            if (cat.roles.cache.has("ROLE ID")) { ///Role id HypeSquad Bravery
              cat.roles.remove("ROLE ID"); ///Role id HypeSquad Bravery
            }
            if (!cat.roles.cache.has("ROLE ID")) { //Role id HypeSquad Balance house
              cat.roles.add("ROLE ID"); //Role id HypeSquad Balance house
            }
          }

          if (!flags.includes("HOUSE_BALANCE")) {
            if (cat.roles.cache.has("ROLE ID")) { //Role id HypeSquad Balance
              cat.roles.remove("ROLE ID"); //Role id HypeSquad Balance
            }
          }

          if (!flags.includes("HOUSE_BRILLIANCE")) {
            if (cat.roles.cache.has("ROLE ID")) { //Role id HypeSquad Brilliance
              cat.roles.remove("ROLE ID"); //Role id HypeSquad Brilliance
            }
          }

          if (!flags.includes("HOUSE_BRAVERY")) {
            if (cat.roles.cache.has("ROLE ID")) { //Role id HypeSquad Bravery
              cat.roles.remove("ROLE ID"); //Role id HypeSquad Bravery
            }
          }

          if (!flags.includes("EARLY_SUPPORTER")) {
            if (cat.roles.cache.has("ROLE ID")) { //Role id if user have Early Supportter Badge
             cat.roles.remove("ROLE ID"); //Role id if user have Early Supportter Badge
            }
          }
          if (flags.includes("EARLY_SUPPORTER")) {
            if (!cat.roles.cache.has("ROLE ID")) { //Role id if user have Early Supportter Badge
              cat.roles.add("ROLE ID"); //Role id if user have Early Supportter Badge
            }
          }

          if (!flags.includes("EARLY_VERIFIED_DEVELOPER")) { 
            if (cat.roles.cache.has("ROLE ID")) { //Role id if user have Early Verified Bot Developer Badge
              cat.roles.remove("ROLE ID"); //Role id if user have Early Verified Bot Developer Badge
            }
          }
          if (flags.includes("EARLY_VERIFIED_DEVELOPER")) {
            if (!cat.roles.cache.has("ROLE ID")) { //Role id if user have Early Verified Bot Developer Badge
              cat.roles.add("ROLE ID"); //Role id if user have Early Verified Bot Developer Badge
            }
          }

          if (!flags.includes("PARTNERED_SERVER_OWNER")) {
            if (cat.roles.cache.has("ROLE ID")) { //Role id if user have Partner Badge
              cat.roles.remove("ROLE ID"); //Role id if user have Partner Badge
            }
          }
          if (flags.includes("PARTNERED_SERVER_OWNER")) {
            if (!cat.roles.cache.has("ROLE ID")) { //Role id if user have Partner Badge
              cat.roles.add("ROLE ID"); //Role id if user have Partner Badge
            }
          }

          if (!flags.includes("BUGHUNTER_LEVEL_1")) {
            if (cat.roles.cache.has("ROLE ID")) { //Role id if user have LVL1 Bug Hnter Badge
              cat.roles.remove("ROLE ID"); //Role id if user have LVL1 Bug Hnter Badge
            }
          }
          if (flags.includes("BUGHUNTER_LEVEL_1")) {
            if (!cat.roles.cache.has("ROLE ID")) { //Role id if user have LVL1 Bug Hnter Badge
              cat.roles.add("ROLE ID"); //Role id if user have LVL1 Bug Hnter Badge
            }
          }

          if (!flags.includes("BUGHUNTER_LEVEL_2")) {
            if (cat.roles.cache.has("ROLE ID")) { //Role id if user have LVL2 Bug Hnter Badge
              cat.roles.remove("ROLE ID"); //Role id if user have LVL2 Bug Hnter Badge
            } 
          }
          if (flags.includes("BUGHUNTER_LEVEL_2")) {
            if (!cat.roles.cache.has("ROLE ID")) { //Role id if user have LVL2 Bug Hnter Badge
              cat.roles.add("ROLE ID"); //Role id if user have LVL2 Bug Hnter Badge
            }
          }
          if (!flags.includes("HYPESQUAD_EVENTS")) {
            if (cat.roles.cache.has("ROLE ID")) { //Role id if user have HS Events Badge
              cat.roles.remove("ROLE ID"); //Role id if user have HS Events Badge
            }
          }

          if (flags.includes("HYPESQUAD_EVENTS")) {
            if (!cat.roles.cache.has("ROLE ID")) { //Role id if user have HS Events Badge
              cat.roles.add("ROLE ID"); //Role id if user have HS Events Badge
            }
          }
        });
    });
  }, 3000);
});
////////
client.login(catjs.token);
