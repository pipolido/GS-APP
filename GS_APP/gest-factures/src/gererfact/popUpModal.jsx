import React, { useState, useEffect } from 'react';

function Modal({ isOpen, onClose, onConfirm, message }) {
    const [isHoveredCancel, setIsHoveredCancel] = useState(false);
    const [isHoveredConfirm, setIsHoveredConfirm] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 300); // Match the transition duration
        }
    }, [isOpen]);

    const handleMouseEnterCancel = () => {
        setIsHoveredCancel(true);
    };

    const handleMouseLeaveCancel = () => {
        setIsHoveredCancel(false);
    };

    const handleMouseEnterConfirm = () => {
        setIsHoveredConfirm(true);
    };

    const handleMouseLeaveConfirm = () => {
        setIsHoveredConfirm(false);
    };

    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: isOpen ? 'translate(-50%, -50%)' : 'translate(-50%, -60%)',
        opacity: isOpen ? 1 : 0,
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        zIndex: '1000',
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        width: '300px',
        textAlign: 'center',
        visibility: isVisible ? 'visible' : 'hidden'
    };

    const overlayStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '999',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease',
        visibility: isVisible ? 'visible' : 'hidden'
    };

    const buttonStyle = {
        margin: '10px',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none'
    };

    const cancelButtonStyle = {
        ...buttonStyle,
        backgroundColor: isHoveredCancel ? '#89CFF0' : '#0000FF'
    };

    const confirmButtonStyle = {
        ...buttonStyle,
        backgroundColor: isHoveredConfirm ? '#89CFF0' : '#0000FF'
    };

    return (
        <>
            <div style={overlayStyle}></div>
            <div style={modalStyle}>
                <p>{message}</p>
                <button 
                    style={cancelButtonStyle} 
                    onClick={onClose} 
                    onMouseEnter={handleMouseEnterCancel} 
                    onMouseLeave={handleMouseLeaveCancel}
                >
                    Annuler
                </button>
                <button 
                    style={confirmButtonStyle} 
                    onClick={onConfirm} 
                    onMouseEnter={handleMouseEnterConfirm} 
                    onMouseLeave={handleMouseLeaveConfirm}
                >
                    Confirmer
                </button>
            </div>
        </>
    );
}

export default Modal;
