import React, {useEffect, useState} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/_components/ui/button";
import {LuTimer} from "react-icons/lu";
import {useMusicController} from "@/hooks/useMusicControllerStore";
import {PiTimerFill} from "react-icons/pi";


const timer_constant = [
    {id: 0, title: 5, toSecond: 300},
    {id: 1, title: 10, toSecond: 600},
    {id: 2, title: 15, toSecond: 900},
    {id: 3, title: 20, toSecond: 1200},
    {id: 4, title: 30, toSecond: 1800},
    {id: 5, title: 40, toSecond: 2400},
    {id: 6, title: 60, toSecond: 3600},

];


const AutoStopTimer = () => {
    const {handlePlayPause} = useMusicController()
    const [timer, setTimer] = useState("")

    useEffect(() => {
        const toNumberTimer = Number(timer)
        if (toNumberTimer > 0) {
            const timeout = setTimeout(() => {
                handlePlayPause()
                setTimer("")
            }, toNumberTimer * 1000);

            return () => clearTimeout(timeout);

        }
    }, [timer]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button title="timer" className="border-none size-8 sm:size-10 rounded-full  text-white group"
                        size="icon"
                        variant="outline">
                    {Number(timer) > 0 ?
                        <PiTimerFill className="size-5"/> : <LuTimer className="size-5"/>}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36 bg-zinc-800 border-none">
                <DropdownMenuLabel>Auto Stop</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuRadioGroup value={String(timer)} onValueChange={setTimer}>
                    <DropdownMenuRadioItem className="focus:bg-zinc-600"
                                           value={""}>No Stop</DropdownMenuRadioItem>

                    {timer_constant.map(item => (
                        <DropdownMenuRadioItem className="focus:bg-zinc-600" key={item.id}
                                               value={String(item.toSecond)}>{item.title + " "}min</DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    );
};

export default AutoStopTimer;

