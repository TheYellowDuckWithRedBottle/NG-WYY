import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Song } from 'src/app/services/data-types/common.type';


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
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes:SimpleChanges): void {
    if(changes["songList"]){
      console.log(this.songList);
    }
    if(changes["currentSong"])
    {
      console.log(this.currentSong);
    }
  }

}
