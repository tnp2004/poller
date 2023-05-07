import React, { useState } from 'react'
import useSWR from 'swr'
import { Poll } from '@/types/interfaces'
import PollCard from '@/components/PollCard'
import FormCreatePoll from '@/components/FormCreatePoll'
import { useRouter } from 'next/router'
import FilterPolls from '@/components/FilterPolls'

type Props = {}

export const ENDPOINT = "http://localhost:4000"


const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then(r => r.json())

export default function Poll({ }: Props) {

  const router = useRouter()
  const { tags } = router.query
  const [filterPollsByTags, setFilterPollsByTags] = useState<Poll[]>([])
  const { data, mutate } = useSWR<Poll[]>("api/poll", fetcher)

  const getFilteredPolls = async () => {
    const data = await (await fetch(`${ENDPOINT}/api/poll?tags=${tags}`)).json()
    setFilterPollsByTags(data)
  }

  return (
    <div>
      <h1>Poll</h1>
      <button onClick={getFilteredPolls}>show filter data</button>
      <div className='border-2 w-1/3 h-10 rounded mx-auto flex gap-1'>
        <FormCreatePoll mutate={mutate} />
        <FilterPolls />
      </div>
      <div className='flex flex-wrap gap-5 w-3/4 mx-auto justify-center p-5'>
        {tags ? filterPollsByTags?.map((poll: Poll, index: number) => {
          return <PollCard {...poll} key={index} />
        }) : data?.map((poll: Poll, index: number) => {
          return <PollCard {...poll} key={index} />
        })}
      </div>

      {JSON.stringify(data)}
    </div>
  )
}