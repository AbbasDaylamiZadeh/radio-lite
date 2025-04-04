import {useMusic} from "@/context/music-context";
import {fetchNowPlayingMusic} from "@/services/get_music_api";
import {useCallback, useState, useEffect} from "react";
import useMusicListStore from "./useMusicListStore";

export const useMusicController = () => {

    const {musicData, audioRef, setMusicData, sourceRef} = useMusic();
    const {update_music_ids, get_music_ids, reset_music_ids} = useMusicListStore();

    const [isPlaying, setIsPlaying] = useState(false)


    useEffect(() => {
        if (!audioRef.current) return;
        
        const audio = audioRef.current;
        
        // Event handlers to keep isPlaying in sync with actual audio state
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);
        
        // Add event listeners
        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('ended', handleEnded);
        
        // Initial state sync
        setIsPlaying(!audio.paused);
        
        // Cleanup
        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [audioRef]);


    const handlePlayPause = useCallback(() => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current.play().catch((err) => console.error("Playback error:", err));
            setIsPlaying(true)
            return
        } else {
            audioRef.current.pause();
            setIsPlaying(false)
            return
        }


    }, [audioRef]);

    const handleNextMusic = useCallback(async () => {
        if (!audioRef.current) return;

        audioRef.current.pause();

        const playedIds = get_music_ids();
        try {
            let response = await fetchNowPlayingMusic({played_ids: playedIds});

            if (response.GetMusicResponseStatusMessage === "NotFound Music") {
                reset_music_ids();
                response = await fetchNowPlayingMusic({played_ids: []});
            }

            if (response.data) {
                update_music_ids(response.data.id);
                setMusicData(response.data);
                setIsPlaying(true)

                if (sourceRef.current) {
                    sourceRef.current.src = response.data.url;
                }

                audioRef.current.load();
                audioRef.current.play().catch((err) => console.error("Playback error:", err));
            }
        } catch (error) {
            console.error("Error fetching music:", error);
        }
    }, []);

    return {
        isPlaying,
        musicData,
        audioRef,
        handlePlayPause,
        handleNextMusic,
    };
};
