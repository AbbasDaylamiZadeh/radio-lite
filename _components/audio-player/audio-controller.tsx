import React from "react";
import { Button } from "../ui/button";

import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { useMusicController } from "@/hooks/useMusicControllerStore";
import AutoStopTimer from "@/_components/audio-player/auto-stop-timer";

const AudioController = () => {

const {handleNextMusic,handlePlayPause,isPlaying}=useMusicController()



  return (
    <div className="flex translate-y-2 sm:translate-y-4  items-center gap-2">
      <Button
        variant="outline"
        className="border-none size-8 sm:size-10 rounded-full  text-white group"
        size="icon"
        onClick={()=>handlePlayPause()}
      >
        {isPlaying ? (
          <FaCirclePause className="size-8 group-hover:size-9" />
        ) : (
          <FaCirclePlay className="size-8 group-hover:size-9" />
        )}
      </Button>
      <Button
        variant="outline"
        className="border-none size-8 sm:size-10  transition-all duration-150 rounded-full text-white  group"
        size="icon"
        onClick={()=>handleNextMusic()}
      >
        <BiSolidSkipNextCircle className="size-7 group-hover:size-8" />
      </Button>
        <AutoStopTimer/>
    </div>
  );
};

export default AudioController;
