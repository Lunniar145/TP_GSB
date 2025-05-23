import React from 'react'
import '../index.css'
import Navbar from '../components/navbar'
import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
function Acceuil() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))
        if (storedUser) {
            setUser(storedUser)
        } else {
            navigate('/')
        }
    }, [navigate])

    const nom = user ? user.nom : ' N/A'
    const prenom = user ? user.prenom : 'N/A'

    return (
        <>
            <Navbar />
            <h1 className='text-2xl font-bold'>
                Bonjour, {nom} {prenom}{' '}
            </h1>
            <Outlet />
        </>
    )
}

export default Acceuil
