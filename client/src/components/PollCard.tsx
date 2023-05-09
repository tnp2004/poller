import { Poll } from '@/types/interfaces';
import { Badge } from '@mantine/core';
import Link from 'next/link';

interface Props extends Poll { }

function PollCard({ id, title, content, colour, tags }: Props) {

    return (
            <Link href={`/poll/${id}`} onClick={e => e.stopPropagation()} className='w-80 rounded-lg drop-shadow-md hover:drop-shadow-xl bg-white flex flex-col justify-between cursor-pointer'>

                <div className='h-32 rounded-t-lg' style={{ backgroundColor: colour }}></div>

                <div className='h-full flex flex-col justify-between px-3 py-4'>
                    <div>
                        <h1 className='text-slate-700 font-bold break-words w-3/4'>{title}</h1>
                        <p className='text-slate-600 font-semibold'>{content}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                        {tags.map(tag => (
                            <Link href={`/poll?tags=${tag}`} onClick={e => e.stopPropagation()}>
                                <Badge color="red" variant="outline" className='cursor-pointer hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500'>
                                    {tag}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                </div>

            </Link>
    );
}

export default PollCard