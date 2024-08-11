import React from 'react';
import './../../Css/ModalCss/FirstLoginModal.css';

const FirstLoginModal = ({ onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-items">
                <h2>Welcome to the Platform!</h2>
                <p className="modal-text">Thank you for joining us. Here are some tips to get started...</p>
                <p className="modal-text">Please go into the settings to get your profile started :)</p>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default FirstLoginModal;