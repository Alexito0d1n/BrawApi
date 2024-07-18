import React, { useState } from 'react';
import './App.css';
import PlayerInfo from './components/PlayerInfo';
import TrophyChart from './components/TrophyChart';
import ClubMembers from './components/ClubMembers';

function App() {
    const [playerData, setPlayerData] = useState(null);
    const [playerTag, setPlayerTag] = useState('');
    const [clubData, setClubData] = useState(null);
    const [error, setError] = useState(null);

    const fetchPlayerData = async (playerTag) => {
        try {
            const response = await fetch(`http://localhost:5000/api/player/${encodeURIComponent(playerTag)}`);
            const data = await response.json();

            if (response.ok) {
                setPlayerData(data);
                setPlayerTag(playerTag); // Save the player tag for battle log request
                setError(null);

                // Fetch club data
                if (data.club && data.club.tag) {
                    const clubTag = data.club.tag.slice(1); // Remove the '#' from the tag
                    const clubResponse = await fetch(`http://localhost:5000/api/club/${encodeURIComponent(clubTag)}`);
                    const clubData = await clubResponse.json();

                    if (clubResponse.ok) {
                        setClubData(clubData);
                    } else {
                        throw new Error(clubData.error || 'Error fetching club data');
                    }
                } else {
                    setClubData(null); // Reset club data if player is not in a club
                }
            } else {
                throw new Error(data.error || 'Error fetching player data');
            }
        } catch (err) {
            setError(err.message);
            setPlayerData(null);
            setPlayerTag(''); // Reset the player tag if there's an error
            setClubData(null); // Reset club data if there's an error
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const playerTag = event.target.elements.playerTag.value.trim();
        await fetchPlayerData(playerTag);
    };

    const handleMemberClick = async (memberTag) => {
        await fetchPlayerData(memberTag.slice(1)); // Remove the '#' from the tag
    };

    return (
        <div className="App">
            <h1>Brawl Stars Player Search</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="playerTag" placeholder="Enter player tag" required />
                    <button type="submit">Search</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>

            <div className='main-content'>
                <div className='left-column'>
                    {playerData && (
                        <div className='component'>
                            <PlayerInfo player={playerData} />
                            {playerData.trophies !== undefined && (
                                <TrophyChart playerTag={playerTag} initialTrophies={playerData.trophies} />
                            )}
                        </div>
                    )}
                </div>
                <div className='right-column'>
                    {clubData && <ClubMembers clubData={clubData} onMemberClick={handleMemberClick} />}
                </div>
            </div>
        </div>
    );
}

export default App;
