import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import favicon from '../assets/fact.png'


function Welcome(){


    const styles = {
        body: {
            margin: '0%',
            backgroundColor: '#adadad',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },
        divtitle: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100%',
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        titlee: {
            fontSize: '300%',
            fontFamily: 'Arial',
            marginBottom: '0%',
        },
        subtitle: {
            fontSize: '100%',
            fontFamily: 'Arial',
            marginTop: '0%',
        },
        divbtn: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            maxWidth: '100%',
            position: 'absolute',
            top: '60%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        btn: {
            margin: '2%',
            width: '13em',
            textAlign: 'center',
            textDecoration: 'none',
            padding: '10px 20px',
            color: 'white',
            borderRadius: '4px',
        },
        btnSecondary: {
            backgroundColor: '#0c5074',
            border: '0px',
        }
    };

    const linkcss={
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center' 
    }

    return (
        <div style={styles.body} >
            <Helmet>
            <title>Gestionnaire de facture et Stock</title>
            <link rel="icon" href={favicon} />
            </Helmet>
            <div style={styles.divtitle}>
                <h1 style={styles.titlee}>Gestionnaire de facture et Stock</h1>
                <br/>
                <h3 style={styles.subtitle}>Bonjour, veuillez sélectionner une des options ci-dessous</h3>
            </div>
            <div style={styles.divbtn}>
                
                <Link to="/activation" style={{...styles.btn, ...styles.btnSecondary}} id="btn2">Activation</Link>

                <Link to="/connexion" style={{...styles.btn, ...styles.btnSecondary}} id="btn2">Connexion</Link>
                
            </div>
        </div>
    );
}



export default Welcome;
