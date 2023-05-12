import { Poll } from '@/types/interfaces';
import { Badge } from '@mantine/core';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { CLIENT_HOST } from './Navbar';
import { roboto } from '@/pages/_app';

interface Props extends Poll {
    updateFilterUI: (tag: string) => void
}

function PollCard({ id, title, content, colour, tags, updateFilterUI }: Props) {

    const router = useRouter()

    const filterTag = (e: MouseEvent<HTMLButtonElement>, tag: string) => {
        e.stopPropagation()
        updateFilterUI(tag)
    }

    const goToPollPage = (e: MouseEvent<HTMLDivElement>, id: string) => {
        e.stopPropagation()
        router.push(`${CLIENT_HOST}/poll/${id}`)
    }

    return (
        <div onClick={e => goToPollPage(e, id)} className={`w-80 rounded-lg drop-shadow-md hover:drop-shadow-xl bg-white flex flex-col justify-between cursor-pointer`}>

            <div className='h-32 rounded-t-lg' style={{ backgroundColor: colour }}></div>

            <div className='h-full flex flex-col justify-between px-3 py-4'>
                <div>
                    <h1 className='text-slate-700 font-bold break-words w-3/4'>{title}</h1>
                    <p className='text-slate-600 font-semibold'>{content}</p>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                    {tags.map((tag: string, index: number) => (
                        <button onClick={e => filterTag(e, tag)} key={`polltag_${index}`} >
                            <Badge color="red" variant="outline" className={`${roboto.className} cursor-pointer hover:text-white hover:bg-gradient-to-r from-red-400 to-rose-400`}>
                                {tag}
                            </Badge>
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default PollCard