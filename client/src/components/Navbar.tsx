import Link from 'next/link'
import React from 'react'

export const CLIENT_HOST = process.env.NEXT_PUBLIC_CLIENT_HOST

export default function Navbar() {

    return (
        <nav className='bg-gradient-to-b from-red-500 to-rose-500 py-2 px-5 flex text-white text-xl gap-5 mb-5'>
            <label className='font-bold'>
                <Link href={`${CLIENT_HOST}/`}>poller</Link>
            </label>
            
            <Link href={`${CLIENT_HOST}/poll`}>poll</Link>
        </nav>
    )
}