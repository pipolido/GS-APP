import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react'; // Correct import for emotion/react
import { ClipLoader } from 'react-spinners'; // Ensure react-spinners is installed
import logo from '../assets/Debuggers2-.png';

function Header() {
    const [isHovered, setIsHovered] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    // Updated background gradient to blue
    const header = {
        backgroundImage: 'linear-gradient(190deg, #0c48b5, #96DED1)', 
        position: 'fixed',
        height: '8%',
        width: '100%',
        zIndex: '5',
    };

    const headerLogo = {
        position: 'relative',
        left: '1%',
        margin: '10px'
    };

    // Updated button colors to blue
    const btnCss = {
        position: 'relative',
        left: '80%',
        backgroundColor:isHovered? '#0c48b5': '#5e8aff', // Blue color for hover
        border: 'none',
        color: 'white',
        padding: '6px 18px',
        cursor: 'pointer',
    };

    const loadingOverlay = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    };

    const override = css`
        display: block;
        margin: 0 auto;
    `;

    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/');
        }, 3000);
    };

    return (
        <header className='header' style={header}>
            <img src={logo} style={headerLogo} width="7%" alt="Logo"/>
            <button style={btnCss} onClick={handleLogout} className="btn btn-secondary btn" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                Déconnexion
            </button>

            {loading && (
                <div style={loadingOverlay}>
                    <ClipLoader color={"#0c48b5"} loading={loading} css={override} size={150} />
                </div>
            )}
        </header>
    );
}

export default Header;
