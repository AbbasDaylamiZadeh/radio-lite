import React from 'react';
import LikedButton from "@/_components/audio-player/liked-button";
import Thumbnail from "@/_components/audio-player/thumbnail";
import ImageSkeleton from "@/_components/image-skeleton";
import MusicTitle from "@/_components/audio-player/music-title";
import TrackInfoSkeleton from "@/_components/track-info-skeleton";
import AudioProgressBar from "@/_components/audio-player/audio-progress-bar";
import {useMusic} from "@/context/music-context";

const AudioPlayerWrapper = () => {

    const {musicData} = useMusic();

    return (
        <>
            <header className="h-52 relative ">
                <div className="pt-5 px-5 absolute w-full z-10">
                    <LikedButton/>
                </div>
                {musicData ?
                    <Thumbnail
                        imageUrl={musicData?.cover}
                        alt={musicData?.title || "image"}
                    /> : <ImageSkeleton/>}
            </header>
            <div className="p-3">
                <div className="flex items-center -translate-y-20">

                    {musicData ?
                        <Thumbnail
                            isBigCover={false}
                            imageUrl={musicData?.cover}
                            alt={musicData?.title || "image"}
                        />
                        : <ImageSkeleton isBigCover={false}/>}


                    <div className="flex ml-3 flex-col gap-y-2 sm:gap-y-3 sm:-translate-y-2">
                        {musicData ?
                            <MusicTitle
                                title={musicData?.title || ""}
                                artist={musicData?.artist || ""}
                            /> : <TrackInfoSkeleton/>}
                    </div>
                </div>
            </div>
            <AudioProgressBar/>
        </>
    );
};

export default AudioPlayerWrapper;