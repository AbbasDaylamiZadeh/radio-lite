import {MusicResponse} from "@/_components/audio-player/types";

export const likedDisLikeMusicApi = async (id: number,likeOrDislike:string): Promise<MusicResponse> => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/${likeOrDislike}/${id}`, {cache: 'no-store'},);

        if (!res.ok) {
            throw new Error(`Failed to fetch music: ${res.statusText}`);
        }

        return (await res.json()) as MusicResponse;
    } catch (error) {
        console.error("Error in fetchNowPlayingMusic:", error);
        throw error;
    }

};