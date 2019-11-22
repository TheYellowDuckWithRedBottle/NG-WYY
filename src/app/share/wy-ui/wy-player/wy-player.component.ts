import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStoreModule } from 'src/app/store';
import { getSongList, getPlayList, getCurrentIndex, getPlayMode, getCurrentSong } from 'src/app/store/selectors/player.selector';
import { Song } from 'src/app/services/data-types/common.type';
import { PlayMode } from './player-type';
import { setCurrentIndex, setPlayMode, setPlayList } from 'src/app/store/acitions/play.action';
import { shuffle } from 'src/app/utils/array';
import { Subscription, fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';

const modeTypes:PlayMode[]=[{
  type:'loop',
  label:'循环'
},{
  type:'random',
  label:'随机'
},
{
  type:'singleLoop',
  label:'单曲循环'
}
]
@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls:['./wy-player.component.less']
})
export class WyPlayerComponent implements OnInit {
percent=0;
bufferPercent=0;

songList: Song[];
playList: Song[];
currentIndex: number;
currentSong: Song;
currentMode:PlayMode;
modeCount=0;
duration:number;
currentTime:number;

showVolumnPanel=false;
volume=60
//播放状态
playing=false;
//是否可以播放
songReady=false;
//是否点的是音量面板本身
selfClick=false;

private winClick:Subscription

//当前模式

@ViewChild('audio', { static: true }) private audio: ElementRef;
private audioEl: HTMLAudioElement;

  constructor(private store$:Store<AppStoreModule>,
    @Inject(DOCUMENT) private doc:Document) { 
    console.log(store$);
    const appStore$=this.store$.pipe(select('player'));
 
    const stateArr = [{
      type: getSongList,
      cb: list => this.watchList(list, 'songList')
    }, {
      type: getPlayList,
      cb: list => this.watchList(list, 'playList')
    }, {
      type: getCurrentIndex,
      cb: index => this.watchCurrentIndex(index)
    }, {
      type: getPlayMode,
      cb: mode => this.watchPlayMode(mode)
    }, {
      type: getCurrentSong,
      cb: song => this.watchCurrentSong(song)
    }];
  stateArr.forEach(item=>{
    appStore$.pipe(select(item.type)).subscribe(item.cb);
  })
    this.store$.pipe(select('player'),select(getSongList)).subscribe(list=>{
      console.log('what happend')
      console.log('getSongList:',list);
    })
     this.store$.pipe(select('player'),select(getPlayList)).subscribe(list=>{
       console.log('getPlayList',list);
     })
    // this.store$.pipe(select(getCurrentIndex)).subscribe(index=>{
    //   console.log('getCurrentList',index);
    // })
  }
  private watchList(list: Song[], type: string) {
    this[type] = list;
    console.log(this[type]);
  }

  private watchCurrentIndex(index: number) {
    this.currentIndex = index;
    console.log(this.currentIndex);
  }

  private watchPlayMode(mode: PlayMode) {
    this.currentMode = mode;
    console.log(this.currentMode);
    if(this.songList){
      let list=this.songList.slice();
      if(mode.type=='random'){
        list=shuffle(this.songList);
      }
      this.updateCurrentIndex(list,this.currentSong);
      this.store$.dispatch(setPlayList({playList:list}))
    }
  }
private updateCurrentIndex(list:Song[],song:Song){
  const newIndex=list.findIndex(item=>item.id===song.id);
  this.store$.dispatch(setCurrentIndex({currentIndex:newIndex}));

}
    private watchCurrentSong(song: Song) {
      if(song){
        this.currentSong = song;
        this.duration=song.dt/1000;
        console.log(this.currentSong);
      }
      
    }
    get picUrl():string{
      return this.currentSong?this.currentSong.al.picUrl:'//s4.music.126.net/style/web2/img/default/default_album.jpg'
    }
    toggleVolumnStrip(evt:MouseEvent){

      evt.stopPropagation();
      this.showVolumnStrip();
    }
    private showVolumnStrip(){
      this.showVolumnPanel=!this.showVolumnPanel;
      if(this.showVolumnPanel)
      {
        this.bindDocumentClickListener();
      }
      else{
        this.unbindDocumentClickListener();
      }
    }
    private bindDocumentClickListener(){
      if(!this.winClick){
        this.winClick=fromEvent(this.doc,'click').subscribe(()=>{
          if(!this.selfClick){//说明点击了播放器以外的部分
this.showVolumnPanel=false;
this.unbindDocumentClickListener();
          }
          this.selfClick=false;
        });
      }
    }
    private unbindDocumentClickListener(){
      if(this.winClick){
        this.winClick.unsubscribe();
        this.winClick=null;
      }
    }
  ngOnInit() {
  
    this.audioEl = this.audio.nativeElement;
  }
  onCanplay(){
    this.songReady=true;
    this.play();
  }
  onTimeUpdate(e:Event){
    this.currentTime=(<HTMLAudioElement>e.target).currentTime;
    this.percent=this.currentTime/this.duration*100;
  
    const buffered=this.audioEl.buffered;
    if(buffered.length&&this.bufferPercent<100){
      this.bufferPercent=(buffered.end(0)/this.duration);
    }
    
  }
  onVolumeChange(per:number)
  {
    this.audioEl.volume=per/100;
  }
  onToggle(){
    if(!this.currentSong)
    {
      if(this.playList.length)
      {
        this.store$.dispatch(setCurrentIndex({currentIndex:0}));
        this.songReady=false;
      }
    }else{
      if(this.songReady){
        this.playing=!this.playing;
        if(this.playing){
          this.audioEl.play();
        }
        else{
          this.audioEl.pause();
        }
      }
    }
   
  }
  onPre(index:number){
    if(!this.songReady) return;
    if(this.playList.length===1){
      this.loop();
    }else{
      const newIndex=index<=0?this.playList.length-1:index;
      this.updateIndex(newIndex);
    }
  }
  onNext(index:number){
    if(!this.songReady) return;
    if(this.playList.length===1){
      this.loop();
    }else{
      const newIndex=index>=this.playList.length?0:index;
      this.updateIndex(newIndex);
    }
  }
  onPercentChange(per){
    if(this.currentSong)
    {
      this.audioEl.currentTime=this.duration*(per/100);
    }
  
  }

  private updateIndex(index:number){
    this.store$.dispatch(setCurrentIndex({currentIndex:index}))
    this.songReady=false;
  }
  private play(){
  this.audioEl.play();
  this.playing=true;
}
private loop(){
  this.audioEl.currentTime=0;
  this.play();
}
//改变模式
changeMode(){
  console.log('i am change');
const temp=modeTypes[++this.modeCount%3];
this.store$.dispatch(setPlayMode({playMode:temp}))

}
onEnded(){
  this.playing=false;
  if(this.currentMode.type==='singleLoop'){
    this.loop();
  }
  else{
    this.onNext(this.currentIndex+1);
  }
}

}
