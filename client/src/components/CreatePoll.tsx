import { FormPoll, Options } from '@/types/interfaces'
import { Button, ColorInput, Modal, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'

type Props = {}


export default function CreatePoll({ }: Props) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [optInput, setOptInput] = useState<string>('')
    const [optColor, setOptColor] = useState<string>('#fa5c5c')
    const [options, setOptions] = useState<Options[]>([])

    const form = useForm({
        initialValues: {
            title: '',
            content: '',
            options: []
        }
    })

    const insertOption = () => {
        const option = {
            choice: optInput,
            color: optColor
        }

        setOptions(prev => [option, ...prev])
        setOptInput('')
    }

    const insertPoll = async (v: FormPoll) => {
        console.log(v)
        console.log(options)
    }


    return (
        <>
            <Modal opened={openModal} onClose={() => setOpenModal(false)} title="Create Poll">
                <form onSubmit={form.onSubmit(insertPoll)}>
                    <TextInput required mb={12} label="Title" placeholder='What poll do you want to create' {...form.getInputProps("title")} />
                    <Textarea required mb={12} label="Content" placeholder='Explain about your poll' {...form.getInputProps("content")} />
                    <div className='w-full'>
                        <div className='flex gap-1'>
                            <TextInput value={optInput} onChange={e => setOptInput(e.target.value)} className='option w-2/3' required={options.length >= 2 ? false : true} mb={12} label='Options' placeholder='Poll option' />
                            <ColorInput value={optColor} onChange={setOptColor} className='w-1/3' required mb={12} label="Color" />
                        </div>
                        <Button onClick={insertOption} mb={12} className='cursor-pointer transition duration-300 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500' variant="outline" color="red">
                            Add option
                        </Button>
                    </div>

                    <Button type='submit' uppercase className='w-full cursor-pointer transition duration-300 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500' variant="outline" color="red">
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