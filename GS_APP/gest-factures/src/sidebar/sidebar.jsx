import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import addfact from '../assets/addfact.png';
import fact from '../assets/fact.png';
import client from '../assets/client.png';
import stock from '../assets/stock.png';
import { ClipLoader } from 'react-spinners';
import { EmailContext } from '../contexts/EmailContext';
import styles from './sidebar.module.css';

function Sidebar() {
    const [isHovered, setIsHovered] = useState(false);
    const [showText, setShowText] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { email } = useContext(EmailContext);
    const hoverTimeout = useRef(null);

    const handleMouseEnter = () => {
        setIsHovered(true);
        hoverTimeout.current = setTimeout(() => {
            setShowText(true);
        }, 150); // Delay of 150 milliseconds
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setShowText(false);
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
        }
    };

    const handleClick = (path) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate(path, { state: { email } });
        }, 1000); // Simulate loading time
    };

    useEffect(() => {
        return () => {
            // Clear the timeout when the component unmounts
            if (hoverTimeout.current) {
                clearTimeout(hoverTimeout.current);
            }
        };
    }, []);

    const sidebarr = {
        margin: '0%',
        padding: '0%',
        position: 'fixed',
        top: '8%',
        left: '0',
        width: isHovered ? '14%' : '10%', // Adjust width based on hover state
        height: '84%', // Cover the entire height of the viewport
        backgroundColor: '#cce7ff', // Light blue background color
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'width 0.3s ease', // Smooth transition for width change
        zIndex: isHovered ? '100' : ''
    };

    // Updated colors to shades of blue
    const crfact = {
        marginTop: '31%',
        marginBottom: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        border: 'solid 2px #4d90fe', // Blue border
        borderRadius: '20px',
        paddingBottom: '2%',
    };

    const grfact = {
        marginBottom: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        border: 'solid 2px #4d90fe', // Blue border
        borderRadius: '20px',
        paddingBottom: '2%',
    };

    const grclient = {
        marginBottom: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        border: 'solid 2px #4d90fe', // Blue border
        borderRadius: '20px',
        paddingBottom: '2%',
    };

    const parag = {
        fontSize: '80%',
        margin: '0%',
        fontFamily: 'helvetica',
        visibility: showText ? '' : 'hidden', // Use showText state for visibility
        position: showText ? '' : 'absolute',
    };

    const img = {
        width: '50%',
        height: isHovered ? '70%' : '100%',
    };

    const linkcss = {
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };
    // const sidebarr = {
    //     margin: '0%',
    //     padding: '0%',
    //     position: 'fixed',
    //     top: '8%',
    //     left: '0',
    //     width: isHovered ? '14%' : '10%', // Adjust width based on hover state
    //     height: '84%', // Cover the entire height of the viewport
    //     backgroundColor: '#E1F8BD',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     transition: 'width 0.3s ease', // Smooth transition for width change
    //     zIndex: isHovered ? '100' : ''
    // };

    // const crfact = {
    //     marginTop: '31%',
    //     marginBottom: '10%',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '60%',
    //     border: 'solid 2px rgb(117, 115, 115)',
    //     borderRadius: '20px',
    //     paddingBottom: '2%'
    // };

    // const grfact = {
    //     marginBottom: '10%',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '60%',
    //     border: 'solid 2px rgb(117, 115, 115)',
    //     borderRadius: '20px',
    //     paddingBottom: '2%'
    // };

    // const grclient = {
    //     marginBottom: '10%',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     width: '60%',
    //     border: 'solid 2px rgb(117, 115, 115)',
    //     borderRadius: '20px',
    //     paddingBottom: '2%'
    // };

    // const parag = {
    //     fontSize: '110%',
    //     margin: '0%',
    //     fontFamily: "helvetica",
    //     visibility: showText ? '' : 'hidden', // Use showText state for visibility
    //     position: showText ? '' : 'absolute'
    // };

    // const img = {
    //     width: '50%',
    //     height: isHovered ? '70%' : '100%'
    // };

    // const linkcss = {
    //     textDecoration: 'none',
    //     color: 'inherit',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // };
    return (
        <div>
            {loading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <ClipLoader color={'#0c48b5'} loading={loading} size={150} />
                </div>
            )}
            <div
                className="sidebar"
                style={sidebarr}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div style={linkcss} onClick={() => handleClick('/create-fact')}>
                    <div id="cr-fact" style={crfact}>
                        <img id="img" src={addfact} style={img} alt="Create Invoice" />
                        <p id="p" style={parag}>Créer une facture</p>
                    </div>
                </div>
                <div style={linkcss} onClick={() => handleClick('/gerer-fact')}>
                    <div id="gr-fact" style={grfact}>
                        <img id="img" src={fact} style={img} alt="Manage Invoices" />
                        <p id="p" style={parag}>Gérer les factures</p>
                    </div>
                </div>
                <div style={linkcss} onClick={() => handleClick('/gerer-clt')}>
                    <div id="gr-clt" style={grclient}>
                        <img className="imgclt" id="img" src={client} style={img} alt="Manage Clients" />
                        <p id="p" style={parag}>Gérer les clients</p>
                    </div>
                </div>
                <div style={linkcss} onClick={() => handleClick('/gerer-stck')}>
                    <div id="gr-clt" style={grclient}>
                        <img className="imgclt" id="img" src={stock} style={img} alt="Manage Clients" />
                        <p id="p" style={parag}>Gérer le stock</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
