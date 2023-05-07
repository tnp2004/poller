import { Button, Menu, rem } from '@mantine/core'
import React from 'react'
import { IconFilter } from '@tabler/icons-react'

type Props = {}

export default function FilterPolls({}: Props) {
  return (
    <Menu >
        <Menu.Target>
            <Button uppercase className='cursor-pointer transition duration-300 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500' variant="outline" color="red">
                <IconFilter size={rem(18)} /> Filter
                </Button>
        </Menu.Target>

        <Menu.Dropdown>
            <Menu.Label>Filter tags</Menu.Label>
        </Menu.Dropdown>
    </Menu>
    )
}