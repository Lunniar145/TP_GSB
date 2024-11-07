import React from 'react'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from './index.jsx'
import Acceuil from './acceuil.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Index />,
    },

    {
        path: '/acceuil',
        element: <Acceuil />,
    },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
