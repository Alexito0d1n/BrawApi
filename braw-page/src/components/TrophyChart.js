import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrophyChart = ({ playerTag, initialTrophies }) => {
  const [battleData, setBattleData] = useState([]);
  const [error, setError] = useState(null);
  const [trophyRange, setTrophyRange] = useState([initialTrophies - 200, initialTrophies + 200]);

  useEffect(() => {
    const fetchBattleLog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/player/${encodeURIComponent(playerTag)}/battlelog`);
        const data = await response.json();

        if (response.ok) {
          const processedData = [];
          let currentTrophies = initialTrophies;

          // Iterate forward from the earliest game
          for (let i = 0; i < data.items.length; i++) {
            const battle = data.items[i];
            const trophyChange = battle.battle.trophyChange !== undefined ? battle.battle.trophyChange : 0;
            currentTrophies -= trophyChange;

            processedData.push({
              name: `Game ${i + 1}`,
              trophies: currentTrophies,
              trophyChange: trophyChange,
            });
          }

          // Reverse the processed data to show the latest game first
          processedData.reverse();

          console.log(processedData); // Logging the data to the console for debugging

          setBattleData(processedData);

          // Update the trophy range based on the new data
          const minTrophies = Math.min(...processedData.map(item => item.trophies));
          const maxTrophies = Math.max(...processedData.map(item => item.trophies));
          setTrophyRange([Math.max(minTrophies - 200, 0), maxTrophies + 200]);
        } else {
          throw new Error(data.error || 'Error fetching battle log');
        }
      } catch (err) {
        setError(err.message);
      }
    }; 

    fetchBattleLog();
  }, [playerTag, initialTrophies]);

  return (
    <div className="trophy-chart">
      <h2>Trophy Fluctuation</h2>
      {error && <p className="error">{error}</p>}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={battleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={trophyRange} />
          <Tooltip />
          <Line type="monotone" dataKey="trophies" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart> 
      </ResponsiveContainer>
   
    </div>
  );
};

export default TrophyChart;
