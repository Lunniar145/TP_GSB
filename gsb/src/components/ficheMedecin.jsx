import React from 'react'
import axios from 'axios'
import '../index.css'
import API from '../api/api'
import logo from '../assets/GSB.png'
import decoIcon from '../assets/IconLogout.png'
import { Link } from 'react-router-dom'

export default function ficheMedecin({ medecin }) {
    const [buttonSelect, setbuttonSelect] = useState('')
    return (
        <>
            <div className='bg-white p-6 mt-6 rounded-lg shadow-md max-w-lg mx-auto'>
                <div className='bg-gray-100 p-4 rounded-md shadow-inner text-sm text-gray-800 font-mono'>
                    <button className='text-xl font-bold text-center text-blue-600 mb-4 border p-2 rounded-md'>
                        Fiche médecin
                    </button>
                    <button className='text-xl font-bold text-center text-blue-600 mb-4 border p-2 rounded-md ml-5'>
                        Rapport médecin
                    </button>
                    <div>
                        <strong className='capitalize'>Nom :</strong>
                        <input
                            type='text'
                            value={medecin.nom}
                            placeholder='Nom'
                            className='border p-2 rounded-md w-full max-w-md mb-5'
                            readOnly
                        />
                    </div>
                    <div>
                        <strong className='capitalize'>Prénom :</strong>
                        <input
                            type='text'
                            value={medecin.prenom}
                            placeholder='Nom'
                            className='border p-2 rounded-md w-full max-w-md mb-5'
                            readOnly
                        />
                    </div>
                    <div>
                        <strong className='capitalize'>Adresse :</strong>
                        <input
                            type='text'
                            value={medecin.adresse}
                            placeholder='Nom'
                            className='border p-2 rounded-md w-full max-w-md mb-5'
                            readOnly
                        />
                    </div>
                    <div>
                        <strong className='capitalize'>Département :</strong>
                        <input
                            type='text'
                            value={medecin.departement}
                            placeholder='Nom'
                            className='border p-2 rounded-md w-full max-w-md mb-5'
                            readOnly // Empêche la modification
                        />
                    </div>
                    <div>
                        <strong className='capitalize'>N° de téléphone :</strong>
                        <input
                            type='text'
                            value={medecin.tel}
                            placeholder='Nom'
                            className='border p-2 rounded-md w-full max-w-md'
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
