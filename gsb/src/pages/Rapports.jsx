import React, { useEffect, useState } from 'react'

function GetVisiteur() {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUserData(JSON.parse(storedUser))
        }
    }, [])

    if (!userData) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p className='text-lg font-semibold text-gray-700'>Chargement des données...</p>
            </div>
        )
    }

    return (
        <div className=' bg-gray-50 p-6 flex items-center justify-center'>
            <div className='max-w-2xl w-full bg-white p-6 rounded-lg shadow-md'>
                <h1 className='text-2xl font-bold text-center text-blue-600 mb-4'>
                    Rapport de {userData.prenom} {userData.nom}
                </h1>
                <div className='bg-gray-100 p-6 rounded-md shadow-inner text-sm text-gray-800 font-mono whitespace-pre-line'>
                    {Object.entries(userData).map(([key, value]) => (
                        <p key={key}>
                            <strong className='capitalize'>{key} :</strong> {value}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GetVisiteur
