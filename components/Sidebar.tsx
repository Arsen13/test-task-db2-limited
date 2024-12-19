import Transcription from "./Transcription"

const Sidebar = () => {
    return (
        <div className="w-72 h-screen flex flex-col gap-5 pt-5 px-2 overflow-auto">
            <h3 className="font-semibold ml-2 text-slate-700">
                Previous transcriptions:
            </h3>
            <Transcription />
            <Transcription />
            <Transcription />
        </div>
    )
}

export default Sidebar