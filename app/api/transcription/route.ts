import { prisma } from "@/lib/prisma";
import { createClient } from "@deepgram/sdk";

export async function POST(req: any) {
    try {
        const formData = await req.formData();

        const file = formData.get('file');
        const user = JSON.parse(formData.get('user'));

        console.log(file);
        console.log(user.id);

        if (!file || !(file instanceof Blob)) {
            return new Response("You must provide form data", { status: 404 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());
        
        const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

        const { result, error } = await deepgram.listen.prerecorded.transcribeFile(fileBuffer, {
                model: "nova-2",
                smart_format: true,
            });
        
        if (error) throw error;

        const transcript = result.results.channels[0].alternatives[0].transcript;
        const duration = result.metadata.duration;
        const words = transcript.split(' ').length;

        const newTranscription = await prisma.transcription.create({
            data: {
                user_id: user.id,
                transcript,
                duration,
                words,
            }
        })

        return new Response(JSON.stringify(newTranscription), { status: 200 })
    
    } catch (error) {
        console.log(error);
        return new Response("Internal server error", { status: 500 })
    }
}