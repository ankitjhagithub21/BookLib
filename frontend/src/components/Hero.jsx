

const Hero = () => {
  return (
    <div className="h-[70vh] overflow-hidden w-full relative">
        <div className="absolute top-0 left-0 h-full w-full overlay z-20 overlay flex flex-col items-center justify-center">
            <h1 className="lg:text-5xl p-5 text-3xl font-semibold leading-tight text-center max-w-5xl">Share your <span className="text-orange-500">favorite</span> books and <span className="text-orange-500">discover</span> new ones from readers like you</h1>
            <div className="flex w-full max-w-xl bg-white rounded-lg overflow-hidden p-1">
                <input type="text" placeholder="Search books" className="outline-none pl-2 text-gray-800 w-full placeholder-gray-400" />
                <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">Search</button>
            </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full -z-20 inset-0">
            <video src="./bg_video.mp4" autoPlay muted loop className="object-cover h-[70vh] w-full object-center"></video>
        </div>
    </div>
  )
}

export default Hero