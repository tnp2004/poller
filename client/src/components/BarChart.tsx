import { Poll } from '@/types/interfaces'
import React from 'react'

type Props = {
    pollData: Poll
}

export default function BarChart({ pollData }: Props) {

    const totalVote = pollData.options?.map(option => option.point).reduce((sum, val) => sum += val)

    return (
        <div className='p-2 flex flex-wrap gap-4 bg-gradient-to-t from-slate-50 to-slate-100 rounded my-5'>

            {pollData.options?.map((opt, index) => (
                <div className='text-center w-32 mx-auto' key={`option_${index}`}>
                    <div className='relative h-72 w-28 mx-auto'>
                        <div className='border-2 border-b-0 border-slate-700 rounded-t-xl w-full absolute bottom-0 pt-2 pb-6 ease-in duration-150' style={{ height: `${(opt.point / totalVote) * 100}%`, backgroundColor: opt.colour }}>
                            <label className='font-bold text-xl text-slate-100'>{opt.point}</label>
                        </div>
                    </div>
                    <div className='bg-slate-700 text-white w-full rounded-b-lg py-1'>{opt.choice}</div>
                </div>
            ))}

        </div>
    )
}