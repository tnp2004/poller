import { Badge, Button, Menu, rem } from '@mantine/core'
import React, { useState } from 'react'
import { IconFilter } from '@tabler/icons-react'
import { POLLTAGS } from './FormCreatePoll'

type Props = {}

interface Tag {
    name: string,
    select: boolean
}

const filterTags = POLLTAGS.map((tag: string): Tag => {
    return {
        name: tag,
        select: false
    }
})

export default function FilterPolls({ }: Props) {

    const [filterTagsData, setFilterTagsData] = useState<Tag[]>(filterTags)

    const updateTagValue = (index: number) => {
       const newTagsArr = filterTagsData
       newTagsArr[index].select = !newTagsArr[index].select

       setFilterTagsData(newTagsArr)
    }

    const searchTags = (index: number) => {
        updateTagValue(index)
        console.log(filterTagsData)
    }

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
                        <Badge onClick={() => searchTags(index)} className={`cursor-pointer ${tag.select ? 'bg-rose-100' : 'bg-emerald-100'}`} color='gray' key={`tag_${index}`}>{tag.name}</Badge>
                    ))}
                </div>
            </Menu.Dropdown>
        </Menu>
    )
}