import { Button, ColorInput, Modal, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'

type Props = {}


export default function CreatePoll({ }: Props) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [options, setOptions] = useState([1, 2])

    const form = useForm({
        initialValues: {
            title: '',
            content: '',
            option: {}
        }
    })

    const insertPoll = async () => {
        
    }


    return (
        <>
            <Modal opened={openModal} onClose={() => setOpenModal(false)} title="Create Poll">
                <form onSubmit={form.onSubmit(insertPoll)}>
                    <TextInput required mb={12} label="Title" placeholder='What poll do you want to create' {...form.getInputProps("title")} />
                    <Textarea required mb={12} label="Content" placeholder='Explain about your poll' {...form.getInputProps("content")} />
                    <div className='w-full'>
                        {options.map((val) => (
                            <div className='flex gap-1'>
                                <TextInput className='w-2/3' required={val > 2 ? false : true} mb={12} label={`Option ${val}`} placeholder='Poll option' />
                                <ColorInput defaultValue='#fa5c5c' className='w-1/3' required mb={12} label="Color" />
                            </div>
                        ))}
                        <Button onClick={() => setOptions(v => [...v, v.length + 1])} mb={12} className='cursor-pointer transition duration-300 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500' variant="outline" color="red">
                            New option
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