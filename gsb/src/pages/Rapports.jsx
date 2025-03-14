import React, { useEffect, useState } from 'react'

function GetVisiteur() {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        // Récupération des données du localStorage
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUserData(JSON.parse(storedUser))
        }
    }, [])

    if (!userData) {
        return <p>Chargement des données...</p>
    }

    return (
        <>
            <div>
                <div className='p-8 bg-gray-100 min-h-screen'>
                    <h1 className='text-2xl font-bold mb-4'>
                        Rapport pour {userData.prenom} {userData.nom}
                    </h1>
                    <div className='bg-white p-6 rounded-lg shadow-md'>
                        <ul>
                            <li>
                                <strong>0 :</strong> {userData.id}
                            </li>
                            <li>
                                <strong>1 :</strong> {userData.nom}
                            </li>
                            <li>
                                <strong>2 :</strong> {userData.prenom}
                            </li>
                            <li>
                                <strong>3 :</strong> {userData.adresse}
                            </li>
                            <li>
                                <strong>4 :</strong> {userData.cp}
                            </li>
                            <li>
                                <strong>5 :</strong> {userData.ville}
                            </li>
                            <li>
                                <strong>ID :</strong> {userData.id}
                            </li>
                            <li>
                                <strong>Nom :</strong> {userData.nom}
                            </li>
                            <li>
                                <strong>Prénom :</strong> {userData.prenom}
                            </li>
                            <li>
                                <strong>Adresse :</strong> {userData.adresse}
                            </li>
                            <li>
                                <strong>CP :</strong> {userData.cp}
                            </li>
                            <li>
                                <strong>ville :</strong> {userData.ville}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetVisiteur
