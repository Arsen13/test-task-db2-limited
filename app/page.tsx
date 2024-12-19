import Form from "@/components/Form";
import TranscriptedText from "@/components/TranscriptedText";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const transcriptedText = false;
  const previousTranscriptions = false;

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

          <Form />

          {transcriptedText && (
            <TranscriptedText />
          )}
        </div>
      </main>
    </>
);
}
