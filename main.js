const BrawlStars = require('brawlstars.js');
const Brawlers = require('brawlstars.js/lib/Brawlers');
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImRkOTg1NWIwLTA3YmYtNDhkMi05ZDBmLWRhMzE5YzdlNTIyZiIsImlhdCI6MTcxMzI3NTQ4NCwic3ViIjoiZGV2ZWxvcGVyLzQwZDIwMTQ0LTE4MGItZDdjOC04Y2E0LWYzMjU2YTEyMzVmYiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTcyLjE2Ni4xOTUuMTI4Il0sInR5cGUiOiJjbGllbnQifV19.VkImKK_Tetx_toaNv8re8NeIx0PR0f478cyxatxC3nMK9Ee2mBaJpX1ik0r2wyCCCpoj49l7KV2bQ4AVhBaUWQ"; // Reemplaza con tu propio token de autenticación
const client = new BrawlStars.Client(token);

;(async function () {
  const terminalSep = '###########################'
  const player = await client.getPlayer('#G9GUVJRC') // get player by #ID

  console.log(terminalSep)
//--------------PLAYER----------------
  console.log("Tu nombre es: "+player.name) 
  console.log("Tu tag es: "+player.tag) 
  console.log("Tienes ", player.trophies, " copas ahora mismo")
  console.log("Tu maximo son ", player.highestTrophies, " copas")
  console.log("Tu nivel de experiencia es: "+ player.expLevel)
  //console.log(player.brawlers)
  console.log("Pertenece al club ",player.club.name)
  console.log("El TAG del club es ",player.club.tag)
  //console.log(player.hexColor) // player's nameColor in hex format
  console.log("brawlers que tienes: " + player.brawlerCount) // 27
  //console.log("Victorias en 3v3: " +BrawlStars.Constants.WIN_TYPE_TRIO)
  console.log("Victorias en todos los modos: " + player.getWins(BrawlStars.Constants.WIN_TYPE_TOTAL)); //333
    console.log("Victorias en solo: " + player.getWins(BrawlStars.Constants.WIN_TYPE_SOLO)); 
    console.log("Victorias en duo: " + player.getWins(BrawlStars.Constants.WIN_TYPE_DUO)); 
    console.log("Victorias en 3v3: " + player.getWins(BrawlStars.Constants.WIN_TYPE_TRIO)); 
  console.log("Numero de gadgets que tiene: " + player.gadgetsCount) //6
  console.log("Numero de estelares que tiene: "+ player.starpowersCount) //5


 /// Obtener información de los 5 primeros brawlers con más copas
 const topBrawlers = player.sortBrawlersByHighestTrophies();

 console.log(terminalSep);
 console.log("Top 5 brawlers con más copas:");
 
 // Recorrer el array al revés para mostrar los 5 primeros brawlers con más copas
 for (let i = topBrawlers.length - 1; i >= topBrawlers.length - 5; i--) {
     const brawler = topBrawlers[i];
     console.log(`${brawler.name} tiene ${brawler.trophies} copas`);
 }
 console.log(terminalSep);
 console.log("Top 5 brawlers con más poder:");
 
 // Ordenar el array por poder
 const topBrawlersByPower = topBrawlers.slice().sort((a, b) => b.power - a.power);
 
 // Recorrer el array al revés para mostrar los 5 primeros brawlers con más poder
 for (let i = 0; i < 5; i++) {
     const brawler = topBrawlersByPower[i];
     console.log(`${brawler.name} tiene ${brawler.power} de poder`);
 }
 console.log(terminalSep);
 
 // Recorrer el array al revés para mostrar los 5 primeros brawlers con más rango
 for (let i = topBrawlers.length - 1; i >= topBrawlers.length - 5; i--) {
     const brawler = topBrawlers[i];
     console.log(`${brawler.name} tiene ${brawler.rank} de rango`);
 }
 
  
  // Club
  if (player.club) {
    const club = await client.getClub(player.club.tag) // get club by #ID
    console.log(terminalSep)
    console.log("Club: " + club.name) 
    console.log("TAG del club: " + club.tag)
    console.log("Descripcion del club: " + club.description)
    console.log("Numero de miembros: " + club.memberCount) 
    console.log("Numero de trofeos del club: " + club.trophies)
    console.log("Requerimientos para unirse al club: " + club.requiredTrophies)
    //lista todos los miembros del club con su name, tag y trophies
// Obtener información de los miembros del club
// Obtener información de los miembros del club
// Obtener información de los miembros del club
const members = club.members.map(member => `${member.name} (${member.tag}) - ${member.trophies} copas / ${member.role}`);

console.log(terminalSep);
console.log("Miembros del club:");

// Imprimir cada miembro del club en líneas separadas con salto de línea
for (let i = 0; i < members.length; i++) {
    console.log(members[i] + ",");
    if (i < members.length - 1) {
        console.log(); // Agregar un salto de línea después de cada miembro, excepto el último
    }
}
    console.log(terminalSep)
    console.log("Estado del club: " + club.type) // open
    console.log(club.getMemberRank(player.tag)) // 7
    console.log(club.getMemberRole(player.tag)) // member
    console.log(club.isFull) // false
  }

  // Brawlers
 /* const brawlers = await client.getBrawlers() // get brawlers
  console.log(terminalSep)
  console.log(brawlers.count) // 32
  console.log(brawlers.getBrawlersNames()) // list of brawler names
  console.log(brawlers.getBrawlerStarPowersByName('FRANK')) // list of 'FRANK' starpowers
  console.log(brawlers.getBrawlersStarPowers())
  
  // Event rotation
  const events = await client.getEventRotation()
  console.log(terminalSep)
  console.log(events)*/
})() 
