import icon28000175 from './assets/playerIcon/28000175.webp';
import defaultIcon from './assets/playerIcon/monito.png'; // Importa la imagen por defecto

import trophies from './assets/multimedia/trophies.png';

//icons from events or game modes
import solo from './assets/multimedia/solo.png';
import duo from './assets/multimedia/duo.png';
import balon from './assets/multimedia/Brawlball.png';

const playerIcons = {
  // Lista de IDs y rutas a los iconos
  28000175: icon28000175,
  // Agrega más iconos según sea necesario
};

export const playerIcon = (id) => {
  // Retorna el icono correspondiente al ID o un icono por defecto si no existe
  return playerIcons[id] || defaultIcon;
};
export {trophies, solo, duo, balon}; // Exporta los íconos de trofeos y los íconos de eventos
