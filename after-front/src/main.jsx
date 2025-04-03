import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './CSS/index.css'
import './CSS/carrello.css'
import './CSS/wishlist.css'
import './CSS/tendenze.css'
import './CSS/ultimiarrivi.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)