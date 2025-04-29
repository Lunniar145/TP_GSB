import React, { useState, useEffect } from 'react'
import API from '../api/api'

export default function AjouterRapport() {
    const [user, setUser] = useState(null)
    const [medecins, setMedecins] = useState([])
    const [search, setSearch] = useState('')
    const [selectedMedecin, setSelectedMedecin] = useState(null)
    const [formData, setFormData] = useState({
        motif: '',
        bilan: '',
        date: ''
    })
    const [message, setMessage] = useState('')

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const fetchMedecins = async (nom) => {
        try {
            const response = await API.get('/medecins', { params: { nom } })
            if (typeof response.data === 'string' && response.data.trim() === '') {
                setMedecins([])
            } else {
                setMedecins(response.data)
            }
        } catch (error) {
            console.error('Erreur chargement médecins', error)
            setMedecins([])
        }
    }

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
        if (value.length >= 2) fetchMedecins(value)
        else setMedecins([])
    }

    const handleSelectMedecin = (medecin) => {
        setSelectedMedecin(medecin)
        setSearch(`${medecin.nom} ${medecin.prenom}`)
        setMedecins([])
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        if (!user || !selectedMedecin) {
            setMessage('Veuillez sélectionner un médecin.')
            return
        }
        try {
            await API.put('/ajouterRapport', {
                idVisiteur: user.id,
                idMedecin: selectedMedecin.id,
                motif: formData.motif,
                bilan: formData.bilan,
                date: formData.date,
                medicaments: 0
            })
            setMessage('Rapport ajouté avec succès.')
            setFormData({ motif: '', bilan: '', date: '' })
            setSelectedMedecin(null)
            setSearch('')
        } catch (error) {
            console.error('Erreur ajout rapport', error)
            setMessage('Erreur lors de l\'enregistrement.')
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Ajouter un rapport</h2>
            <input
                type="text"
                placeholder="Rechercher un médecin..."
                value={search}
                onChange={handleSearch}
                className="border p-2 rounded w-full mb-2"
            />
            {medecins.length > 0 && (
                <ul className="border rounded mb-4">
                    {medecins.map((med) => (
                        <li
                            key={med.id}
                            onClick={() => handleSelectMedecin(med)}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                            {med.nom} {med.prenom}
                        </li>
                    ))}
                </ul>
            )}
            {selectedMedecin && (
                <div className="mb-4 text-sm text-gray-600">
                    Rapport pour : {selectedMedecin.nom} {selectedMedecin.prenom}
                </div>
            )}
            <div className="mb-3">
                <label className="block">Date :</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-3">
                <label className="block">Motif :</label>
                <input
                    name="motif"
                    value={formData.motif}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="mb-3">
                <label className="block">Bilan :</label>
                <textarea
                    name="bilan"
                    value={formData.bilan}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                />
            </div>
            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Enregistrer le rapport
            </button>
            {message && (
                <p className="mt-4 text-green-700 font-semibold">{message}</p>
            )}
        </div>
    )
}
