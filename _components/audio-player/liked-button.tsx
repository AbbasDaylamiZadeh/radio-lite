"use client"
import React, {useState} from 'react'
import {Button} from '../ui/button'
import {HiHeart} from "react-icons/hi2";
import {HiOutlineHeart} from "react-icons/hi2";

import {useMusic} from "@/context/music-context";
import {Skeleton} from "@/_components/ui/skeleton";
import {likedMusicApi} from "@/services/liked_music_api";


const LikedButton = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [likedList, setLikedList] = useState<number[]>(() => {
        if (typeof window !== "undefined") {
            const storedIds = localStorage.getItem("liked-music");
            return storedIds
                ? JSON.parse(storedIds)
                    .map((item: string) => Number(item))
                    .filter((num: number) => num)
                : [];
        }
        return [];
    });


    const {musicData} = useMusic()

    const handleLikedButton = async (id: number) => {
        setLoading(true);
        setLikedList(prevIds => {

            const updatedIds = [...prevIds];

            if (!updatedIds.includes(id)) {
                updatedIds.push(id);

                // Update localStorage with stringified version of the array
                localStorage.setItem("liked-music", JSON.stringify(updatedIds.map(String)));
            }
            return updatedIds;


        });

        const likedMusic = await likedMusicApi(id)
        if (likedMusic) {
            return setLoading(false)
        }


    }

    return (
        <>
            {musicData && !loading ?
                <Button onClick={() => handleLikedButton(musicData?.id)}
                        className='bg-neutral-600 hover:bg-neutral-700 rounded-full size-10'>
                    {likedList.includes(musicData?.id) ?
                        <HiHeart className='size-5 text-red-700 hover:text-white/10'/> :
                        <HiOutlineHeart className="size-5 text-white hover:text-white/10"/>}
                </Button> : <Skeleton className="w-10 rounded-full h-10 bg-zinc-700"/>}
        </>
    )
}

export default LikedButton