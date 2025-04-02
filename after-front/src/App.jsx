import DefaultLayout from './layouts/DefaultLayout';
import { GlobalProvider } from './contexts/GlobalContext';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainHomepage from "./components/MainHomepage";
import MainDettaglio from './components/MainDettaglio';
import MainCarello from './components/MainCarello';
import MainWishlist from './components/MainWishlist';
import MainUtente from './components/MainUtente';
import Ricerca from './components/Ricerca';
import PaginaTendenze from './pages/PaginaTendenze';
import PaginaUltimiArrivi from './pages/PaginaUltimiArrivi';

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<MainHomepage />} />
              <Route path="/tendenze" element={<PaginaTendenze />} />
              <Route path="/ultimi-arrivi" element={<PaginaUltimiArrivi />} />
              <Route path="/ricerca" element={<Ricerca />} />
              <Route path="/dettaglio/:slug" element={<MainDettaglio />} />
              <Route path="/carello" element={<MainCarello />} />
              <Route path="/wishlist" element={<MainWishlist />} />
              <Route path="/utente" element={<MainUtente />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
};

export default App