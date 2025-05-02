import React, { useState, useEffect } from 'react'
import API from '../api/api'

export default function ModifierRapport() {
    const [date, setDate] = useState('')
    const [rapports, setRapports] = useState([])
    const [user, setUser] = useState(null)
    const [selectedRapport, setSelectedRapport] = useState(null)
    const [formData, setFormData] = useState({})
    const [message, setMessage] = useState('')

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const fetchRapports = async () => {
        if (!date || !user) return
        try {
            const response = await API.get('/rapports_a_date', {
                params: {
                    idVisiteur: user.id,
                    date: date,
                },
            })
            console.log('Objet brut reçu :', response.data)
            response.data.forEach((r, index) => {
                console.log(`Rapport ${index}:`, r)
            })

            if (Array.isArray(response.data)) {
                const rapportsCorriges = response.data.map(r => ({
                    idRapport: r.idRapport,
                    nom: r.nomMedecin,
                    prenom: r.prenomMedecin,
                    date: r.date,
                    motif: r.motif,
                    bilan: r.bilan,
                }))
                setRapports(rapportsCorriges)
            } else {
                setRapports([])
            }
        } catch (error) {
            console.error('Erreur récupération rapports', error)
            setRapports([])
        }
    }

    const handleSelect = rapport => {
        setSelectedRapport(rapport)
        setFormData({ ...rapport })
    }

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleUpdate = async () => {
        try {
            await API.put('/majRapports', {
                idRapport: formData.idRapport,
                idVisiteur: formData.id,
                motif: formData.motif,
                bilan: formData.bilan,
            })
            fetchRapports()
            setSelectedRapport(null)
            setFormData({})
            console.log('Données envoyées :', {
                idRapport: formData.idRapport,
                idVisiteur: formData.idVisiteur,
                motif: formData.motif,
                bilan: formData.bilan,
            })
            setMessage('Rapport mis à jour avec succès.')
        } catch (error) {
            console.error('Erreur lors de la mise à jour', error)
            setMessage('Erreur lors de la mise à jour.')
        }
    }

    const handleReset = () => {
        setDate('')
        setRapports([])
        setSelectedRapport(null)
        setFormData({})
        setMessage('')
    }

    return (
        <div className='p-6'>
            <h2 className='text-xl font-bold mb-4'>Modifier un rapport</h2>

            <div className='flex space-x-2'>
                <input
                    type='date'
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className='border p-2 rounded mr-2'
                />
                <button onClick={fetchRapports} className='bg-blue-600 text-white px-4 py-2 rounded'>
                    Rechercher
                </button>
                <button
                    onClick={handleReset}
                    className='bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400'
                >
                    Réinitialiser
                </button>
            </div>

            {message && <div className='mt-4 bg-green-100 text-green-700 px-4 py-2 rounded'>{message}</div>}

            {rapports.length > 0 && (
                <ul className='mt-6 space-y-2'>
                    {rapports.map((r, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(r)}
                            className='cursor-pointer bg-white border border-gray-300 rounded p-3 shadow-sm hover:bg-blue-50 hover:border-blue-400 transition duration-200'
                        >
                            {r.motif}
                        </li>
                    ))}
                </ul>
            )}

            {selectedRapport && (
                <div className='mt-6 border p-4 rounded bg-gray-50'>
                    <h3 className='text-lg font-semibold mb-2'>Modifier le rapport</h3>
                    <div className='mb-3'>
                        <label className='block'>Motif :</label>
                        <input
                            name='motif'
                            value={formData.motif}
                            onChange={handleChange}
                            className='border p-2 w-full rounded'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='block'>Bilan :</label>
                        <textarea
                            name='bilan'
                            value={formData.bilan}
                            onChange={handleChange}
                            className='border p-2 w-full rounded'
                        />
                    </div>
                    <button onClick={handleUpdate} className='bg-green-600 text-white px-4 py-2 rounded'>
                        Enregistrer
                    </button>
                </div>
            )}
        </div>
    )
}
