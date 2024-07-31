import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import CustomTooltip from './CustomTooltip';
import { modeIcons } from '../assets/multimedia/modeIcons';

const BrawlerTrophyChart = ({ playerTag, brawlerId, initialTrophies }) => {
    const [battleData, setBattleData] = useState([]);
    const [error, setError] = useState(null);
    const [trophyRange, setTrophyRange] = useState([initialTrophies - 2, initialTrophies + 2]);

    useEffect(() => {
        const fetchBattleLog = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/player/${encodeURIComponent(playerTag)}/battlelog`);
                const data = await response.json();

                if (response.ok) {
                    const processedData = [];
                    let currentTrophies = initialTrophies;

                    data.items.forEach((battle, index) => {
                        const { battle: battleDetails } = battle;
                        const mode = battleDetails.mode || 'default';
                        const modeIcon = modeIcons[mode] || modeIcons.default;

                        let playerBattle;

                        if (mode === 'soloShowdown' || mode === 'duoShowdown') {
                            playerBattle = battleDetails.players?.find(player => player.tag === `#${playerTag}`);
                        } else {
                            playerBattle = battleDetails.teams?.flat().find(player => player.tag === `#${playerTag}`);
                        }

                        if (playerBattle && playerBattle.brawler.id === brawlerId) {
                            const trophyChange = battleDetails.trophyChange !== undefined ? battleDetails.trophyChange : 0;
                            currentTrophies -= trophyChange;

                            processedData.push({
                                name: `Game ${index + 1}`,
                                trophies: currentTrophies,
                                modeIcon: modeIcon
                            });
                        }
                    });

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
    }, [playerTag, brawlerId, initialTrophies]);

    if (error) return <p className="error">{error}</p>;
    if (!battleData.length) return <p>No data available</p>;

    return (
        <div className="trophy-chart-brawler">
            <ResponsiveContainer width="100%" height={200}>
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
                                    x={props.cx - 12}
                                    y={props.cy - 12}
                                    href={modeIcon}
                                    width={24}
                                    height={24}
                                />
                            );
                        }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BrawlerTrophyChart;
