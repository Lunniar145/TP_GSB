import React from 'react'
import axios from 'axios'
import '../index.css'
import API from '../api/api'
import logo from '../assets/GSB.png'
import decoIcon from '../assets/IconLogout.png'
import { Link } from 'react-router-dom'

const navigation = [
    { name: 'Dasboard', href: '', current: true },
    { name: 'Rapports', href: 'rapports', current: false },
    { name: 'Medecin', href: 'medecin', current: false },
]

function className(...classes) {
    return classes.filter(Boolean).join('')
}

function Navbar({ state }) {
    return (
        <>
            <header>
                <div className='bg-blue-700 p-3 '>
                    <ul className=' flex m-3'>
                        <img src={logo} alt='' className='text-2xl h-8 w-auto' />

                        <li className=' ml-3 mr-3 text-white hover:bg-black rounded-md p-1.5'>
                            <Link to={'/acceuil'}>Dashboard</Link>
                        </li>
                        <li className=' ml-3 mr-3 text-white hover:bg-black rounded-md p-1.5'>
                            <Link to={'rapport'}>Rapport</Link>
                        </li>
                        <li className=' ml-3 mr-3 text-white hover:bg-black rounded-md p-1.5'>
                            <Link to={'medecin'}>Medecin</Link>
                        </li>

                        <Link to={'/'} className='flex ml-auto'>
                            <img className='text-2xl h-8 w-auto' src={decoIcon} alt='' />
                        </Link>
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Navbar
