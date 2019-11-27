import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChildren, QueryList, Inject } from '@angular/core';
import { Song } from 'src/app/services/data-types/common.type';
import { WyScrollComponent } from '../wy-scroll/wy-scroll.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { findIndex } from 'src/app/utils/array';
import { timer } from 'rxjs';
import { WINDOW } from 'src/app/services/services.module';
import { SongService } from 'src/app/services/song.service';
import { WyLyric, BaseLyricLine } from './wy-lyric';



@Component({
  selector: 'app-wy-player-panel',
  templateUrl: './wy-player-panel.component.html',
  styleUrls:['./wy-player-panel.component.less']
})
export class WyPlayerPanelComponent implements OnInit,OnChanges {
 @Input() show=false;
@Input() songList:Song[]
@Input() playing:boolean;
 currentIndex:number
@Input() currentSong:Song
@Output() onClose=new EventEmitter<void>();
@Output() onChangeSong=new EventEmitter<Song>();
currentLineNum:number;
scrollY=0;
currentLyric:BaseLyricLine[];

private lyric;
@ViewChildren(WyScrollComponent) private wyScroll:QueryList<WyScrollComponent>;
  constructor(@Inject(WINDOW) private win:Window,private songService:SongService ) { }

  ngOnInit() {
  }
  ngOnChanges(changes:SimpleChanges): void {
    if(changes['playing']){
      if(!changes['playing'].firstChange){
        this.lyric&&this.lyric.togglePlay(this.playing);
      }
    }

    if(changes["songList"]){
      console.log(this.songList);
    }
    if(changes["show"])
    {
      if(!changes['show'].firstChange&&this.show)
      {
        this.wyScroll.first.refreshScroll();
        console.log(this.wyScroll);
        this.wyScroll.last.refreshScroll();
        timer(80).subscribe(()=>{
          this.scrollToCurrent();
        });
      this.win.setTimeout(()=>{
          this.scrollToCurrent();
        },80)
        if(this.currentSong){
          this.scrollToCurrent();
        }
      }
    }
    if(changes["currentSong"])
    {
      if(this.currentSong){
        this.currentIndex=findIndex(this.songList,this.currentSong)
        this.updateLyric();
        if(this.show){
          this.scrollToCurrent();
        }
      }else{

      }
      console.log(this.currentSong);
    }
    
  }
  private scrollToCurrent(){
    const songListRefs=this.wyScroll.first.el.nativeElement.querySelectorAll('ul li');
    if(songListRefs.length){
      const currentLi=songListRefs[this.currentIndex||0];
      const offsetTop=currentLi.offsetTop;
      console.log("this.scrollY",this.scrollY);
      console.log("this.scrollTop",offsetTop);
      if(((offsetTop-Math.abs(this.scrollY))>205)||(offsetTop)<Math.abs(this.scrollY)){
        this.wyScroll.first.scrollToElement(currentLi,300,false,false);
      }
    }
    else{

    }
  }
  private updateLyric(){
  this.songService.getLyric(this.currentSong.id).subscribe(res=>{
     this.lyric=new WyLyric(res);
    this.currentLyric=this.lyric.lines;
   
    this.handleLyric();
    this.wyScroll.last.scrollTo(0,0);//每次切歌到最上面
    if(this.playing){//如果正在播放，歌词也要播放
      this.lyric.play();

    }
  });
   
  }
  private handleLyric(){
    this.lyric.handler.subscribe(({lineNum})=>{
      console.log('lineNum',lineNum);
      this.currentLineNum=lineNum;
    })
  }
 

}
