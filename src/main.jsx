import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { UserContextProvider } from './context/userContext.jsx'
import { ListContextProvider } from './context/listContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <ListContextProvider>
        <App />
      </ListContextProvider>
    </UserContextProvider>
  </StrictMode>,
)
