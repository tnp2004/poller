import { ENDPOINT } from '@/pages/poll'
import { FormPoll, Options, Poll } from '@/types/interfaces'
import { Badge, Button, ColorInput, Modal, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { KeyedMutator } from 'swr'

type Props = {
    mutate: KeyedMutator<Poll[]>
}


export default function CreatePoll({ mutate }: Props) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [optInput, setOptInput] = useState<string>('')
    const [optColour, setOptColour] = useState<string>('')
    const [options, setOptions] = useState<Options[]>([])

    const form = useForm({
        initialValues: {
            title: '',
            content: '',
            colour: '#fa5c5c',
            options: []
        }
    })

    const insertOption = () => {
        if (optInput && optColour) {
            const option = {
                choice: optInput,
                colour: optColour
            }

            setOptions(prev => [...prev, option])
            setOptInput('')
        }
    }

    const insertPoll = async (values: FormPoll) => {
        values.options = options
        console.log(values)
        const updated = await fetch(`${ENDPOINT}/api/poll/new`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then(r => r.json())
        mutate(updated)
        // form.reset()
        setOpenModal(false)
    }

    const removeObjectByIndex = (arr: Options[], index: number) => {
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    const deleteChoice = (index: number) => {
        const newArray = removeObjectByIndex([...options], index);
        setOptions(newArray);
    }

    return (
        <>
            <Modal opened={openModal} onClose={() => setOpenModal(false)} title="Create Poll">
                <form onSubmit={form.onSubmit(insertPoll)}>
                    <TextInput required mb={12} label="Title" placeholder='What poll do you want to create' {...form.getInputProps("title")} />
                    <Textarea required mb={12} label="Content" placeholder='Explain about your poll' {...form.getInputProps("content")} />
                    <ColorInput defaultValue='#fa5c5c' required mb={12} label="Poll colour" {...form.getInputProps("colour")} />
                    <div className='w-full'>
                        <div className='flex gap-1'>
                            <TextInput value={optInput} onChange={e => setOptInput(e.target.value)} className='option w-2/3' required={options.length >= 2 ? false : true} mb={12} label='Options' placeholder='Poll option' />
                            <ColorInput value={optColour} onChange={setOptColour} className='w-1/3' required mb={12} label="Colour" />
                        </div>
                        <div className='flex flex-wrap gap-2 rounded my-2 bg-slate-100 px-1 py-2'>
                            {options.map(({ choice }, index) => (
                                <Badge onClick={() => deleteChoice(index)} key={index} className='group cursor-pointer hover:bg-rose-500' color='red' variant='dot'>
                                    <label className={`cursor-pointer block group-hover:hidden`}>{choice}</label>
                                    <label className={`cursor-pointer hidden group-hover:block text-white`}>delete</label>
                                </Badge>
                            ))}
                        </div>
                        <Button onClick={insertOption} mb={12} className='cursor-pointer transition duration-300 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500' variant="outline" color="red">
                            Add option
                        </Button>
                    </div>

                    <Button disabled={options.length >= 2 ? false : true} type='submit' uppercase className='w-full cursor-pointer transition duration-300 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500' variant="outline" color="red">
                        create this poll
                    </Button>
                </form>
            </Modal>

            <Button onClick={() => setOpenModal(true)} uppercase className='cursor-pointer transition duration-300 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500' variant="outline" color="red">
                create poll
            </Button>
        </>
    )
}