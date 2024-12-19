'use client';

import { useState } from "react";

const TranscriptedText = () => {

    const [showMore, setShowMore] = useState(false);

    return (
        <div className="w-full max-w-md flex flex-col border border-slate-400 rounded-xl">
            <div className="flex items-center justify-around gap-5 p-3">
                <p>
                    Language
                    <span className="font-bold block">ukraininan</span>
                </p>
                <p>
                    Duration
                    <span className="font-bold block">47.8s</span>
                </p>
                <p>
                    Words
                    <span className="font-bold block">1,369</span>
                </p>
            </div>

            <div className="p-3 text-sm text-slate-600">
                {!showMore ? (
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt eaque animi, architecto, quia reiciendis consequatur nemo saepe accusantium soluta est vero molestias voluptatem fugiat. Quaerat impedit nobis explicabo provident magnam.</p>
                ): (
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ullam voluptas, mollitia deleniti quia magni quae cum dolorem dolores aspernatur reprehenderit fugiat inventore numquam qui perspiciatis asperiores illum eius culpa.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ullam voluptas, mollitia deleniti quia magni quae cum dolorem dolores aspernatur reprehenderit fugiat inventore numquam qui perspiciatis asperiores illum eius culpa.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ullam voluptas, mollitia deleniti quia magni quae cum dolorem dolores aspernatur reprehenderit fugiat inventore numquam qui perspiciatis asperiores illum eius culpa.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ullam voluptas, mollitia deleniti quia magni quae cum dolorem dolores aspernatur reprehenderit fugiat inventore numquam qui perspiciatis asperiores illum eius culpa.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ullam voluptas, mollitia deleniti quia magni quae cum dolorem dolores aspernatur reprehenderit fugiat inventore numquam qui perspiciatis asperiores illum eius culpa.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ullam voluptas, mollitia deleniti quia magni quae cum dolorem dolores aspernatur reprehenderit fugiat inventore numquam qui perspiciatis asperiores illum eius culpa.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error ullam voluptas, mollitia deleniti quia magni quae cum dolorem dolores aspernatur reprehenderit fugiat inventore numquam qui perspiciatis asperiores illum eius culpa.
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
                    onClick={() => {}}
                    className="bg-blue-700 px-3 py-2 border-none rounded-lg text-white"
                >
                    Copy Transcription
                </button>
            </div>
        </div>
    )
}

export default TranscriptedText