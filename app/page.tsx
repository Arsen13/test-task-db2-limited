'use client';

import Form from "@/components/Form";
import TranscriptedText from "@/components/TranscriptedText";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";

export type UserType = {
  id: number,
  clerkId: string,
  email: string,
  username: string
} | {};

export type TranscriptType = {
  id: number,
  duration: number,
  transcript: string,
  user_id: number,
  words: number
};

export default function Home() {

  const [currentUser, setCurrentUser] = useState<UserType>({});
  const [transcript, setTranscript] = useState<TranscriptType | null>(null)
  const [loading, setLoading] = useState(false);

  const previousTranscriptions = false;

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "GET"
      });

      const data = await response.json()

      setCurrentUser(data);
    }

    getUserInfo();
  }, [])

  return (
    <>
      <header className="flex flex-row-reverse mx-5 mt-5">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </header>

      {previousTranscriptions && (
        <aside className="fixed top-0 left-0">
          <Sidebar />
        </aside>
      )}

      <main className="flex items-center justify-center flex-grow mx-auto md:mx-auto">
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-2xl font-semibold">
            Audio Transcription
          </h1>

          <Form 
            user={currentUser} 
            setTranscript={setTranscript}
            setLoading={setLoading}
          />

          {transcript && (
            <TranscriptedText transcript={transcript}/>
          )}

          {loading && (
            <div className="border rounded-lg px-6 py-2 pr-16 absolute bottom-3 right-3">
              <p>
                Starting transcription...
              </p>
            </div>
          )}
        </div>
      </main>
    </>
);
}
