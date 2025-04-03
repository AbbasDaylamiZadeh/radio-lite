"use client"
import LikedButton from "./liked-button";
import Thumbnail from "./thumbnail";
import MusicTitle from "./music-title";
import { useMusic } from "@/context/music-context";
import AudioProgressBar from "./audio-progress-bar";


function AudioPlayer() {
  const { musicData } = useMusic();

  return (
    <div className="shadow-xl overflow-hidden shadow-gray-600/10 rounded-3xl w-96 h-[400px] ">
      <header className="h-52 relative ">
        <div className="pt-5 px-5 absolute w-full z-10">
          <LikedButton />
        </div>

        <Thumbnail
          imageUrl={musicData?.cover || "/"}
          alt={musicData?.title || "image"}
        />
      </header>
      <div className="p-3">
        <div className="flex items-center -translate-y-20">
          <Thumbnail
            isBigCover={false}
            imageUrl={musicData?.cover || "/"}
            alt={musicData?.title || "image"}
          />

          <div className="flex ml-3 flex-col gap-y-3 -translate-y-2">
            <MusicTitle
              title={musicData?.title || ""}
              artist={musicData?.artist || ""}
            />
          </div>
        </div>
      </div>
      <AudioProgressBar />
    </div>
  );
}

export default AudioPlayer;
