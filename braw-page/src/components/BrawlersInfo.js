import React, { useEffect, useState, useCallback } from 'react';
import '../styles/BrawlersInfo.css';
import { brawlerIcons, Default } from '../assets/brawlerIcons';
import BrawlerTrophyChart from './BrawlerTrophyChart';

const BrawlersInfo = ({ playerTag }) => {
    const [brawlersStats, setBrawlersStats] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const normalizedPlayerTag = playerTag.toUpperCase();

    const calculateBrawlerStats = useCallback((battleLog) => {
        if (!battleLog || !Array.isArray(battleLog)) return [];

        const brawlerMap = {};

        battleLog.forEach(battle => {
            const teams = battle?.battle?.teams;
            const players = battle?.battle?.players;

            if (!Array.isArray(teams) && !Array.isArray(players)) return;

            let playerBattle;
            if (Array.isArray(teams)) {
                playerBattle = teams.flat().find(player => player.tag === `#${normalizedPlayerTag}`);
            } else if (Array.isArray(players)) {
                playerBattle = players.find(player => player.tag === `#${normalizedPlayerTag}`);
            }

            if (playerBattle) {
                const brawlerId = playerBattle.brawler.id;
                const brawlerName = playerBattle.brawler.name;
                const brawlerTrophies = playerBattle.brawler.trophies;
                if (!brawlerMap[brawlerId]) {
                    brawlerMap[brawlerId] = { id: brawlerId, name: brawlerName, games: 0, wins: 0, initialTrophies: brawlerTrophies };
                }
                brawlerMap[brawlerId].games += 1;

                if (battle.battle.result === 'victory' ||
                    (battle.battle.mode === 'soloShowdown' && battle.battle.rank >= 1 && battle.battle.rank <= 4) ||
                    (battle.battle.mode === 'duoShowdown' && battle.battle.rank >= 1 && battle.battle.rank <= 3)) {
                    brawlerMap[brawlerId].wins += 1;
                }
            }
        });

        return Object.values(brawlerMap)
            .sort((a, b) => b.games - a.games)
            .slice(0, 5)
            .map(brawler => ({
                ...brawler,
                winRate: ((brawler.wins / brawler.games) * 100).toFixed(2)
            }));
    }, [normalizedPlayerTag]);

    useEffect(() => {
        if (!normalizedPlayerTag) return;

        const fetchBattleLog = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/player/${encodeURIComponent(normalizedPlayerTag)}/battlelog`);
                const data = await response.json();
                if (response.ok) {
                    setBrawlersStats(calculateBrawlerStats(data.items || []));
                    setError(null);
                } else {
                    throw new Error(data.error || 'Error fetching battle log');
                }
            } catch (err) {
                setError(err.message);
                setBrawlersStats([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBattleLog();
    }, [normalizedPlayerTag, calculateBrawlerStats]);

    const getColorForPercentage = (percentage) => {
        if (percentage <= 0) return '#ff0000';
        if (percentage <= 50) return '#ffa500';
        if (percentage <= 100) return '#008000';
        return '#000000';
    };

    const handleImageError = (e) => {
        e.target.src = Default;
    };

    const getIconSize = (percentage) => {
        const size = 40 + (percentage / 100) * 300;
        return `${size}px`;
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!brawlersStats.length) return <p>No recent battles found.</p>;

    return (
        <div className="brawlers-info">
            <h2>Brawlers Used in Recent Battles</h2>
            <ul>
                {brawlersStats.map((brawler, index) => {
                    const color = getColorForPercentage(brawler.winRate);
                    const iconSrc = brawlerIcons[brawler.name] || Default;
                    const iconSize = getIconSize(brawler.winRate);
                    return (
                        <li key={index} className="brawler-item">
                            <div className="brawler-details">
                                <div className="brawler-icon-name">
                                    <img
                                        src={iconSrc}
                                        alt={brawler.name}
                                        style={{ width: iconSize, height: iconSize }}
                                        onError={handleImageError}
                                        loading="lazy"
                                    />
                                    <div>
                                        <h3>{brawler.name}</h3>
                                        <p className="win-rate" style={{ color }}>{brawler.winRate}%</p>
                                        <p>Games Played: {brawler.games}</p>
                                    </div>
                                </div>
                                <BrawlerTrophyChart
                                    playerTag={playerTag}
                                    brawlerId={brawler.id}
                                    initialTrophies={brawler.initialTrophies}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default BrawlersInfo;
