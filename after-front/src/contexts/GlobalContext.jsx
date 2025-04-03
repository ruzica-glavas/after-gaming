import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [carrello, setCarrello] = useState([]);
    
    const [wishlist, setWishlist] = useState(() => {
        const wishlistData = localStorage.getItem('wishlist');
        return wishlistData ? JSON.parse(wishlistData) : [];
    });

    useEffect(() => {
        const carrelloData = localStorage.getItem('carrello');
        if (carrelloData) {
            setCarrello(JSON.parse(carrelloData));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('carrello', JSON.stringify(carrello));
    }, [carrello]);

    const aggiungiAlCarrello = (prodotto) => {
        const prodottoNelCarrello = carrello.find(item => item.id === prodotto.id);
        if (prodottoNelCarrello) {
            setCarrello(carrello.map(item =>
                item.id === prodotto.id ? { ...item, quantita: item.quantita + 1 } : item
            ));
        } else {
            setCarrello([...carrello, { ...prodotto, quantita: 1 }]);
        }
    };

    const rimuoviDalCarrello = (prodottoId) => {
        setCarrello(carrello.filter(item => item.id !== prodottoId));
    };

    const cambiaQuantita = (id, nuovaQuantita) => {
        setCarrello(carrello.map(prodotto =>
            prodotto.id === id ? { ...prodotto, quantita: Number(nuovaQuantita) } : prodotto
        ));
    };


    const aggiungiAllaWishlist = (prodotto) => {
        setWishlist(prevWishlist => {
            if (prevWishlist.find(item => item.id === prodotto.id)) {
                return prevWishlist; 
            }
            return [...prevWishlist, prodotto];
            console.log("Prodotto aggiunto alla wishlist:", prodotto); // Debug: Log del prodotto aggiunto
            console.log("Nuova wishlist:", nuovaWishlist); // Debug: Log della nuova wishlist
        });
    };

    const rimuoviDallaWishlist = (prodottoId) => {
        setWishlist(wishlist.filter(item => item.id !== prodottoId));
        console.log("Prodotto rimosso dalla wishlist:", prodottoId); // Debug: Log del prodotto rimosso
    };
    // Modifica: Salvataggio della wishlist in localStorage ogni volta che cambia
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        console.log("Wishlist aggiornata in localStorage:", wishlist); // Debug: Log dell'aggiornamento di localStorage
    }, [wishlist]);

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products');
                if (!response.ok) {
                    throw new Error('Errore nel recupero dei dati');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const contextValue = {
        products,
        loading,
        error,
        aggiungiAlCarrello,
        rimuoviDalCarrello,
        cambiaQuantita,
        carrello,
        wishlist, 
        aggiungiAllaWishlist, 
        rimuoviDallaWishlist
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};
