import Image from "next/image"

const Transcription = () => {
    return (
        <div className="border-2 border-slate-400 border-dashed rounded-lg p-3 relative">
            <p className="text-sm text-slate-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere natus pariatur ratione in, tenetur, eveniet perspiciatis aut deserunt doloribus incidunt amet, suscipit esse quam modi! Cumque quod ipsa corrupti dolorum!
            </p>

            <div className="copy_btn absolute top-2 right-2 cursor-pointer">
                <Image
                    src='/icons/copy.svg'
                    width={12}
                    height={12}
                    alt="Copy text icon"
                />
            </div>
        </div>
    )
}

export default Transcription