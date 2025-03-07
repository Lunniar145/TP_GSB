import React, { useState } from 'react'
import './index.css'
import API from './api/api.js'
import logo from './assets/GSB.png'
import { Form, Link, useNavigate } from 'react-router-dom'

function Index() {
    const navigate = useNavigate()
    const [error, setError] = useState('') // État pour gérer le message d'erreur

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()

        // Récupération de la valeur du mot de passe
        const mdp = event.target.elements.password.value
        const login = event.target.elements.login.value

        async function getVisiteur(leLogin, leMdp) {
            try {
                const response = await API.get('/connexion', {
                    params: {
                        login: leLogin,
                        mdp: leMdp,
                    },
                })
                return response
            } catch (error) {
                console.log('Erreur de connexion API')
                return null
            }
        }

        getVisiteur(login, mdp)
            .then(response => {
                if (response.data != null) {
                    console.log(response.data)
                    localStorage.setItem('user', JSON.stringify(response.data))
                    setIsAuthenticated(true)
                    navigate('/acceuil')
                } else {
                    setError('Login ou mot de passe incorrect !')
                }
            })
            .catch(error => {
                console.error('Erreur de connexion API', error)
                setError('Erreur de connexion, veuillez réessayer.')
            })
    }

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-sm text-center'>
                <div className='flex flex-col items-center mb-6 '>
                    <img
                        className='text-2xl font-semibold text-gray-700 mt-2'
                        src={logo}
                        alt='Galaxy Swiss Bourdin'
                    />
                </div>

                <h3 className='text-lg font-medium text-gray-800 bg-gray-200 mb-6'>Identifiez vous</h3>

                <Form onSubmit={handleSubmit}>
                    <div className='mb-4 text-left'>
                        <label className='block font-medium text-gray-600 mb-1' htmlFor='login'>
                            Identifiant
                        </label>
                        <input
                            id='login'
                            type='text'
                            placeholder='Identifiant'
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-transparent focus: scale-125 transition-transform duration-300'
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
                            className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-transparent focus: scale-125 transition-transform duration-300'
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
                </Form>
            </div>
        </div>
    )
}

export default Index
