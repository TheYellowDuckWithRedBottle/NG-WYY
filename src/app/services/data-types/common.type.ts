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
    picUrl:string;
    coverImgUrl:string;
    name:string;
    playCount:number;
    tracks:Song[];
    tags:string[];
    description:string;
    subscribedCount:number;
    shareCount:number;
    commentCount:number;
    subscribed:boolean;
    creator:{nickname:string;avatarUrl:string;}
    createTime:number;
    
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
export type SearchResult={
    artists?:Singer[];
    playlists?:SongSheet[];
    songs?:Song[];
}