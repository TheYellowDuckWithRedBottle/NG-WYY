import { createAction, props } from '@ngrx/store';
import { Song } from 'src/app/services/data-types/common.type';
import { PlayMode } from 'src/app/share/wy-ui/wy-player/player-type';

export const setPlaying=createAction('[player] Set playing',props<{playing:boolean}>());
export const setPlayList=createAction('[player] Set playList',props<{playList:Song[]}>());
export const setSongList=createAction('[player] Set songList',props<{songList:Song[]}>());
export const setPlayMode=createAction('[player] Set playMode',props<{playMode:PlayMode}>());
export const setCurrentIndex=createAction('[player] Set currentIndex',props<{currentIndex:number}>());
