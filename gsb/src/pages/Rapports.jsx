import React, { useEffect, useState } from 'react'
import axios from 'axios'

function GetVisiteur() {
    const [visiteur, setVisiteur] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get('/connexion')
                setVisiteur(response.data) // Stocker les données
                setLoading(false) // Arrêter le chargement
            } catch (err) {
                setError('Erreur lors de la récupération des données.')
                setLoading(false)
            }
        }

        fetchData()
    }, []) // Exécuté une seule fois au montage du composant

    if (loading) return <p>Chargement...</p>
    if (error) return <p>{error}</p>

    return (
        <div>
            <h1>Informations du Visiteur</h1>
            {visiteur && (
                <div>
                    <p>Nom : {visiteur.nom}</p>
                    <p>Prénom : {visiteur.prenom}</p>
                    <p>Adresse : {visiteur.adresse}</p>
                    <p>Ville : {visiteur.ville}</p>
                </div>
            )}
        </div>
    )
}

export default GetVisiteur
