import {useState} from "react";

const useMusicListStore = () => {
  const [playedIds, setPlayedIds] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const storedIds = localStorage.getItem("music-list");
      return storedIds
        ? JSON.parse(storedIds)
            .map((item: string) => Number(item))
            .filter((num: number) => num)
        : [];
    }
    return [];
  });

  // Get music IDs from localStorage
  const get_music_ids = () => {
    const listenMusicIds = localStorage.getItem("music-list");

    if (listenMusicIds) {
      const toNumberMusicIds: number[] = (
        JSON.parse(listenMusicIds) as string[]
      ).map((item: string) => {
        return  Number(item);
      });

      if (toNumberMusicIds.length > 0) {
        setPlayedIds(toNumberMusicIds);
        return toNumberMusicIds;
      }
    }
  };

  // Update music IDs in localStorage
  const update_music_ids = (newId: number) => {
      setPlayedIds(prevIds => {
        // Create a new array with the existing IDs
        const updatedIds = [...prevIds];
        
        // Only add the new ID if it's not already present
        if (!updatedIds.includes(newId)) {
          updatedIds.push(newId);
          
          // Update localStorage with stringified version of the array
          localStorage.setItem("music-list", JSON.stringify(updatedIds.map(String)));
        }
        
        return updatedIds;
      });
    
  };

  const reset_music_ids=()=>{
    setPlayedIds([])
    localStorage.setItem("music-list", JSON.stringify([]));

  }

  return { get_music_ids, update_music_ids,reset_music_ids };
};

export default useMusicListStore;
