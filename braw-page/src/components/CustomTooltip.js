import React from 'react';
import trophiesIcon from '../assets/multimedia/trophies.png';
import '../styles/CustomTooltip.css';

const CustomTooltip = ({ active, payload }) => {
  console.log('Tooltip Payload:', payload);

  if (active && payload && payload.length) {
    const { trophies, trophyChange, mode, result, pointColor } = payload[0]?.payload || {};

    return (
      <div className="custom-tooltip">
        <div className="tooltip-content">
          <div 
            className="tooltip-icon" 
            style={{ backgroundColor: pointColor }} 
          />
          <div className="tooltip-text">
            <p>
              <img src={trophiesIcon} alt="Trophies Icon" />
              <b>{trophies}</b>
            </p>
            <p>Trophy Change: {trophyChange}</p>
            <p>Mode: {mode}</p>
            {result && <p>Result: {result}</p>} 
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;