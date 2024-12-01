import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import favicon from '../assets/Debuggers1-.png';

function Signup() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        code: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false); // State for managing success popup
    const navigate = useNavigate();

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
        main: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            margin: '0px',
            padding: '20px',
            border: 'none',
            borderRadius: '15px',
            backgroundColor: 'rgb(110, 216, 245)',
        },
        header: {
            fontFamily: 'Geo, sans-serif',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '200%',
        },
        label: {
            display: 'block',
            marginBottom: '10px',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        submitButton: {
            width: '100%',
            padding: '10px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#0c5074',
            color: '#fff',
            cursor: 'pointer',
            margin: '2%',
        },
        submitButtonHover: {
            backgroundColor: '#16384b',
        },
        popup: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            zIndex: 1000,
            textAlign: 'center',
        },
        popupOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost/login/signup.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (result.status === 'success') {
            setSuccess(true); // Show the success popup
            setTimeout(() => {
                navigate('/connexion'); // Redirect after 3 seconds
            }, 3000);
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={styles.body}>
            <Helmet>
                <title>Signup</title>
                <link rel="icon" href={favicon} />
            </Helmet>
            <div style={styles.main}>
                <h4 style={styles.header}>Entrer les informations</h4>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label style={styles.label}>Nom:</label>
                    <input
                        type="text"
                        name="nom"
                        required
                        style={styles.input}
                        value={formData.nom}
                        onChange={handleChange}
                    />
                    <br />
                    <label style={styles.label}>Prénom:</label>
                    <input
                        type="text"
                        name="prenom"
                        required
                        style={styles.input}
                        value={formData.prenom}
                        onChange={handleChange}
                    />
                    <br />
                    <label style={styles.label}>E-mail:</label>
                    <input
                        type="email"
                        name="email"
                        required
                        style={styles.input}
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <br />
                    <label style={styles.label}>
                        Code: <b>(donné par votre administration)</b>
                    </label>
                    <input
                        type="text"
                        name="code"
                        required
                        style={styles.input}
                        value={formData.code}
                        onChange={handleChange}
                    />
                    <br />
                    <label style={styles.label}>Mot de passe:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        style={styles.input}
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <br />
                    <input type="submit" value="Activer mon compte" style={styles.submitButton} />
                </form>
            </div>
            {success && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popup}>
                        <p><b>Compte crée avec succès! ✅</b></p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signup;
