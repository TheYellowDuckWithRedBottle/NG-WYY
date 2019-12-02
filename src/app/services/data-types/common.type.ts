export type Banner={
    targetId:number;
    url:string;
    imageUrl:string;
}
export type HotTag={
    id:number;
    name:string;
    position:number;
}

export type Singer={
    id:number;
    name:string;
    picUrl:string;
    albumSize:number;
}
export type Song={
    id:number;
    name:string;
    url:string;
    ar:Singer[];
    al:{id:number;name:string;picUrl:string};
    dt:number;
}

export type SongSheet={
    id:number;
    picUri:string;
    name:string;
    playCount:number;
    tracks:Song[];
    
}
export type SongUrl={
    id:number;
    url:string;
}
export interface Lyric {
    lyric: string;
    tlyric: string;
  }

export type SheetList={
    playlist:SongSheet[];
    total:number;
}