import { Injectable, Inject } from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { Observable } from 'rxjs';
import { Banner, HotTag, SongSheet, Singer, Song, SheetList } from './data-types/common.type';
import { HttpClient ,HttpParams } from '@angular/common/http';
import{map, switchMap, pluck} from 'rxjs/internal/operators'
import { SongService } from './song.service';
import queryString from 'query-string'

export type SheetParams={
  offset:number;
  limit:number;
  order:'new'|'hot',
  cat:string;
}
@Injectable({
  providedIn: ServicesModule
})
export class SheetService {

  constructor(private http:HttpClient,
     @Inject(API_CONFIG) private uri:string ,private songServe:SongService){ }

     getSheets(args:SheetParams):Observable<SheetList>{
       const params=new HttpParams({fromString:queryString.stringify(args)});
       return this.http.get(this.uri+'top/playlist',{params}).pipe(map(res=>res as SheetList));

     }
getSongSheetDetail(id:number):Observable<SongSheet>{
  const params=new HttpParams().set('id',id.toString());
  return this.http.get(this.uri+'playlist/detail',{params}).pipe(map((res:{playlist:SongSheet})=>res.playlist));
}
playSheet(id:number):Observable<Song[]>
{

return this.getSongSheetDetail(id).pipe(pluck('tracks'),switchMap(tracks=>this.songServe.getSongList(tracks)));
}
}
