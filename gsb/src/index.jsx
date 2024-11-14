import React, { useState } from 'react'
import './index.css'
import logo from '../src/pages/GSB.png'
import { Link, useNavigate } from 'react-router-dom'

function Index() {
    const navigate = useNavigate()
    const [error, setError] = useState('') // État pour gérer le message d'erreur

    var isAuthenticated = false

    function handleSubmit(event) {
        event.preventDefault() // Empêche le rechargement de la page

        // Récupération de la valeur du mot de passe
        const mdp = event.target.elements.password.value

        // Vérification de la longueur du mot de passe
        if (mdp.length < 8) {
            setError('Mot de passe pas assez long !')
            console.log('Test')
        } else {
            setError('')
            console.log('Succès!')
            isAuthenticated = true
        }

        if (isAuthenticated) {
            // Redirige vers la page d'accueil
            navigate('/acceuil')
        }
    }
    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center'>
                <div className='flex flex-col items-center mb-6'>
                    <img
                        className='text-2xl font-semibold text-gray-700 mt-2'
                        src={logo}
                        alt='Galaxy Swiss Bourdin'
                    />
                </div>

                <h3 className='text-lg font-medium text-gray-800 bg-gray-200 mb-6'>Identifiez vous</h3>

                <form onSubmit={handleSubmit}>
                    <div className='mb-4 text-left'>
                        <label className='block font-medium text-gray-600 mb-1' htmlFor='login'>
                            Identifiant
                        </label>
                        <input
                            id='login'
                            type='text'
                            placeholder='Identifiant'
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500'
                        />
                    </div>

                    <div className='mb-6 text-left'>
                        <label className='block font-medium text-gray-600 mb-1' htmlFor='password'>
                            Mot de passe
                        </label>
                        <input
                            id='password'
                            type='password'
                            placeholder='Mot de passe'
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full mb-5 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500'
                    >
                        Se connecter
                    </button>

                    {error && (
                        <div className='w-full bg-red-600 text-white font-medium rounded-lg p-2 mt-3'>
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Index
