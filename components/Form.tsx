'use client';

import { TranscriptType, UserType } from "@/app/page";
import { useState } from "react";

type FormProps = {
    user: UserType,
    setTranscript: React.Dispatch<React.SetStateAction<TranscriptType | null>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Form = ({ user, setTranscript, setLoading }: FormProps) => {

    const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (e.target.files) {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('file', e.target.files[0]);
                formData.append('user', JSON.stringify(user));
                
                const response = await fetch('http://localhost:3000/api/transcription', {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();
                setTranscript(data);

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
    } 

    return (
        <form>
            <div>
            <label htmlFor="inputFile">
                <p className="w-full border-2 border-dashed rounded-xl border-slate-400 py-6 px-16 text-sm text-slate-600">
                Drag and drop an audio file here, or click to select <br />
                Supported formats: MP3, WAV, M4A (max 25MB)
                </p>
            </label>
            <input 
                type="file"
                name="inputFile"
                id="inputFile"
                accept="audio/*;"
                className="hidden"
                onChange={handleInput}
            />
            </div>
        </form>
    )
}

export default Form