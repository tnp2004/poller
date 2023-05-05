import React from 'react'
import useSWR from 'swr'
import { Poll } from '@/types/interfaces'
import PollCard from '@/components/PollCard'
import { Button } from '@mantine/core'
import CreatePoll from '@/components/CreatePoll'

type Props = {}

export const ENDPOINT = "http://localhost:4000"

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then(r => r.json())

export default function Poll({ }: Props) {

  const { data, mutate } = useSWR<Poll[]>("api/poll", fetcher)

  return (
    <div>
      <h1>Poll</h1>

      <div className='border-2 w-1/3 h-10 rounded mx-auto'>
        <CreatePoll />
      </div>
      <div className='flex flex-wrap gap-5 w-3/4 mx-auto justify-center p-5'>
        {data?.map((poll: Poll, index: number) => {
          return <PollCard {...poll} key={index} />
        })}
      </div>

    </div>
  )
}