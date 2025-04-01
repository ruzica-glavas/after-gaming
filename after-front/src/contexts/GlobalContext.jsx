import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const HandleProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/products");
            console.log("Risposta API:", response.data);
            
            // Verifica se la risposta è un array direttamente
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else if (response.data && response.data.results && Array.isArray(response.data.results)) {
                setProducts(response.data.results);
            } else {
                console.warn("Formato risposta API non valido:", response.data);
                setProducts([]);  // Imposta un array vuoto in caso di risposta malformata
            }
        } catch (error) {
            console.error("Errore nel recupero dei prodotti:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        HandleProducts();
    }, []);

    const value = {
        products,
        setProducts,
        HandleProducts,
        loading,
        error
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };


