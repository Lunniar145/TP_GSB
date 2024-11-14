import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

function Acceuil() {
    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center'>
                <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Bienvenue sur la page d'accueil</h1>
                <p className='text-gray-600 mb-4'>Vous êtes connecté avec succès !</p>
                <Link
                    to='/'
                    className='bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500'
                >
                    Retour à l'index
                </Link>
            </div>
        </div>
    )
}

export default Acceuil
