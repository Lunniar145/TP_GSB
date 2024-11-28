import React from 'react'
import './index.css'
import logo from '../src/pages/GSB.png'
import { Link } from 'react-router-dom'

function Acceuil() {
    return (
        <header>
            <div className='bg-blue-700 p-3'>
                <ul className=' flex m-3'>
                    <img src={logo} alt='' className='text-2xl h-8 w-auto' />

                    <li className=' ml-3 mr-3 text-white hover:bg-black rounded-md p-1.5'>
                        <a href=''>Dashboard</a>
                    </li>
                    <li className=' ml-3 mr-3 text-white hover:bg-black rounded-md p-1.5'>
                        <a href=''>Dashboard</a>
                    </li>
                    <li className=' ml-3 mr-3 text-white hover:bg-black rounded-md p-1.5'>
                        <a href=''>Dashboard</a>
                    </li>
                    <li className=' ml-3 mr-3 text-white hover:bg-black rounded-md p-1.5'>
                        <a href=''>Dashboard</a>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Acceuil
