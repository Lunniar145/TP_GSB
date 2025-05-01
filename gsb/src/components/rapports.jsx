import React, { useEffect, useState } from 'react'
import API from '../api/api'

export default function Rapports({ idMedecin }) {
    const [rapports, setRapports] = useState([])

    useEffect(() => {
        async function fetchRapports() {
            if (!idMedecin) return
            try {
                const response = await API.get(`/rapports/${idMedecin}`)
                console.log('ID médecin envoyé :', idMedecin)
                console.log('Réponse brute API :', response.data)

                if (typeof response.data === 'string' && response.data.trim() === '') {
                    setRapports([])
                } else {
                    setRapports(response.data)
                }
            } catch (error) {
                console.error('Erreur lors du chargement des rapports', error)
                setRapports([])
            }
        }

        fetchRapports()
    }, [idMedecin])

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return isNaN(date) ? 'Date invalide' : date.toLocaleDateString('fr-FR')
    }

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold mb-2">Rapports du médecin</h3>
            {rapports.length === 0 ? (
                <p className="text-gray-600">Aucun rapport disponible pour ce médecin.</p>
            ) : (
                <table className="w-full table-auto border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Motif</th>
                            <th className="border p-2">Bilan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rapports.map((rapport, index) => (
                            <tr key={index} className="text-sm hover:bg-gray-50">
                                <td className="border p-2">{formatDate(rapport.date)}</td>
                                <td className="border p-2">{rapport.motif}</td>
                                <td className="border p-2">{rapport.bilan}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
