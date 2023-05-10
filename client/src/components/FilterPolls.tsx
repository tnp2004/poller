import { Badge, Button, Menu, rem } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { IconFilter } from '@tabler/icons-react'
import { POLLTAGS } from './FormCreatePoll'
import { useRouter } from 'next/router'

type Props = {}

interface Tag {
    name: string,
    select: boolean
}

export default function FilterPolls({ }: Props) {

    const router = useRouter()
    const { tags } = router.query

    const [filterTagsData, setFilterTagsData] = useState<Tag[]>([])

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

    const searchTags = () => {
        const selected = filterTagsData.filter(tag => tag.select).map(tag => tag.name)
        const urlQuery = selected.length !== 0 ? selected.join(',') : 'all'
        router.push(`http://localhost:3000/poll?tags=${urlQuery}`)
    }

    useEffect(() => {
        if (tags) {
            const urlTags: string[] = String(tags).split(',')
            const filterTags = POLLTAGS.map((tag: string): Tag => {
                return {
                    name: tag,
                    select: urlTags.includes(tag)
                }
            })
            setFilterTagsData(filterTags)
        }
    }, [tags])

    useEffect(() => {
        if (tags) searchTags()
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