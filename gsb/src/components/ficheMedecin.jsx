import React, { useState, useEffect } from 'react'
import '../index.css'
import API from '../api/api'
import Rapports from './rapports'

export default function FicheMedecin({ medecin }) {
    const [buttonSelect, setButtonSelect] = useState('fiche')
    const [formData, setFormData] = useState({ ...medecin })
    const [message, setMessage] = useState(null)

    // 🟡 Quand un nouveau médecin est sélectionné, on met à jour le formulaire
    useEffect(() => {
        setFormData({ ...medecin })
        setMessage(null) // Réinitialise les messages d’alerte
    }, [medecin])

    function formatPhoneNumber(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(?=\d)/g, '$1 ')
            .trim()
    }

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'tel' ? formatPhoneNumber(value) : value,
        }))
    }

    async function handleSubmit() {
        try {
            await API.put('/majMedecin', formData)
            setMessage({ type: 'success', text: 'Médecin modifié avec succès !' })
        } catch (error) {
            console.error(error)
            setMessage({ type: 'error', text: 'Erreur lors de la mise à jour.' })
        }
    }

    return (
        <>
            <div className='bg-white p-6 mt-6 rounded-lg shadow-md max-w-2xl mx-auto'>
                <div className='flex justify-center mb-6'>
                    <button
                        className={`text-xl font-bold p-2 border rounded-md mx-2 ${buttonSelect === 'fiche' ? 'bg-blue-100' : ''}`}
                        onClick={() => setButtonSelect('fiche')}
                    >
                        Fiche médecin
                    </button>
                    <button
                        className={`text-xl font-bold p-2 border rounded-md mx-2 ${buttonSelect === 'rapports' ? 'bg-blue-100' : ''}`}
                        onClick={() => setButtonSelect('rapports')}
                    >
                        Rapport médecin
                    </button>
                </div>

                {buttonSelect === 'fiche' && (
                    <div className='space-y-4'>
                        {message && (
                            <div
                                className={`p-2 rounded ${
                                    message.type === 'success'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                }`}
                            >
                                {message.text}
                            </div>
                        )}

                        <div>
                            <label>Nom :</label>
                            <input
                                type='text'
                                name='nom'
                                value={formData.nom}
                                onChange={handleChange}
                                className='border p-2 rounded-md w-full'
                            />
                        </div>
                        <div>
                            <label>Prénom :</label>
                            <input
                                type='text'
                                name='prenom'
                                value={formData.prenom}
                                onChange={handleChange}
                                className='border p-2 rounded-md w-full'
                            />
                        </div>
                        <div>
                            <label>Adresse :</label>
                            <input
                                type='text'
                                name='adresse'
                                value={formData.adresse}
                                onChange={handleChange}
                                className='border p-2 rounded-md w-full'
                            />
                        </div>
                        <div>
                            <label>Département :</label>
                            <input
                                type='text'
                                name='departement'
                                value={formData.departement}
                                onChange={handleChange}
                                className='border p-2 rounded-md w-full'
                            />
                        </div>
                        <div>
                            <label>N° de téléphone :</label>
                            <input
                                type='text'
                                name='tel'
                                value={formData.tel}
                                onChange={handleChange}
                                className='border p-2 rounded-md w-full'
                            />
                        </div>

                        <div>
    <label>Spécialité complémentaire :</label>
    <input
        type='text'
        name='specialitecomplementaire'
        value={formData.specialitecomplementaire || ''}
        onChange={handleChange}
        className='border p-2 rounded-md w-full'
    />
</div>



                        <button
                            onClick={handleSubmit}
                            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4'
                        >
                            Enregistrer les modifications
                        </button>
                    </div>
                )}

                {buttonSelect === 'rapports' && <Rapports idMedecin={medecin.id} />}
            </div>
        </>
    )
}
