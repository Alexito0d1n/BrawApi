import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 5000;
const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjM2NmZlYTllLTQwOTQtNGQ2MC1iYWY0LTc0ZThkMDE5MDViNCIsImlhdCI6MTcyMTE1OTk2OCwic3ViIjoiZGV2ZWxvcGVyLzQwZDIwMTQ0LTE4MGItZDdjOC04Y2E0LWYzMjU2YTEyMzVmYiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNzkuMTQ2LjEzNC4yNTAiXSwidHlwZSI6ImNsaWVudCJ9XX0.Dd4LwyofYs4LDG7xweGY8J85cOR_nQhYFJ8jS01TMOXTQ5KwzuHyfHaDMpNRJONwMzu01O1K9ghwjA7PeR6fOw'; // Reemplaza con tu API Key

app.use(cors());
app.use(express.json());

app.get('/api/player/:playerTag', async (req, res) => {
    const { playerTag } = req.params;
    const encodedPlayerTag = encodeURIComponent(playerTag);
    
    try {
        const response = await fetch(`https://api.brawlstars.com/v1/players/%23${encodedPlayerTag}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching player data: ${response.statusText}`);
        }

        const playerData = await response.json();
        res.json(playerData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/player/:playerTag/battlelog', async (req, res) => {
    const { playerTag } = req.params;
    const encodedPlayerTag = encodeURIComponent(playerTag);

    try {
        const response = await fetch(`https://api.brawlstars.com/v1/players/%23${encodedPlayerTag}/battlelog`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching battle log: ${response.statusText}`);
        }

        const battleLogData = await response.json();
        res.json(battleLogData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Nueva ruta para obtener datos del club
app.get('/api/club/:clubTag', async (req, res) => {
    const { clubTag } = req.params;
    const encodedClubTag = encodeURIComponent(clubTag);

    try {
        const response = await fetch(`https://api.brawlstars.com/v1/clubs/%23${encodedClubTag}`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching club data: ${response.statusText}`);
        }

        const clubData = await response.json();
        res.json(clubData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
