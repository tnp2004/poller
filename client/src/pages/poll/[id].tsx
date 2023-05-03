import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

export default function PollInformation({}: Props) {
  
  const router = useRouter().query
  const { id } = router
  
    return (
    <div>Poller: {id}</div>
  )
}