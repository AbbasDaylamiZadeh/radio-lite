"use client"
import React, {useEffect, useState} from 'react'
import {Button} from '../ui/button'
import {HiHeart} from "react-icons/hi2";
import {HiOutlineHeart} from "react-icons/hi2";

import {useMusic} from "@/context/music-context";
import {Skeleton} from "@/_components/ui/skeleton";
import {likedDisLikeMusicApi} from "@/services/like_dislike_music_api";



const LikeDislikeButton = () => {
    const [loading, setLoading] = useState(false);
    const [likedList, setLikedList] = useState<number[]>([]);

    const { musicData } = useMusic();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedIds = JSON.parse(localStorage.getItem("liked-music") || "[]")
                .map(Number)
                .filter(Boolean);
            setLikedList(storedIds);
        }
    }, []);

    const handleLikedDislikedButton = async (id: number) => {
        if (loading) return; // Prevent multiple clicks while loading
        setLoading(true);

        const isLiked = likedList.includes(id);
        const updatedList = isLiked
            ? likedList.filter((item) => item !== id)
            : [...likedList, id];

        setLikedList(updatedList);
        localStorage.setItem("liked-music", JSON.stringify(updatedList.map(String)));

        try {
          const res=  await likedDisLikeMusicApi(id, isLiked ? "dislike" : "like");
            console.log(res)
        } catch (error) {
            console.error("Error updating like status", error);
            setLikedList(likedList); // Revert state on failure
            localStorage.setItem("liked-music", JSON.stringify(likedList.map(String)));
        } finally {
            setLoading(false);
        }
    };

    if (!musicData) return <Skeleton className="w-10 h-10 rounded-full bg-zinc-700" />;

    return (
        <Button
            onClick={() => handleLikedDislikedButton(musicData.id)}
            className="bg-neutral-600 hover:bg-neutral-700 rounded-full size-10"
            disabled={loading}
        >
            {likedList.includes(musicData.id) ? (
                <HiHeart className="size-5 text-red-700 hover:text-white/10" />
            ) : (
                <HiOutlineHeart className="size-5 text-white hover:text-white/10" />
            )}
        </Button>
    );
};

export default LikeDislikeButton;
