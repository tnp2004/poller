import React, { useEffect, useState } from 'react'
import { SERVER_HOST } from '.'
import { Poll } from '@/types/interfaces'
import { useRouter } from 'next/router'
import { Badge } from '@mantine/core'
import { roboto } from '../_app'
import BarChart from '@/components/BarChart'

export default function PollInformation() {

  const router = useRouter()
  const { id } = router.query
  const [poll, setPoll] = useState<Poll>()

  const getPollData = async () => {
    const pollData = await fetch(`${SERVER_HOST}/api/poll/${id}`).then(res => res.json())
    setPoll(pollData)
  }

  useEffect(() => {
    if (id) getPollData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className='w-2/3 mx-auto drop-shadow-xl bg-white rounded p-2'>
      <div className='flex justify-between'>
        <h1 className='font-bold text-slate-700'>{poll?.title}</h1>
        <div className='flex gap-1 mx-5 items-center'>
          {poll?.tags.map((tag: string, index: number) => (
            <Badge color="red" variant="outline" className={`${roboto.className} cursor-pointer hover:text-white hover:bg-gradient-to-r from-red-400 to-rose-400`} key={`pollBadge_${index}`} >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <p>{poll?.content}</p>
      {JSON.stringify(poll?.options)}

      {poll && <BarChart pollData={poll} />}

    </div>
  )

}