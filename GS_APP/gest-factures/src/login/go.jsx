// src/components/Go.js
import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ClipLoader } from 'react-spinners';
import { EmailContext } from '../contexts/EmailContext';
import backg from '../assets/back.webp';
import logo from '../assets/Debuggers1-.png';
import favicon from '../assets/Debuggers1-.png';

function Go() {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, setEmail } = useContext(EmailContext); // Use context here
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [lockError, setLockError] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);

    useEffect(() => {
        const emailFromLocation = location.state?.email || '';
        setEmail(emailFromLocation); // Set the email in context
    }, [location.state, setEmail]);

    const styles = {
           body: {
                  margin: '0%',
                  backgroundImage: `url(${backg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  height: '100vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  position: 'relative',
                },
                img: {
                  position: 'absolute',
                  top: '50%',
                  left: '25%',
                  transform: 'translate(-50%, -50%)',
                  width: '40%',
                  height: '80%',
                },
                main: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: '100%',
                  position: 'absolute',
                  top: '50%',
                  left: '75%',
                  transform: 'translate(-50%, -50%)',
                  width: '35%',
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
                btn: {
                  margin: '2%',
                  width: '100%',
                  textAlign: 'center',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  color: 'white',
                  borderRadius: '4px',
                },
                btnSecondary: {
                  backgroundColor: '#0c5074',
                  border: '0px',
                },
                loadingOverlay: {
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
                },
                errorMessage: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#fff',
                  padding: '20px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  zIndex: 1001,
                  textAlign: 'center',
                  color: 'black',
                  opacity: 0,
                  transition: 'opacity 0.5s ease-in-out',
                },
                errorMessageVisible: {
                  opacity: 1,
                },
                lockErrorMessage: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#fff',
                  padding: '20px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  zIndex: 1001,
                  textAlign: 'center',
                  color: 'black',
                  opacity: 1,
                }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await fetch('http://localhost/login/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();

        setTimeout(() => {
            setLoading(false);
            if (result.status === 'success') {
                navigate('/gerer-fact');
            } else if (result.message === 'Account locked') {
                setLockError(true);
                setTimeout(() => {
                    setLockError(false);
                }, 3000);
            } else {
                setError(true);
                setAttemptCount(attemptCount + 1);
                if (attemptCount + 1 >= 3) {
                    lockAccount(email);
                }
                setTimeout(() => {
                    setError(false);
                }, 3000);
            }
        }, 2000);
    };

    const lockAccount = async (email) => {
        await fetch('http://localhost/login/lock-account.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
    };

    return (
        <div style={styles.body}>
            <Helmet>
                <title>Login</title>
                <link rel="icon" href={favicon} />
            </Helmet>
            <img src={logo} style={styles.img} alt="deb Logo" />
            <div style={styles.main}>
                <h4 style={styles.header}>Entrer les informations</h4>
                <form onSubmit={handleSubmit}>
                    <label style={styles.label}>E-mail</label>
                    <input type="email" value={email} required disabled style={styles.input} />
                    <br />
                    <label style={styles.label}>Mot de passe</label>
                    <input type="password" value={password} onChange={handlePasswordChange} required style={styles.input} />
                    <br />
                    <button type="submit" style={{ ...styles.btn, ...styles.btnSecondary }}>Connexion</button>
                </form>
            </div>
            <div style={{ ...styles.errorMessage, ...(error ? styles.errorMessageVisible : {}) }}><b>Mot de passe erroné ⚠</b></div>
            {lockError && (
                <div style={styles.lockErrorMessage}>
                    <b style={{color:'red'}}>Compte verrouillé, contactez votre administration</b>
                </div>
            )}
            {loading && (
                <div style={styles.loadingOverlay}>
                    <ClipLoader color={"#0c48b5"} loading={loading} size={150} />
                </div>
            )}
        </div>
    );
}

export default Go;
