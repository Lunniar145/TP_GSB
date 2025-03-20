import React, { useState } from 'react'
import API from '../api/api.js'
import '../index.css'
import { json } from 'react-router-dom'

function Medecin() {
    const [medecins, setMedecins] = useState([])
    const [search, setSearch] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    async function fetchMedecins(nom) {
        if (!nom) {
            setMedecins([])
            setIsSearching(false)
            return
        }
        setIsSearching(true)
        try {
            const response = await API.get('/medecins', {
                params: { nom },
            })
            setMedecins(response.data)
            console.log(response.data)
        } catch (error) {
            console.error('Erreur lors de la récupération des médecins', error)
            setMedecins([])
        }
    }

    return (
        <div>
            <h2>Rechercher un médecin</h2>

            <div className='flex flex-col p-4 bg-white rounded-lg shadow-md justify-center w-5/12'>
                <input
                    type='text'
                    placeholder='Tapez un nom...'
                    value={search}
                    onChange={e => {
                        const value = e.target.value
                        setSearch(value)
                        fetchMedecins(value)
                    }}
                    className=' border p-2 mb-4'
                />
                {isSearching && (
                    <ul className=' bg-gray-100 p-4 rounded-lg shadow-md'>
                        {medecins.length > 0 ? (
                            medecins.map(medecin => (
                                <li className=' hover:bg-gray-200' key={medecin.id}>
                                    <a href=''>
                                        {medecin.nom} {medecin.prenom}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li>Aucun médecin trouvé</li>
                        )}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Medecin
