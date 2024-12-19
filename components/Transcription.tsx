import { TranscriptType } from "@/app/page"
import { FaRegCopy } from "react-icons/fa6";

const Transcription = ({ transcription }: {transcription: TranscriptType}) => {
    return (
        <div className="border-2 border-slate-400 border-dashed rounded-lg p-3 flex gap-3 justify-between">
            {transcription.transcript.length > 300 
                ? (
                    <p className="text-sm text-slate-600">
                        {transcription.transcript.slice(0, 300)}...
                    </p>
                )
                : (
                    <p className="text-sm text-slate-600">
                        {transcription.transcript}
                    </p>
                )
                }

            <div 
                className="copy_btn cursor-pointer rounded-full"
                onClick={() => navigator.clipboard.writeText(transcription.transcript)}
            >
                <FaRegCopy className="w-4 h-4" />
            </div>
        </div>
    )
}

export default Transcription