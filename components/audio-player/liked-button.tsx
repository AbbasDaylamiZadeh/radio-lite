"use client"
import React from 'react'
import { Button } from '../ui/button'
import { HiHeart } from "react-icons/hi2";


const LikedButton = () => {
 const handleLikedButton=()=>{
    console.log("clicked")
 }


  return (
    <Button  onClick={handleLikedButton} className='bg-neutral-600 hover:bg-neutral-700 rounded-full size-10'>
        <HiHeart className='size-5 text-white hover:text-white/10'/>
    </Button>
  )
}

export default LikedButton