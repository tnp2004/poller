import { Poll } from '@/types/interfaces'
import React from 'react'

type Props = {
    pollData: Poll
    mutate: () => void
}

export default function BarChart({ pollData }: Props) {

    const totalVote = pollData.options?.map(option => option.point).reduce((sum, val) => sum += val)

    return (
        <div className='p-2 grid grid-cols-4 gap-4'>

            {pollData.options?.map((opt, index) => (
                <div className='text-center w-32' key={`option_${index}`}>
                    <div className='relative h-72 w-28 mx-auto'>
                        <div className='rounded-t-xl w-full absolute bottom-0 pt-2' style={{ height: `${(parseInt(opt.point) / parseInt(totalVote)) * 100}%`, backgroundColor: opt.colour }}>
                            <label className='font-bold text-xl text-slate-100'>{opt.point}</label>
                        </div>
                    </div>
                    <div className='bg-slate-600 text-white w-full p-1 rounded-b-lg'>{opt.choice}</div>
                </div>
            ))}

        </div>
    )
}