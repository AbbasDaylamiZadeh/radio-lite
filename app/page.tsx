import AudioPlayer from "@/_components/audio-player/audio-player";
import {MusicProvider} from "@/context/music-context";

export default function Home() {




    return (
        <div className="w-full h-dvh flex justify-center items-center bg-gradient-to-b  from-neutral-900 to-zinc-800">
            <MusicProvider>
                <AudioPlayer/>
            </MusicProvider>
        </div>
    );
}
