"use client"
import {useEffect, useState} from "react";
import {MultiStepLoader} from "@/_components/loader-step";
import AudioPlayerWrapper from "@/_components/audio-player/audio-player-wrapper";



function AudioPlayer() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 6200);

        return () => clearTimeout(timeout);
    }, []);


    return (
        <div className="shadow-xl overflow-hidden shadow-gray-600/10 rounded-3xl w-80 sm:w-96 h-[360px] sm:h-[400px] ">
            {loading ? <MultiStepLoader loadingStates={loadingStates} loading={loading} duration={1700}/>
                :
                <AudioPlayerWrapper/>
            }
        </div>
    )
        ;
}

export default AudioPlayer;


const loadingStates = [
    {
        text: "Welcome 👋🏻",
    },
    {
        text: "Wanna be happy?",
    },
    {
        text: "Prepping joy in 3... 2... 1...",
    },
    {
        text: "A sound journey begins 🎧",
    },
];
