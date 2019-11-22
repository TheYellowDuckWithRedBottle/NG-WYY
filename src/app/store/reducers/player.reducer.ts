
import { Song } from 'src/app/services/data-types/common.type'
import { PlayMode } from 'src/app/share/wy-ui/wy-player/player-type'
import { createReducer, on, Action } from '@ngrx/store'
import { setPlaying, setPlayList, setSongList, setCurrentIndex, setPlayMode } from '../acitions/play.action'
import { state } from '@angular/animations'


export type PlayState={
    playing:boolean;//播放状态
    playMode:PlayMode;//播放模式
   songList:Song[]; //歌曲列表
   playList:Song[];//播放列表
   currentIndex:number;//当前播放的索引

}
export const initialState:PlayState={
    playing:false,
    songList:[],
    playList:[],
    playMode:{type:'loop',label:'单曲循环'},
    currentIndex:-1
}
const reducer=createReducer(initialState,
    on(setPlaying,(state,{playing})=>({...state,playing})),//修改这个state,返回一个新的state
    on(setPlayList,(state,{playList})=>({...state,playList})),
    on(setSongList,(state,{songList})=>({...state,songList})),
    on(setPlayMode,(state,{playMode})=>({...state,playMode})),
    on(setCurrentIndex,(state,{currentIndex})=>({...state,currentIndex}))
    );

    export function playerReducer(state:PlayState,action:Action){
        return reducer(state,action);
    }