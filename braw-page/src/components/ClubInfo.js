import React from 'react';
import { playerIcon } from '../icons'; // Asegúrate de que esta ruta es correcta

const ClubInfo = ({ club }) => {
    return (
        <div className="club-info">
            <h2>Club Info</h2>
            <p>Name: {club.name}</p>
            <p>Tag: {club.tag}</p>
            <p>Trophies: {club.trophies}</p>
            <h3>Members:</h3>
            <ul>
                {club.members.map(member => (
                    <li key={member.tag}>
                        {member.icon ? (
                            <img src={playerIcon(member.icon.id)} alt="Member Icon" />
                        ) : (
                            <img src={playerIcon(0)} alt="Default Icon" /> // Reemplaza "0" por el ID del ícono por defecto
                        )}
                        <span>{member.name} (Trophies: {member.trophies})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClubInfo;
