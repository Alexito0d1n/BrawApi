import React from 'react';

import { playerIcon, trophies, solo, duo, balon } from '../icons';
import '../styles/PlayerInfo.css'; 
const PlayerInfo = ({ player }) => {
    const iconStyle = {
        width: '40px', // Ajusta el tamaño según sea necesario
        height: '40px', // Ajusta el tamaño según sea necesario
    };

    const trophyStyle = {
        width: '20px', // Ajusta el tamaño según sea necesario
        height: '20px', // Ajusta el tamaño según sea necesario
    };

    return (
        <div className="player-info">
            <h2>Player Info:</h2>
            <p className="player-text">Name: {player.name} <img src={playerIcon(player.icon.id)} alt="Player Icon" style={iconStyle} /> "{player.icon.id}"</p>
            <p className="player-text">Tag: {player.tag}</p>
            <p className="player-text">Trophies: <img src={trophies} alt="Trophy Icon" style={trophyStyle} /> {player.trophies}</p>
            <p className="player-text">Highest Trophies: <img src={trophies} alt="Trophy Icon" style={trophyStyle} /> {player.highestTrophies}</p>
            <p className="player-text">Victorias en solitario: <img src={solo} alt="Wins solo" style={trophyStyle} /> {player.soloVictories}</p>
            <p className="player-text">Victorias en duo: <img src={duo} alt="Wins duo" style={trophyStyle} /> {player.duoVictories}</p>
            <p className="player-text">Victorias en 3vs3: <img src={balon} alt="Wins duo" style={trophyStyle} /> {player['3vs3Victories']}</p>

        
        
        </div>
    );
};

export default PlayerInfo;
