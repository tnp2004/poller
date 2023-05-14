import { Poll } from '@/types/interfaces'
import React, { useEffect } from 'react'

type Props = {
    pollData: Poll
}

export default function BarChart({ pollData }: Props) {

    const totalVote = pollData.options?.map(option => option.point).reduce((sum, val) => sum += val)

    return (
        <div className='border-2 p-2 flex justify-between'>
            {/* {pollData && totalVote} */}
            <div className='text-center w-32'>
                <div className='relative h-72'>
                    <div className='bg-orange-400 rounded-t-lg w-full absolute bottom-0' style={{ height: '60%' }}>

                    </div>
                </div>
                <div className='bg-slate-600 text-white w-full p-1 rounded-b'>title</div>
            </div>

        </div>
    )
}