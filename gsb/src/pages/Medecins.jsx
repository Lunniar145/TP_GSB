import React, { useState, useEffect } from 'react'
import API from '../api/api.js'
import FicheMedcin from '../components/ficheMedecin'
import '../index.css'

function Medecin() {
    const [medecins, setMedecins] = useState([])
    const [search, setSearch] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [selectedMedecin, setSelectedMedecin] = useState(null)

    async function fetchMedecins(nom) {
        if (!nom) {
            setMedecins([])
            setIsSearching(false)
            return
        }
        setIsSearching(true)
        try {
            const response = await API.get('/medecins', { params: { nom } })
            setMedecins(response.data)
            console.log(response.data)
            localStorage.setItem('med', JSON.stringify(response.data))
        } catch (error) {
            console.error('Erreur lors de la récupération des médecins', error)
            setMedecins([])
        }
    }

    function selectMedecin(medecin) {
        setMedecins([])
        setSearch(``)
        setIsSearching(false)
        setSelectedMedecin(medecin)
    }

    return (
        <div className='p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Rechercher un médecin</h2>

            <div className='flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md'>
                <input
                    type='text'
                    placeholder='Tapez un nom...'
                    value={search}
                    onChange={e => {
                        const value = e.target.value
                        setSearch(value)
                        fetchMedecins(value)
                    }}
                    className='border p-2 rounded-md w-full max-w-md'
                />

                {isSearching && (
                    <ul className='bg-white p-4 mt-2 rounded-lg shadow-md w-full max-w-md'>
                        {medecins.length > 0 ? (
                            medecins.map(medecin => (
                                <li
                                    key={medecin.id}
                                    className='hover:bg-gray-200 p-2 cursor-pointer'
                                    onClick={() => selectMedecin(medecin)}
                                >
                                    {medecin.nom} {medecin.prenom}
                                </li>
                            ))
                        ) : (
                            <li className='text-gray-500'>Aucun médecin trouvé</li>
                        )}
                    </ul>
                )}
            </div>

            {selectedMedecin && <FicheMedcin medecin={selectedMedecin} />}
        </div>
    )
}

export default Medecin
