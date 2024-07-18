import React from 'react';
import { playerIcon, trophies } from '../icons';
import '../styles/ClubMembers.css';

const ClubMembers = ({ clubData, onMemberClick }) => {
  const iconStyle = {
    width: '40px', // Ajusta el tamaño según sea necesario
    height: '40px', // Ajusta el tamaño según sea necesario
  };

  const trophyStyle = {
    width: '20px', // Ajusta el tamaño según sea necesario
    height: '20px', // Ajusta el tamaño según sea necesario
  };

  return (
    <div className='club-members'>
      <h2>Club Members</h2>
      <ul>
        {clubData.members.map(member => (
          <li key={member.tag} onClick={() => onMemberClick(member.tag)}>
            <p className='member-text'>
              {member.name} <img src={playerIcon(member.icon.id)} alt={`Icon for ${member.name}`} style={iconStyle} />
              {member.tag} <img src={trophies} alt="Trophy Icon" style={trophyStyle} />
              {member.trophies}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClubMembers;
