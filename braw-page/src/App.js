// src/App.js
import React, { useState } from 'react';
import './App.css';
import PlayerInfo from './components/PlayerInfo';
import TrophyChart from './components/TrophyChart';

function App() {
    const [playerData, setPlayerData] = useState(null);
    const [playerTag, setPlayerTag] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const playerTag = event.target.elements.playerTag.value.trim();

        try {
            const response = await fetch(`http://localhost:5000/api/player/${encodeURIComponent(playerTag)}`);
            const data = await response.json();

            if (response.ok) {
                setPlayerData(data);
                setPlayerTag(playerTag); // Save the player tag for battle log request
                setError(null);
            } else {
                throw new Error(data.error || 'Error fetching data');
            }
        } catch (err) {
            setError(err.message);
            setPlayerData(null);
            setPlayerTag(''); // Reset the player tag if there's an error
        }
    };

    return (
        <div className="App">
            <h1>Brawl Stars Player Search</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="playerTag" placeholder="Enter player tag" required />
                <button type="submit">Search</button>
            </form>
            {error && <p className="error">{error}</p>}
            {playerData && <PlayerInfo player={playerData} />}
            {playerData && playerData.trophies !== undefined && (
                <TrophyChart playerTag={playerTag} initialTrophies={playerData.trophies} />
            )}
        </div>
    );
}

export default App;
