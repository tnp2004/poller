import { Poll } from '@/types/interfaces';
import { Badge, Button } from '@mantine/core';

interface Props extends Poll { }

function PollCard({ title, content }: Props) {
    return (
        <div className='w-80 h-fit rounded-lg overflow-hidden drop-shadow-md hover:drop-shadow-xl bg-white'>
            <div className='h-32 bg-gradient-to-r from-red-500 to-rose-600'></div>
            <div className='p-2'>
                <div className='relative pr-1'>
                    <h1 className='text-slate-700 font-bold break-words w-3/4'>{title}</h1>
                    <Badge color="red" variant="outline" className='absolute top-4 right-2 cursor-pointer hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500'>
                        hihi
                    </Badge>
                </div>
                <p className='text-slate-600 font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem omnis impedit aperiam voluptates illo amet? Praesentium cupiditate atque quod, voluptatibus error excepturi quae maxime consequatur sunt sit. Debitis, minima totam?</p>
                {/* <button className='border-2 rounded-md py-1 my-1 w-full text-rose-500 font-semibold hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500 border-red-500'>Go to vote</button> */}
                <Button uppercase className='w-full my-2 cursor-pointer transition duration-300 hover:text-white hover:bg-gradient-to-r from-red-500 to-rose-500' variant="outline" color="red">
                    vote a poll
                </Button>
            </div>
        </div>
    );
}

export default PollCard