import Form from "@/components/Form";
import TranscriptedText from "@/components/TranscriptedText";

export default function Home() {
  const transcriptedText = true;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-semibold">
        Audio Transcription
      </h1>
      
      <Form />

      {transcriptedText && (
        <TranscriptedText />
      )}
    </div>
  );
}
