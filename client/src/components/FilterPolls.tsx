import { Badge, Button, Menu, rem } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { IconFilter } from '@tabler/icons-react'
import { POLLTAGS } from './FormCreatePoll'
import { roboto } from '@/pages/_app'

type Props = {
    getFilteredPolls: (tags: string) => void
    filterUI: string
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

export default function FilterPolls({ getFilteredPolls, filterUI }: Props) {
    const [filterTagsData, setFilterTagsData] = useState<Tag[]>(pollData)

    const updateTagValue = (tagName: string, active?: boolean) => {
        const newTagsArr = filterTagsData.map(tag => {
            if (tag.name === tagName) {
                return {
                    name: tag.name,
                    select: active || !tag.select
                };
            }

            return tag
        });
        setFilterTagsData(newTagsArr)
    }

    const clearAllTags = () => {
        setFilterTagsData(pollData)
    }

    useEffect(() => {
        const urlQuery = filterTagsData.filter(tag => tag.select).map(tag => tag.name).join(',')
        getFilteredPolls(urlQuery)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterTagsData])

    useEffect(() => {
        if (filterUI) updateTagValue(filterUI, true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterUI])

    return (
        <Menu >
            <Menu.Target>
                <Button uppercase className={`${roboto.className} cursor-pointer transition duration-300 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500`} variant="outline" color="red">
                    <IconFilter size={rem(18)} /> Filter
                </Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Filter tags</Menu.Label>
                <div className='flex flex-wrap gap-1 w-60'>
                    {filterTagsData.map((tag, index) => (
                        <Badge onClick={() => updateTagValue(tag.name)} className={`${roboto.className} hover:bg-rose-400 hover:text-white cursor-pointer ${tag.select ? 'bg-red-400 text-white' : ''}`} color='gray' key={`tag_${index}`}>{tag.name}</Badge>
                    ))}
                </div>
                    <Button onClick={clearAllTags} className={`${roboto.className} mt-2 w-full hover:bg-slate-100`} variant='outline' color='gray' uppercase>Clear</Button>
            </Menu.Dropdown>
        </Menu>
    )
}