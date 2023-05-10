import React, { useEffect, useState } from 'react'
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
    if (data.length !== 0) return setFilterPollsByTags(data)
    setFilterPollsByTags([])
  }

  useEffect(() => {
    const urlPath = router.asPath
    if (urlPath === '/poll') router.push('http://localhost:3000/poll?tags=all')
    if (tags) getFilteredPolls()
  })

  return (
    <div>
      <h1>Poll</h1>
      <div className='border-2 w-1/3 h-10 rounded mx-auto flex gap-1'>
        <FormCreatePoll mutate={mutate} />
        <FilterPolls />
      </div>
      <div className='flex flex-wrap gap-5 w-3/4 mx-auto justify-center p-5'>
        {/* Filter poll */}
        {tags !== "all" && filterPollsByTags.length !== 0 && filterPollsByTags?.map((poll: Poll, index: number) => {
          return <PollCard {...poll} key={`poll_${index}`} />
        })}

        {tags !== "all" && filterPollsByTags.length == 0 && <h1>no data filter</h1>}

        {/* All poll */}
        {tags === "all" && data?.map((poll: Poll, index: number) => {
          return <PollCard {...poll} key={`poll_${index}`} />
        })}

        {tags === "all" && data?.length == 0 && <h1>no poll data</h1>}
      </div>

    </div>
  )
}