import Image from "next/image";
import React from "react";

type thumbnail = {
    imageUrl: string ;
    alt: string;
    isBigCover?: boolean;
};

const Thumbnail: React.FC<thumbnail> = ({imageUrl, alt, isBigCover = true}) => {


    return (

        <img
            className={`${
                isBigCover ? "rounded-t-xl object-cover blur-xs opacity-40 grayscale scale-110 z-0 w-full absolute top-0 h-full" : "w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] rounded-md shadow-lg shadow-gray-600/10"
            }`}
            height={isBigCover ? 316 : 150}
            width={isBigCover ? 396 : 150}
            src={imageUrl}
            alt={alt}

        />
    );
};

export default Thumbnail;





