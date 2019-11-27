import { Lyric } from 'src/app/services/data-types/common.type';
import { ɵConsole } from '@angular/core';
import { delay } from 'q';
import { Subject } from 'rxjs';
const timeExp=/\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
export interface BaseLyricLine{
    txt:string;
    txtCn:string;
}
interface  LyricLine extends BaseLyricLine{
    time:number
};
interface Handler extends BaseLyricLine{
    lineNum:number;
}
export class WyLyric{
    private startStamp
    private playing=false; 
    private lrc:Lyric;
    private timer:any;
    private pauseStamp:number;
    lines:LyricLine[]=[];
    handler=new Subject<Handler>();
    private curNum:number;//播放的第几行歌词
    constructor(lrc:Lyric){
        this.lrc=lrc;
        this.init();
    }
    private init(){
        if(this.lrc.tlyric){
            this.generTLyric();
        }else{
            this.generLyric();
        }
    }
    private generTLyric(){}
    private generLyric(){
        console.log('lrc:',this.lrc.lyric);
        const lines=this.lrc.lyric.split('\n');
        lines.forEach(line=>this.makeLine(line));
       
    }
    private makeLine(line:string){
        const result=timeExp.exec(line);

        if(result){
            const txt=line.replace(timeExp,'').trim();
            const txtCn='';
            if(txt){
                let thirdResult=result[3]||'00';
                const len=thirdResult.length;
                const _thirdResult=len>2?parseInt(thirdResult):parseInt(thirdResult)*10;
                const time=Number(result[1])*60*1000+Number(result[2])*1000+_thirdResult
                this.lines.push({txt,txtCn,time});
            }
        }
    }
    play(startTime=0){//默认从0播放
        if(!this.lines.length) return;
        if(!this.playing){
            this.playing=true;
        }
        this.curNum=this.findCurNum(startTime);
        console.log('curNum',this.curNum);
        this.startStamp=Date.now()-startTime;
        //this.callHandler()

        if(this.curNum<this.lines.length){
            clearTimeout(this.timer);
            this.playReset();
        }
    }
    private findCurNum(time:number):number{
        const index=this.lines.findIndex(item=>time<=item.time);
        return index===-1?this.lines.length-1:index;
    }
    private playReset(){
        let line=this.lines[this.curNum];
        const delay=line.time-(Date.now()-this.startStamp);
       
        this.timer=setTimeout(()=>{
            this.callHandler(this.curNum++);
            if(this.curNum<this.lines.length&&this.playing){
                this.playReset();
            }
        },delay)
    }
    private callHandler(i:number){
        this.handler.next({
            txt:this.lines[i].txt,
            txtCn:this.lines[i].txtCn,
            lineNum:i
        });
    }
    
    togglePlay(playing:boolean){
    const now=Date.now();
    this.playing=playing;
    if(playing){
        const startTime=(this.pauseStamp||now)-(this.startStamp||now);
        this.play(startTime)
    }
    else{
        this.stop();
        this.pauseStamp=now;
    }
  }
  private stop(){
      if(this.playing)
      {
          this.playing=false;
      }
      clearTimeout(this.timer);
  }
}