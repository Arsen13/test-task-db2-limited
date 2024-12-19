const Form = () => {
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
            />
            </div>
        </form>
    )
}

export default Form