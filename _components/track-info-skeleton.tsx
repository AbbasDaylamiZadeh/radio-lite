import React from 'react';
import {Skeleton} from "@/_components/ui/skeleton";

const TrackInfoSkeleton = () => {
    return (
        <>


            <Skeleton className=" mb-2 rounded-none bg-zinc-800 h-4 w-[167px]"/>
            <Skeleton className="h-4 w-[100px] rounded-none bg-zinc-800"/>
        </>
    );
};

export default TrackInfoSkeleton;