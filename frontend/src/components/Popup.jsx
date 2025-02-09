import React from 'react';

const Popup = ({ message, onClose, isSuccess }) => {
  return (
    <div className="popup-overlay">
      <div className={`popup ${isSuccess ? 'success' : 'error'}`}>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
