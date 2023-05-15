import React, { useEffect, useState } from 'react'
import { SERVER_HOST, fetcher } from '.'
import { Poll } from '@/types/interfaces'
import { useRouter } from 'next/router'
import { Badge } from '@mantine/core'
import { roboto } from '../_app'
import BarChart from '@/components/BarChart'
import useSWR from 'swr'

export default function PollInformation() {

  const router = useRouter()
  const { id } = router.query
  const { data, mutate } = useSWR<Poll>(`api/poll/${id}`, fetcher)

  return (
    <div className='w-2/3 mx-auto drop-shadow-xl bg-white rounded p-2'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-slate-700'>{data?.title}</h1>
        <div className='flex gap-1 mx-5 items-center'>
          {data?.tags?.map((tag: string, index: number) => (
            <Badge color="red" variant="outline" className={`${roboto.className} cursor-pointer hover:text-white hover:bg-gradient-to-r from-red-400 to-rose-400`} key={`pollBadge_${index}`} >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <p>{data?.content}</p>

      {data && <BarChart pollData={data} mutate={mutate} />}

    </div>
  )

}