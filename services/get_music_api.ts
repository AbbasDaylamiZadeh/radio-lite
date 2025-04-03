import { MusicResponse } from "@/components/audio-player/types";

export const fetchNowPlayingMusic = async (data: object): Promise<MusicResponse> => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API}/get_music`, {
  const res = await fetch(`https://radio.zohrabifar.ir/api/get_music`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache:  'no-store' 
  },);
  return await res.json();
};