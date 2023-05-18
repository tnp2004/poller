export default function Home() {
  return (
    <div className="h-[94.8vh] flex flex-col justify-center items-center p-2">
      <div className="bg-slate-300 p-4 rounded-full md:rounded-xl bg-opacity-40 my-5 drop-shadow-2xl">
        <h1 className="text-6xl font-bold text-center bg-gradient-to-t from-slate-700 to-slate-800 text-transparent bg-clip-text">
          what is <span className="bg-gradient-to-r from-red-500 to-rose-500 text-transparent bg-clip-text text-7xl">poller</span></h1>
      </div>
      <div className="p-4 rounded-xl bg-opacity-40 my-5 drop-shadow-xl md:w-2/3">
        <h2 className="text-center text-4xl font-bold bg-gradient-to-t from-slate-700 to-slate-800 text-transparent bg-clip-text">
          It&apos;s a website that allows everyone to express their opinions about everything
        </h2>
      </div>
    </div>
  )
}
