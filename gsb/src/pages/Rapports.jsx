import React, { useState } from 'react'
import AjouterRapport from './AjouterRapport'
import ModifierRapport from './ModifierRapport'

export default function Rapports() {
    const [affichage, setAffichage] = useState('ajouter')

    return (
        <div className="p-6">
            <div className="flex justify-center space-x-4 mb-6">
                <button
                    onClick={() => setAffichage('ajouter')}
                    className={`px-4 py-2 rounded ${affichage === 'ajouter' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Ajouter un rapport
                </button>
                <button
                    onClick={() => setAffichage('modifier')}
                    className={`px-4 py-2 rounded ${affichage === 'modifier' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                    Modifier un rapport
                </button>
            </div>

            {affichage === 'ajouter' ? <AjouterRapport /> : <ModifierRapport />}
        </div>
    )
}
