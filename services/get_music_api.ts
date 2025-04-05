import {MusicResponse} from "@/_components/audio-player/types";

export const fetchNowPlayingMusic = async (data: object): Promise<MusicResponse> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/get_music`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            cache: 'no-store'
        },);

        if (!res.ok) {
            throw new Error(`Failed to fetch music: ${res.statusText}`);
        }


        return (await res.json()) as MusicResponse;
    } catch (error) {
        console.error("Error in fetchNowPlayingMusic:", error);
        throw error;
    }

};