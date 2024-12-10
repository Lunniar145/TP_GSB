import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from './index.jsx'
import Acceuil from './pages/acceuil.jsx'
import Medecin from './pages/Medecins.jsx'
import Rapport from './pages/Rapports.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />,
    },

    {
        path: '/acceuil',
        element: <Acceuil />,
    },
    {
        path: '/medecin',
        element: <Medecin />,
    },
    {
        path: '/rapport',
        element: <Rapport />,
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
