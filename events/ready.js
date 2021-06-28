const chalk = require('chalk');
const cat1 = require('moment');
const Discord = require('discord.js');
const catjs = require('../cat.json');

var prefix = catjs.prefix;

module.exports = client => {
var cat = [
"Cat Badge Bot",
"Developed by cat#4321"
    ];
                                              
    setInterval(function() {

        var random = Math.floor(Math.random()*(cat.length-0+1)+0);
      
        client.user.setActivity(cat[random], "cat" );
        }, 2 * 2500);
    
  console.log(`[${cat1().format('YYYY-MM-DD HH:mm:ss')}] BOT: Active, Commands loaded!`);
  console.log(`[${cat1().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} logined with bot name!`);
  client.user.setStatus("invisible");
  console.log(`[${cat1().format('YYYY-MM-DD HH:mm:ss')}] BOT: Game name set!`);
};