"use client";
import { MusicData } from "@/_components/audio-player/types";
import useMusicListStore from "@/hooks/useMusicListStore";
import { fetchNowPlayingMusic } from "@/services/get_music_api";
import React, { createContext, useEffect, useRef, useState } from "react";
import {useMusicController} from "@/hooks/useMusicControllerStore";

interface MusicContextType {
  musicData: MusicData | null;
  setMusicData: React.Dispatch<React.SetStateAction<MusicData | null>>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  sourceRef :React.RefObject<HTMLSourceElement | null>
  
}

// Create context
const MusicContext = createContext<MusicContextType | undefined>(undefined);

// Provider component
export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [musicData, setMusicData] = useState<MusicData | null>(null);
  const audioRef = useRef<HTMLAudioElement>(
    null as unknown as HTMLAudioElement
  );


  const sourceRef = useRef<HTMLSourceElement | null>(null);


  const { get_music_ids, update_music_ids,reset_music_ids,} = useMusicListStore();


  useEffect(() => {
    const get_ids_listened_before = get_music_ids();

    const fetchData = async () => {
      try {
        let response = await fetchNowPlayingMusic({
          played_ids: get_ids_listened_before,
        });

        if (response.GetMusicResponseStatusMessage === "NotFound Music") {
          reset_music_ids();
          response = await fetchNowPlayingMusic({ played_ids: [] });
        }
        update_music_ids(response.data?.id);
        setMusicData(response.data);
       
      } catch (error) {
        console.error("Error in fetching music:", error);
      }
    };

    fetchData();
  }, []);


  const nextMusicAtTheEndOfMusic=async()=>{
    const get_ids_listened_before = get_music_ids();
    try {
      let response = await fetchNowPlayingMusic({
        played_ids: get_ids_listened_before,
      });
      console.log( get_ids_listened_before )
      if (response.GetMusicResponseStatusMessage === "NotFound Music") {
        reset_music_ids();
        response = await fetchNowPlayingMusic({ played_ids: [] });
      }
      update_music_ids(response.data?.id);
      setMusicData(response.data);
      if (sourceRef.current) {
        sourceRef.current.src = response.data.url;
      }
      audioRef.current.load();
      audioRef.current.play().catch((err) => console.error("Playback error:", err));


    } catch (error) {
      console.error("Error in fetching music:", error);
    }
  };



  return (
    <MusicContext
      value={{
        musicData,
        setMusicData,
        audioRef: audioRef as React.RefObject<HTMLAudioElement>,
        sourceRef,
      }}
    >
      {children}
      {musicData && (
        <audio
          ref={audioRef}
          className="hidden"
          onEnded={() => nextMusicAtTheEndOfMusic()}
        >
          <source ref={sourceRef} src={musicData.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </MusicContext>
  );
};

export const useMusic = () => {
  const context = React.use(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
