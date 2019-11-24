import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { Song } from 'src/app/services/data-types/common.type';
import { WyScrollComponent } from '../wy-scroll/wy-scroll.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-wy-player-panel',
  templateUrl: './wy-player-panel.component.html',
  styleUrls:['./wy-player-panel.component.less']
})
export class WyPlayerPanelComponent implements OnInit,OnChanges {
 @Input() show=false;
@Input() songList:Song[]
@Input() currentIndex:number
@Input() currentSong:Song
@Output() onClose=new EventEmitter<void>();
@Output() onChangeSong=new EventEmitter<Song>();
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
      }
    }
    if(changes["currentSong"])
    {
      console.log(this.currentSong);
    }
  }

}
