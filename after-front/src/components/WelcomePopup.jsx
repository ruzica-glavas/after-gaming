import React, { useState, useEffect } from 'react'; 

export default function WelcomePopup() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(null);  // Gestire gli errori

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.trim()) {
            try {
                // Effettua la chiamata al backend per inviare il codice sconto
                const response = await fetch('http://localhost:3000/api/send-discount-code', {  // Modifica con il tuo endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email })
                });

                const data = await response.json();

                if (response.ok) {
                    setSubmitted(true);
                } else {
                    setError(data.error || 'Errore nell\'invio del codice sconto');
                }
            } catch (error) {
                setError('Errore di connessione al server');
            }
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
                        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Mostra eventuali errori */}
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

// Oggetto styles per definire gli stili inline
const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Ombra trasparente
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    popup: {
        backgroundColor: '#fff',
        padding: '30px',
        width: '300px',
        borderRadius: '10px',
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '20px',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
    },
    sendButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    },
};

