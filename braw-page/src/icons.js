import icon28000175 from './assets/playerIcon/28000175.webp';
import icon28000248 from './assets/playerIcon/28000248.webp';
import icon28000000 from './assets/playerIcon/28000000.webp';
import icon28000049 from './assets/playerIcon/28000049.webp';
import icon28000036 from './assets/playerIcon/28000036.webp';
import icon28000044 from './assets/playerIcon/28000044.webp';
import icon28000041 from './assets/playerIcon/28000041.webp';
import icon28000038 from './assets/playerIcon/28000038.webp';
import icon28000043 from './assets/playerIcon/28000043.webp';
import icon28000206 from './assets/playerIcon/28000206.webp';
import icon28000290 from './assets/playerIcon/28000290.webp';
import icon28000452 from './assets/playerIcon/28000452.webp';
import icon28000404 from './assets/playerIcon/28000404.webp';
import icon28000221 from './assets/playerIcon/28000221.webp';

import defaultIcon from './assets/playerIcon/monito.png'; 

import trophies from './assets/multimedia/trophies.png';
import solo from './assets/multimedia/solo.png';
import duo from './assets/multimedia/duo.png';
import balon from './assets/multimedia/brawlball.png';


const playerIcons = {
  28000000: icon28000000,
  28000036: icon28000036,
  28000038: icon28000038,
  28000041: icon28000041,
  28000043: icon28000043,
  28000044: icon28000044,
  28000049: icon28000049,
  28000175: icon28000175,
  28000206: icon28000206,
  28000221: icon28000221,
  28000248: icon28000248,
  28000290: icon28000290,
  28000404: icon28000404,
  28000452: icon28000452,
};

export const playerIcon = (id) => {
  return playerIcons[id] || defaultIcon;
};

export { trophies, solo, duo, balon };
