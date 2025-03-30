import DefaultLayout from './layouts/DefaultLayout';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainHomepage from "./components/MainHomepage";
import MainDettaglio from './components/MainDettaglio';
import MainCarello from './components/MainCarello';
import MainWishlist from './components/MainWishlist';
import MainUtente from './components/MainUtente';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<MainHomepage />} />
            <Route path="/dettaglio" element={<MainDettaglio />} />
            <Route path="/carello" element={<MainCarello />} />
            <Route path="/wishlist" element={<MainWishlist />} />
            <Route path="/utente" element={<MainUtente />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App;
