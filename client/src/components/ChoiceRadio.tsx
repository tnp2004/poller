import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Poll } from '@/types/interfaces'
import { Button } from '@mantine/core'
import { SERVER_HOST } from '@/pages/poll'
import { KeyedMutator } from 'swr'

type Props = {
    pollData: Poll
    mutate: KeyedMutator<Poll>
}

export default function ChoiceRadio({ pollData, mutate }: Props) {
    const [selected, setSelected] = useState<string>('')
    const [disable, setDisable] = useState<boolean>(false)

    const votePoll = async () => {
        try {
            const data = await (await fetch(`${SERVER_HOST}/api/poll/update/${pollData.id}/${selected}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json()
            mutate(data)
            setDisable(true)

        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className="w-full px-4 py-16">
            <div className="mx-auto w-full max-w-md">
                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                    <div className="space-y-2">
                        {pollData.options?.map((opt) => (
                            <RadioGroup.Option
                                key={opt.choice}
                                value={opt.choice}
                                className={({ active, checked }) =>
                                    `${active
                                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-red-300'
                                        : ''
                                    }
                  ${checked ? 'bg-red-500 bg-opacity-90 text-white' : 'bg-white'
                                    }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                }
                            >
                                {({ checked }) => (
                                    <>
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="text-sm">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-bold  ${checked ? 'text-white' : 'text-gray-900'
                                                            }`}
                                                    >
                                                        {opt.choice}
                                                    </RadioGroup.Label>
                                                </div>
                                            </div>
                                            {checked && (
                                                <div className="shrink-0 text-white">
                                                    <CheckIcon className="h-6 w-6" />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
                <Button color='red' variant='gradient' className='w-full my-5 bg-gradient-to-r from-red-500 to-rose-500 p-2 rounded text-white font-bold' disabled={disable} onClick={votePoll}>Vote</Button>
            </div>
        </div>
    )
}

function CheckIcon(props: any) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
