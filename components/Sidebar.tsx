import { TranscriptType } from "@/app/page"
import Transcription from "./Transcription"

type SidebarProps = {
    transcriptions: TranscriptType[] 
};

const Sidebar = ({ transcriptions }: SidebarProps) => {
    return (
        <div className="w-72 h-screen flex flex-col gap-5 pt-5 px-2 overflow-auto">
            <h3 className="font-semibold ml-2 text-slate-700">
                Previous transcriptions:
            </h3>
            {transcriptions.map((transcription) => (
                <Transcription key={transcription.id} transcription={transcription} />
            ))}
        </div>
    )
}

export default Sidebar