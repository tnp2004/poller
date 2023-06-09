import { SERVER_HOST } from '@/pages/poll'
import { FormPoll, Options, Poll } from '@/types/interfaces'
import { ActionIcon, Badge, Button, ColorInput, Modal, MultiSelect, TextInput, Textarea, rem } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { KeyedMutator } from 'swr'
import { IconX, IconBox } from '@tabler/icons-react';
import { roboto } from '@/pages/_app'

type Props = {
    mutate: KeyedMutator<Poll[]>
}

export const POLLTAGS = ["Entertainment", "Sports", "Politics", "Food", "Animals", "Technology", "Fashion", "Travel", "Education", "Health", "Environment"];

export default function FormCreatePoll({ mutate }: Props) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [optInput, setOptInput] = useState<string>('')
    const [optColour, setOptColour] = useState<string>('#fa5c5c')
    const [options, setOptions] = useState<Options[]>([])

    const form = useForm({
        initialValues: {
            title: '',
            content: '',
            colour: '#fa5c5c',
            options: [],
            tags: []
        }
    })

    const insertOption = () => {
        if (optInput && optColour) {
            const option = {
                choice: optInput,
                colour: optColour,
                point: 0
            }

            setOptions(prev => [...prev, option])
            setOptInput('')
        }
    }

    const insertPoll = async (values: FormPoll) => {
        values.options = options
        const updated = await fetch(`${SERVER_HOST}/api/poll/new`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then(r => r.json())
        mutate(updated)
        form.reset()
        setOpenModal(false)
        setOptions([])
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

    const removeButton = (index: number) => {
        return (
            <ActionIcon onClick={() => deleteChoice(index)} size="xs" color="gray" radius="xl" variant="transparent">
                <IconX size={rem(10)} />
            </ActionIcon>
        );
    }

    const choiceColor = (colour: string) => {
        return <ActionIcon>
            <IconBox color={colour} size={rem(15)} />
        </ActionIcon>
    }

    return (
        <>
            <Modal opened={openModal} onClose={() => setOpenModal(false)} title="Create Poll" className={`${roboto.className}`} >
                <form onSubmit={form.onSubmit(insertPoll)}>

                    <TextInput required mb={12} label="Title" placeholder='What poll do you want to create' {...form.getInputProps("title")} />
                    <Textarea required mb={12} label="Content" placeholder='Explain about your poll' {...form.getInputProps("content")} />
                    <ColorInput defaultValue='#fa5c5c' required mb={12} label="Poll colour" {...form.getInputProps("colour")} format="hex" swatches={['#25262b', '#868e96', '#fa5c5c', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']} />
                    <MultiSelect data={POLLTAGS} mb={12} label='Tags' placeholder='What kind of your poll ?' {...form.getInputProps("tags")} />

                    <div className='w-full'>
                        <div className='flex gap-1'>
                            <TextInput value={optInput} onChange={e => setOptInput(e.target.value)} className='option w-2/3' required={options.length >= 2 ? false : true} mb={12} label='Options' placeholder='Poll option' />
                            <ColorInput value={optColour} onChange={setOptColour} className='w-1/3' required mb={12} label="Colour" format="hex" swatches={['#25262b', '#868e96', '#fa5c5c', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']} />
                        </div>
                        <div className='flex flex-wrap gap-2 rounded my-2 bg-slate-100 px-1 py-2'>
                            {options.map(({ choice, colour }, index) => (
                                <Badge key={index} p={3} leftSection={choiceColor(colour)} rightSection={removeButton(index)} className='cursor-pointer' color="gray" style={{ border: `1px solid ${colour}`, color: colour}}>
                                    <label className={`cursor-pointer`}>{choice}</label>
                                </Badge>
                            ))}
                        </div>
                        <Button onClick={insertOption} mb={12} className={`${roboto.className} cursor-pointer transition duration-300 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500`} variant="outline" color="red">
                            Add option
                        </Button>
                    </div>

                    <Button disabled={options.length >= 2 ? false : true} type='submit' uppercase className={`${roboto.className} w-full cursor-pointer transition duration-300 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500`} variant="outline" color="red">
                        create this poll
                    </Button>

                </form>
            </Modal>

            <Button onClick={() => setOpenModal(true)} uppercase className={`${roboto.className} cursor-pointer transition duration-300 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500`} variant="outline" color="red">
                create poll
            </Button>
        </>
    )
}