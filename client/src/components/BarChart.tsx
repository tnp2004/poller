import { Poll } from '@/types/interfaces'
import { Button } from '@mantine/core'
import React from 'react'
import { SERVER_HOST } from '@/pages/poll'
import { KeyedMutator } from 'swr'

type Props = {
    pollData: Poll
    mutate: KeyedMutator<Poll>
}

export default function BarChart({ pollData, mutate }: Props) {

    const totalVote = pollData.options?.map(option => option.point).reduce((sum, val) => sum += val)

    const votePoll = async (id: string, choice: string) => {
        const data = await (await fetch(`${SERVER_HOST}/api/poll/update/${id}/${choice}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })).json()
        mutate(data)
    }

    return (
        <div className='p-2 grid grid-cols-4 gap-4'>

            {pollData.options?.map((opt, index) => (
                <div className='text-center w-32' key={`option_${index}`}>
                    <div className='relative h-72 w-28 mx-auto'>
                        <div className='rounded-t-xl w-full absolute bottom-0 pt-2' style={{ height: `${(opt.point / totalVote) * 100}%`, backgroundColor: opt.colour }}>
                            <label className='font-bold text-xl text-slate-100'>{opt.point}</label>
                        </div>
                    </div>
                    <Button onClick={() => votePoll(pollData.id, opt.choice)} className='bg-slate-600 text-white w-full p-1 rounded-b-lg'>{opt.choice}</Button>
                </div>
            ))}

        </div>
    )
}