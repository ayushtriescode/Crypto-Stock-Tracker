import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CryptoTracker from './CryptoTracker.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CryptoTracker />
  </StrictMode>,
)
