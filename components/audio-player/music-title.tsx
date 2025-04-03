import React from "react";
import AudioController from "./audio-controller";

type musicTitle = {
  artist: string;
  title: string;
};

const MusicTitle: React.FC<musicTitle> = ({ artist, title }) => {
  return (
    <>
      <h1 className="text-zinc-400 font-bold text-lg">{artist}</h1>
      <h2>{title}</h2>
      <AudioController/>
    </>
  );
};

export default MusicTitle;
