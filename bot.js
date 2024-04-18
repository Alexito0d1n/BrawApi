const TelegramBot = require('node-telegram-bot-api');
const BrawlStars = require('brawlstars.js');
const token = "6707517310:AAEUBgnRGICrPFbwjRIRmQWdHccIHdFGHME"; // your own Telegram key
const brawlStarsToken = ""; // your own Brawl Stars key
const client = new BrawlStars.Client(brawlStarsToken);
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/perfil (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const terminalSep = '###########################';
    const playerTag = match[1]; // getting player's tag 

    try {
        const player = await client.getPlayer(playerTag);
        
        let response = terminalSep + "\n";
        response += "Tu nombre es: " + player.name + "\n";
        response += "Tu tag es: " + player.tag + "\n";
        response += "Tienes " + player.trophies + " copas ahora mismo\n";
        response += "Tu máximo son " + player.highestTrophies + " copas\n";
        response += "Tu nivel de experiencia es: " + player.expLevel + "\n";
        response += "Pertenece al club " + player.club.name + "\n";
        response += "El TAG del club es " + player.club.tag + "\n";
        response += "Brawlers que tienes: " + player.brawlerCount + "\n";
        response += "Número de gadgets que tienes: " + player.gadgetsCount + "\n";
        response += "Número de estelares que tienes: " + player.starpowersCount + "\n\n";
        response += terminalSep;

        bot.sendMessage(chatId, response);
    } catch (error) {
        bot.sendMessage(chatId, "Error al obtener la información del perfil.");
    }
});

bot.onText(/\/wins (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const terminalSep = '###########################';
  const playerTag = match[1]; 

  try {
      const player = await client.getPlayer(playerTag);
      let response = terminalSep + "\n";
      response += "Victorias en todos los modos: " + player.getWins(BrawlStars.Constants.WIN_TYPE_TOTAL) + "\n";
      response += "Victorias en solo: " + player.getWins(BrawlStars.Constants.WIN_TYPE_SOLO) + "\n";
      response += "Victorias en duo: " + player.getWins(BrawlStars.Constants.WIN_TYPE_DUO) + "\n";
      response += "Victorias en 3v3: " + player.getWins(BrawlStars.Constants.WIN_TYPE_TRIO) + "\n";
      response += terminalSep;

      bot.sendMessage(chatId, response);
  }
  catch (error) {
      bot.sendMessage(chatId, "Error al obtener la información de las victorias.");
  }
});

bot.onText(/\/club (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const terminalSep = '###########################';
  const playerTag = match[1]; 

  try {
      const player = await client.getPlayer(playerTag); 
      const clubTag = player.club.tag; 
      const club = await client.getClub(clubTag); 
      
      
      let response = terminalSep + "\n";
      response += "Club: " + club.name + "\n";
      response += "TAG del club: " + club.tag + "\n";
      response += "Descripción del club: " + club.description + "\n";
      response += "Número de miembros: " + club.memberCount + "\n";
      response += "Número de trofeos del club: " + club.trophies + "\n";
      response += "Requerimientos para unirse al club: " + club.requiredTrophies + "\n\n";

      response += "Miembros del club:\n";
      club.members.forEach(member => {
          response += `${member.name} (${member.tag}) - ${member.trophies} copas / ${member.role}\n`;
      });
      response += terminalSep + "\n";
      response += "Estado del club: " + club.type + "\n";
      response += "Rango del miembro: " + club.getMemberRank(player.tag) + "\n";
      response += "Club lleno: " + club.isFull + "\n";

      bot.sendMessage(chatId, response);
  } catch (error) {
      bot.sendMessage(chatId, "Error al obtener la información del club o del jugador.");
  }
});

bot.onText(/\/brawlers (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const terminalSep = '###########################';
  const playerTag = match[1]; 
  let response = ''; 

  try {
      const player = await client.getPlayer(playerTag); 
      const topBrawlers = player.sortBrawlersByHighestTrophies(); //sort by highest trophies

      response += "Top 5 brawlers con más copas:\n";
      
      for (let i = topBrawlers.length - 1; i >= Math.max(0, topBrawlers.length - 5); i--) {
          const brawler = topBrawlers[i];
          response += `${brawler.name} tiene ${brawler.trophies} copas\n`;
      }

      const topBrawlersByPower = topBrawlers.slice().sort((a, b) => b.power - a.power); // sort by power

      response += "\nTop 5 brawlers con más poder:\n";
      
      for (let i = 0; i < 5; i++) {
          const brawler = topBrawlersByPower[i];
          response += `${brawler.name} tiene ${brawler.power} de poder\n`;
      }

      response += "\nTop 5 brawlers con más rango:\n";
      
      for (let i = topBrawlers.length - 1; i >= Math.max(0, topBrawlers.length - 5); i--) {
          const brawler = topBrawlers[i];
          response += `${brawler.name} tiene ${brawler.rank} de rango\n`;
      }

      // send response
      bot.sendMessage(chatId, response);
  } catch (error) {
      // error
      bot.sendMessage(chatId, "Error al obtener la información de los brawlers." + error);
  }
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const response = "Comandos disponibles:\n\n" +
                   "/perfil [tag] - Obtener información del perfil de un jugador\n" +
                   "/wins [tag] - Obtener información de las victorias de un jugador\n" +
                   "/club [tag] - Obtener información del club de un jugador\n" +
                   "/brawlers [tag] - Obtener información de los brawlers de un jugador\n";

  bot.sendMessage(chatId, response);
});
