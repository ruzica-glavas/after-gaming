import DefaultLayout from './layouts/DefaultLayout';
import { GlobalProvider } from './contexts/GlobalContext';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Homepage from "./pages/Homepage";
import PaginaDettaglio from "./pages/PaginaDettaglio";
import MainCarello from './components/MainCarello';
import MainWishlist from './components/MainWishlist';
import MainUtente from './components/MainUtente';
import Ricerca from './components/Ricerca';
import PaginaTendenze from './pages/PaginaTendenze';
import PaginaUltimiArrivi from './pages/PaginaUltimiArrivi';
import Grazie from './pages/Grazie';
import NotFound from './pages/NotFound';
import ThankYou from './pages/ThankYou';

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/tendenze" element={<PaginaTendenze />} />
              <Route path="/ultimi-arrivi" element={<PaginaUltimiArrivi />} />
              <Route path="/ricerca" element={<Ricerca />} />
              <Route path="/dettaglio/:slug" element={<PaginaDettaglio />} />
              <Route path="/carello" element={<MainCarello />} />
              <Route path="/wishlist" element={<MainWishlist />} />
              <Route path="/utente" element={<MainUtente />} />
              <Route path="/grazie" element={<Grazie />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
            <Route path="/thankyou" element={<ThankYou />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
};

export default App