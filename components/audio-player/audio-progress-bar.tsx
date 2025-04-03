import React, { useEffect, useMemo, useState } from "react";
import { useMusic } from "@/context/music-context";
import { Slider } from "../ui/slider";
import { useMusicController } from "@/hooks/useControllerMuiscStore";

const AudioProgressBar = () => {
  const { musicData, audioRef } = useMusic();
  const { isPlaying } = useMusicController();
  const [currentTime, setCurrentTime] = useState<string>("0");
  const [value, setValue] = useState<number>(0);

  const calculateTime = useMemo(
    () => (time?: number) => {
      const duration = time ?? musicData?.duration ?? 0;
      const m = Math.floor(duration / 60);
      const s = Math.floor(duration % 60);
      return `${m}:${s < 10 ? `0${s}` : s}`;
    },
    [musicData?.duration]
  );

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        setValue(audioRef.current.currentTime);
        setCurrentTime(calculateTime(audioRef.current.currentTime));
      }
    };

    const interval = setInterval(updateProgress, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, value]);
  
  
  const handleDrag = (val: number[]) => {
    const newTime = val[0];
    setValue(newTime);
    setCurrentTime(calculateTime(newTime));

    if (audioRef.current) {
      audioRef.current.currentTime = newTime; // Sync audio with slider
    }
  };

  return (
    <div className="px-10 -translate-y-10">
      <Slider
        value={[value]}
        max={musicData?.duration || 0}
        step={1}
        onValueChange={handleDrag}
      />

      <div className="flex text-xs justify-between mt-2">
        <span>{currentTime}</span>
        <span>{calculateTime()}</span>
      </div>
    </div>
  );
};

export default AudioProgressBar;
