export interface MusicData {
    id: number;
    title: string;
    artist: string;
    url: string;
    cover: string;
    duration: number;
    like: number;
  }
  
export  interface MusicResponse {
    status: number;
    GetMusicResponseStatusMessage: string;
    data: MusicData;
  }