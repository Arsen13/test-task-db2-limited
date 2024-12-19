'use client';

import { TranscriptType } from "@/app/page";
import { useState } from "react";

const TranscriptedText = ({ transcript }: { transcript: TranscriptType }) => {

    const [showMore, setShowMore] = useState(false);

    return (
        <div className="w-full max-w-md flex flex-col border border-slate-400 rounded-xl">
            <div className="flex items-center justify-around gap-5 p-3">
                <p>
                    Duration
                    <span className="font-bold block">{transcript.duration.toFixed(2)}</span>
                </p>
                <p>
                    Words
                    <span className="font-bold block">{transcript.words}</span>
                </p>
            </div>

            <div className="p-3 text-sm text-slate-600">
                {!showMore ? (
                    <p>
                        {transcript.transcript.slice(0, 500)}...
                    </p>
                ): (
                    <p>
                        {transcript.transcript}
                    </p>
                )}
            </div>

            <div className="flex justify-between px-5 py-3">
                <button
                    onClick={() => setShowMore(prev => !prev)}
                    className="text-md text-blue-600 cursor-pointer"
                >
                    {showMore ? 'Show less' : 'Show more'}
                </button>

                <button
                    onClick={() => {navigator.clipboard.writeText(transcript.transcript)}}
                    className="bg-blue-700 px-3 py-2 border-none rounded-lg text-white"
                >
                    Copy Transcription
                </button>
            </div>
        </div>
    )
}

export default TranscriptedText