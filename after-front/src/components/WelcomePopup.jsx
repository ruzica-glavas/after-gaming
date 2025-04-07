import React, { useState, useEffect } from 'react';

export default function WelcomePopup() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Verifica se il popup è stato chiuso durante questa sessione
        const hasClosed = sessionStorage.getItem('welcomePopupClosed');

        // Se il popup non è stato chiuso, mostralo dopo 5 secondi
        if (!hasClosed) {
            const timer = setTimeout(() => {
                setVisible(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
        }
    };

    const handleClose = () => {
        setVisible(false);
        // Salva in sessionStorage che il popup è stato chiuso durante questa sessione
        sessionStorage.setItem('welcomePopupClosed', 'true');
    };

    if (!visible) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.popup} className="position-relative text-center rounded shadow">
                <button onClick={handleClose} style={styles.closeButton} aria-label="Chiudi popup">
                    &times;
                </button>

                {!submitted ? (
                    <>
                        <h5 className="mb-3">🎉 Benvenuto!</h5>
                        <p>Inserisci la tua email per il codice sconto</p>
                        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="La tua email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" style={styles.sendButton}>Invia</button>
                        </form>
                    </>
                ) : (
                    <>
                        <h5>Grazie per esserti iscritto! 🥳</h5>
                        <p className="mb-2">Controlla la tua email per ricevere il codice sconto</p>
                        <button style={styles.sendButton} onClick={handleClose}>Chiudi</button>
                    </>
                )}
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    popup: {
        maxWidth: '400px',
        width: '90%',
        backgroundColor: 'rgb(206, 206, 206)',
        padding: '2rem',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '15px',
        background: 'none',
        border: 'none',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        color: '#333',
    },
    sendButton: {
        backgroundColor: '#ff8800',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '5px',
        fontWeight: 'bold',
        cursor: 'pointer',
    }
};
