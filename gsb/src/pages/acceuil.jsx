import React from 'react'
import axios from 'axios'
import '../index.css'
import Navbar from '../components/navbar'
import API from '../api/api'
import logo from '../assets/GSB.png'
import decoIcon from '../assets/IconLogout.png'
import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
function Acceuil() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Récupérer les informations utilisateur depuis localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser) {
            setUser(storedUser)
        } else {
            navigate('/')
        }
    }, [navigate])

    const nom = user ? user.nom : 'Utilisateur'
    const prenom = user ? user.prenom : ''

    return (
        <>
            <Navbar />
            <h1 id='TextTest'>
                Bonjour, {nom} {prenom}{' '}
            </h1>
            <Outlet />
        </>
    )
}

export default Acceuil
