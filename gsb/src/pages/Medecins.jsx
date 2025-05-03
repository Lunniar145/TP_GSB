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

            <div className='flex flex-col items-center bg-white p-6 rounded-xl shadow-lg w-full max-w-xl mx-auto'>
    {/* Champ de recherche */}
    <div className='relative w-full'>
        <input
            type='text'
            placeholder='Rechercher un médecin par nom...'
            value={search}
            onChange={e => {
                const value = e.target.value
                setSearch(value)
                fetchMedecins(value)
            }}
            className='w-full px-4 py-3 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-gray-700 placeholder-gray-400'
        />
    </div>

    {/* Liste déroulante avec défilement */}
    {isSearching && (
        <div className='w-full mt-3 max-h-60 overflow-y-auto rounded-lg border border-gray-200 shadow-md bg-white'>
            <ul>
                {medecins.length > 0 ? (
                    medecins.map(medecin => (
                        <li
                            key={medecin.id}
                            className='px-4 py-2 hover:bg-blue-100 cursor-pointer transition-colors duration-150'
                            onClick={() => selectMedecin(medecin)}
                        >
                            {medecin.nom} {medecin.prenom}
                        </li>
                    ))
                ) : (
                    <li className='px-4 py-2 text-gray-500'>Aucun médecin trouvé</li>
                )}
            </ul>
        </div>
    )}
</div>



            {selectedMedecin && <FicheMedcin medecin={selectedMedecin} />}
        </div>
    )
}

export default Medecin
