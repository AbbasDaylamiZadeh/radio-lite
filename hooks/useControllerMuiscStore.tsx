import { useMusic } from "@/context/music-context";
import { fetchNowPlayingMusic } from "@/services/get_music_api";
import { useCallback, useState } from "react";
import useMusicListStore from "./useMusicListStore";

export const useMusicController = () => {

  const { musicData, audioRef, setMusicData, sourceRef } = useMusic();
  const { update_music_ids, get_music_ids, reset_music_ids } = useMusicListStore();

  const[isPlaying,setIsPlaying]=useState(false)
  // Derived state instead of useState

  const handlePlayPause = useCallback(() => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {

      setIsPlaying(true)
      audioRef.current.play().catch((err) => console.error("Playback error:", err));
    } else {
      setIsPlaying(false)
      audioRef.current.pause();

    }
  }, []);

  const handleNextMusic = useCallback(async () => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    
    const playedIds = get_music_ids();
    try {
      let response = await fetchNowPlayingMusic({ played_ids: playedIds });

      if (response.GetMusicResponseStatusMessage === "NotFound Music") {
        reset_music_ids();
        response = await fetchNowPlayingMusic({ played_ids: [1] });
      }

      if (response.data) {
        update_music_ids(response.data.id);
        setMusicData(response.data);

        if (sourceRef.current) {
          sourceRef.current.src = response.data.url;
        }

        audioRef.current.load();
        audioRef.current.play().catch((err) => console.error("Playback error:", err));
      }
    } catch (error) {
      console.error("Error fetching music:", error);
    }
  }, [get_music_ids, reset_music_ids, update_music_ids, setMusicData]);

  return {
    isPlaying,
    musicData,
    audioRef,
    handlePlayPause,
    handleNextMusic,
  };
};
