import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';
import { modeIcons } from '../assets/multimedia/modeIcons.js';
import '../styles/TrophyChart.css';

const TrophyChart = ({ playerTag, initialTrophies }) => {
  const [battleData, setBattleData] = useState([]);
  const [error, setError] = useState(null);
  const [trophyRange, setTrophyRange] = useState([initialTrophies - 1, initialTrophies + 1]);

  useEffect(() => {
    const fetchBattleLog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/player/${encodeURIComponent(playerTag)}/battlelog`);
        const data = await response.json();

        if (response.ok) {
          const processedData = [];
          let currentTrophies = initialTrophies;

          for (let i = 0; i < data.items.length; i++) {
            const battle = data.items[i];
            console.log('Battle:', battle);

            const trophyChange = battle.battle.trophyChange !== undefined ? battle.battle.trophyChange : 0;
            currentTrophies -= trophyChange;

            const mode = battle.battle.mode || 'default';
            const modeIcon = battle.battle.type === 'soloRanked' ? modeIcons.ranked : (modeIcons[mode] || modeIcons.default);
            const result = battle.battle.result === 'victory' ? 'Victory' : 'Defeat';

            const gameData = {
              name: `Game ${i + 1}`,
              trophies: currentTrophies,
              trophyChange: trophyChange,
              mode: mode,
              modeIcon: modeIcon,
              result: battle.battle.type === 'soloRanked' ? result : null
            };

            console.log('Processed Game Data:', gameData);

            processedData.push(gameData);
          }

          processedData.reverse();
          setBattleData(processedData);

          const minTrophies = Math.min(...processedData.map(item => item.trophies));
          const maxTrophies = Math.max(...processedData.map(item => item.trophies));
          setTrophyRange([Math.max(minTrophies - 2, 0), maxTrophies + 2]);
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
      <ResponsiveContainer height={600}>
        <LineChart data={battleData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={trophyRange} />
          <RechartsTooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="trophies"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={(props) => {
              const { modeIcon } = props.payload;
              return (
                <image
                  x={props.cx - 17}
                  y={props.cy - 15}
                  href={modeIcon}
                  width={32}
                  height={32}
                />
              );
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrophyChart;
