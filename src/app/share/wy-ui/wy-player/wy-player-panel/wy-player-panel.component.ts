import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { Song } from 'src/app/services/data-types/common.type';
import { WyScrollComponent } from '../wy-scroll/wy-scroll.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { findIndex } from 'src/app/utils/array';



@Component({
  selector: 'app-wy-player-panel',
  templateUrl: './wy-player-panel.component.html',
  styleUrls:['./wy-player-panel.component.less']
})
export class WyPlayerPanelComponent implements OnInit,OnChanges {
 @Input() show=false;
@Input() songList:Song[]
 currentIndex:number
@Input() currentSong:Song
@Output() onClose=new EventEmitter<void>();
@Output() onChangeSong=new EventEmitter<Song>();
scrollY=0;
@ViewChildren(WyScrollComponent) private wyScroll:QueryList<WyScrollComponent>;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes:SimpleChanges): void {
    if(changes["songList"]){
      console.log(this.songList);
    }
    if(changes["show"])
    {
      if(!changes['show'].firstChange&&this.show)
      {
        this.wyScroll.first.refreshScroll();
        setTimeout(()=>{
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

}
