'use client';

import Form from "@/components/Form";
import TranscriptedText from "@/components/TranscriptedText";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";

export type UserType = {
  id: number,
  clerkId: string,
  email: string,
  username: string
};

export type TranscriptType = {
  id: number,
  duration: number,
  transcript: string,
  user_id: number,
  words: number
};

export type TransactionType = {
  id: number,
  user_id: number,
  stripe_id: string,
  amount_total: number,
  currency: string,
  customer_email: string,
  customer_name: string
};

export default function Home() {

  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [transcript, setTranscript] = useState<TranscriptType | null>(null);
  const [userTranscriptions, setUserTranscriptions] = useState<TranscriptType[] | null>(null);
  const [userTransactions, setUserTransactions] = useState<TransactionType[] | null>(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const getTranscriptions = async () => {
      if (currentUser) {
        const userId = new URLSearchParams({
          userId: JSON.stringify(currentUser.id)
        })
        
        const response = await fetch(`http://localhost:3000/api/transcription?${userId}`, {
          method: "GET",
        })
  
        const data = await response.json();

        setUserTranscriptions(data.transcriptions);
        setUserTransactions(data.transactions);
      }
    }

    getTranscriptions();
  }, [currentUser, transcript])

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

      {userTranscriptions && (
        <aside className="fixed top-0 left-0">
          <Sidebar 
            transcriptions={userTranscriptions}
          />
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
            prevTranscriptionsLength={userTranscriptions?.length}
            userTransactionsLength={userTransactions?.length}
          />

          {transcript && (
            <TranscriptedText transcript={transcript}/>
          )}

          {loading && (
            <div className="flex items-center gap-2 border rounded-lg px-6 py-2 pr-16 absolute bottom-3 right-3">
              <FaCircleInfo className="text-blue-500 w-5 h-5"/>
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
