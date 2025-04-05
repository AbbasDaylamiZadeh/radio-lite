import React from 'react';
import {Skeleton} from "@/_components/ui/skeleton";

type Props = {
    isBigCover?: boolean;
}


const ImageSkeleton = ({isBigCover = true}: Props) => {
    return (
        <div>
            <Skeleton
                className={`${isBigCover ? "w-[422px] h-[228px]  blur-xs rounded-t-xl " : "w-[150px] h-[150px] rounded-t-xl "}`}
            />
        </div>
    );
};

export default ImageSkeleton;