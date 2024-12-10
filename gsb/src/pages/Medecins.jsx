import React from 'react'
import '../index.css'
import logo from '../assets/GSB.png'
import decoIcon from '../assets/IconLogout.png'
import { Link } from 'react-router-dom'

function Medecin() {
    return (
        <header>
            <div className='bg-blue-700 p-3 '>
                <ul className=' flex m-3'>
                    <img src={logo} alt='' className='text-2xl h-8 w-auto' />

                    <li className=' ml-3 mr-3 text-white hover:bg-black rounded-md p-1.5'>
                        <a href='#'>Dashboard</a>
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
    )
}

export default Medecin
