import Link from 'next/link'
import React from 'react'
import { IconInbox } from '@tabler/icons-react'
import { rem } from '@mantine/core'
import { Berkshire_Swash } from '@next/font/google'

const berkshire_swash = Berkshire_Swash({
    subsets: ['latin'],
    weight: ['400']
})

export const CLIENT_HOST = process.env.NEXT_PUBLIC_CLIENT_HOST

export default function Navbar() {

    return (
        <nav className={`${berkshire_swash.className} bg-gradient-to-b from-red-500 to-rose-500 py-2 px-5 text-white text-xl`}>
            <div className='flex justify-between md:w-3/4 md:px-8 mx-auto'>
                <label className={`font-bold text-2xl mr-10`}>
                    <Link href={`${CLIENT_HOST}/`} className='bg-gradient-to-t from-slate-100 to-white bg-clip-text text-transparent'>poller</Link>
                </label>

                <div className='flex gap-5'>
                    <Link href={`${CLIENT_HOST}/poll`} className='nav-menu'>
                        <IconInbox className='inline text-white' size={rem(20)} /> poll
                    </Link>
                </div>
            </div>
        </nav>
    )
}