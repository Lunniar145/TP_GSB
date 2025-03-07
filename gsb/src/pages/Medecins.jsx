import React from 'react'
import API from '../api/api.js'
import { useEffect, useState } from 'react'
import '../index.css'

function Medecin() {
    async function getMedecins() {
        try {
            const response = await API.get('/medecin')
            console.log(response)
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log('Erreur lors de la récupération des médecins', error)
            return null
        }
    }
    const [medecins, setMedecins] = useState([])

    useEffect(() => {
        async function fetchMedecins() {
            const data = await getMedecins()
            if (data) {
                setMedecins(data)
            }
        }
        fetchMedecins()
    }, [])
    return (
        <div>
            <h2>Liste des Médecins</h2>
            <ul>
                {medecins.map(medecin => (
                    <li key={medecin.id}>
                        {medecin.nom} {medecin.prenom}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Medecin
