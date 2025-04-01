import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const HandleProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/products");
            console.log("Risposta API:", response.data)
            setProducts(response.data.results)
        } catch (error) {
            console.error("Errore nel recupero dei prodotti:", error);
        }
    };

    useEffect(() => {
        HandleProducts();
    }, []);

    const value = {
        products,
        setProducts,
        HandleProducts,
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
