import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import favicon from '../assets/Debuggers1-.png';

function Login() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
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
            borderRadius: '5px'
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
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch('http://localhost/login/checkEmail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
        const result = await response.json();

        setTimeout(() => {
            setLoading(false);
            if (result.status === 'success') {
                navigate('/go', { state: { email } }); // Pass email to the /go route
            } else {
                setError(result.message);
                setTimeout(() => {
                    setError('');
                    window.location.reload(); // Reload the page after 3 seconds
                }, 3000);
            }
        }, 1500); // Delay for 2 seconds
    };

    return (
        <div style={styles.body}>
            <Helmet>
                <title>Login</title>
                <link rel="icon" href={favicon} />
            </Helmet>
            <div style={styles.main}>
                <h4 style={styles.header}>Entrer les informations</h4>
                {error && (
                    <div style={styles.popupOverlay}>
                        <div style={styles.popup}>
                            <p>{error}</p>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <label style={styles.label}>E-mail</label>
                    <input type="email" required style={styles.input} value={email} onChange={handleChange} />
                    <br />
                    <br />
                    <input type="submit" value="Suivant" style={styles.submitButton} />
                </form>
            </div>
            {loading && (
                <div style={styles.loadingOverlay}>
                    <ClipLoader color={"#0c48b5"} loading={loading} size={150} />
                </div>
            )}
        </div>
    );
}

export default Login;
