import { Badge, Button, Menu, rem } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { IconFilter } from '@tabler/icons-react'
import { POLLTAGS } from './FormCreatePoll'

type Props = {
    getFilteredPolls: (tags: string) => void
}

interface Tag {
    name: string,
    select: boolean
}

const pollData = POLLTAGS.map(poll => {
    return {
        name: poll,
        select: false
    }
})

export default function FilterPolls({ getFilteredPolls }: Props) {
    const [filterTagsData, setFilterTagsData] = useState<Tag[]>(pollData)

    const updateTagValue = (tagName: string) => {
        const newTagsArr = filterTagsData.map(tag => {
            if (tag.name === tagName) {
                return {
                    name: tag.name,
                    select: !tag.select
                };
            }

            return tag
        });
        setFilterTagsData(newTagsArr)
    }

    useEffect(() => {
        const urlQuery = filterTagsData.filter(tag => tag.select).map(tag => tag.name).join(',')
        getFilteredPolls(urlQuery)
    }, [filterTagsData])

    return (
        <Menu >
            <Menu.Target>
                <Button uppercase className='cursor-pointer transition duration-300 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500' variant="outline" color="red">
                    <IconFilter size={rem(18)} /> Filter
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Filter tags</Menu.Label>
                <div className='flex flex-wrap gap-1 w-60'>
                    {filterTagsData.map((tag, index) => (
                        <Badge onClick={() => updateTagValue(tag.name)} className={`hover:bg-red-300 hover:text-white cursor-pointer ${tag.select ? 'bg-red-400 text-white' : ''}`} color='gray' key={`tag_${index}`}>{tag.name}</Badge>
                    ))}
                </div>
            </Menu.Dropdown>
        </Menu>
    )
}