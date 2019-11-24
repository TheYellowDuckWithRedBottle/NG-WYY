import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(ScrollBar);
BScroll.use(MouseWheel);
@Component({
  selector: 'app-wy-scroll',
  template: `<div class="wy-scroll" #wrap><ng-content></ng-content></div>`,
  styles: [`.wy-scroll{width:100%;height:100%;overflow:hidden}`],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyScrollComponent implements OnInit,AfterViewInit,OnChanges {
 
 private bs:BScroll;
 @Input() refreshDelay=50
@ViewChild('wrap',{static:true}) private wrapRef:ElementRef;
@Input() data:any[];
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.bs=new BScroll(this.wrapRef.nativeElement,{
      scrollbar:{
      interactive:true
    },mouseWheel:{}
          }
    )
  }
  private refresh(){
    this.bs.refresh();
  }
  refreshScroll(){
    setTimeout(()=>this.refresh(),this.refreshDelay);
  }
  ngOnChanges(changes:SimpleChanges): void {
    if(changes['data']){
      this.refreshScroll()
    }
  }
}
