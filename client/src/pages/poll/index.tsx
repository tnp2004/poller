import React, { useState } from 'react'
import useSWR from 'swr'
import { Poll } from '@/types/interfaces'
import PollCard from '@/components/PollCard'
import FormCreatePoll from '@/components/FormCreatePoll'
import FilterPolls from '@/components/FilterPolls'

export const SERVER_HOST = process.env.NEXT_PUBLIC_SERVER_HOST

export const fetcher = (url: string) => fetch(`${SERVER_HOST}/${url}`).then(r => r.json())

export default function Poll() {

  const { data, mutate } = useSWR<Poll[]>("api/poll", fetcher)
  const [filterPolls, setFilterPolls] = useState<Poll[]>([])
  const [filter, setFilter] = useState<boolean>(false)
  const [filterUI, setFilterUI] = useState<string>('')

  const getFilteredPolls = async (tags: string) => {
    if (tags) {
      const data = await (await fetch(`${SERVER_HOST}/api/poll?tags=${tags}`)).json()
      setFilterPolls(data)
      setFilter(true)
      return
    }
    setFilterPolls([])
    setFilter(false)
  }

  const updateFilterUI = (tag: string) => {
    setFilterUI(tag)
  }

  return (
    <>
      <div className='w-1/3 h-10 rounded mx-auto flex justify-center gap-1 my-5'>
        <FormCreatePoll mutate={mutate} />
        <FilterPolls getFilteredPolls={getFilteredPolls} filterUI={filterUI} />
      </div>

      <div className='flex flex-wrap gap-5 w-3/4 mx-auto justify-center p-5'>

        {/* Filter poll */}
        {filter && filterPolls.length !== 0 && filterPolls?.map((poll: Poll, index: number) => {
          return <PollCard {...poll} updateFilterUI={updateFilterUI} key={`poll_${index}`} />
        })}

        {filter && filterPolls.length === 0 && <span className='text-xl text-slate-600 my-10'>no data filter</span>}

        {/* All poll */}
        {!filter && data?.length !== 0 && data?.map((poll: Poll, index: number) => {
          return <PollCard {...poll} updateFilterUI={updateFilterUI} key={`poll_${index}`} />
        })}

        {!filter && data?.length === 0 && <span className='text-xl text-slate-600 my-10'>no poll data</span>}

      </div>

    </>
  )
}