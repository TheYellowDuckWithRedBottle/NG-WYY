import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import {
  Template
} from '@angular/compiler/src/render3/r3_ast';
import {
  fromEvent
} from 'rxjs';
import {
  pluck,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/internal/operators';
import {
  SearchResult
} from 'src/app/services/data-types/common.type';
import {
  isEmptyObject
} from 'src/app/utils/tools';
import{Overlay,OverlayRef} from '@angular/cdk/overlay'
import { WySearchPanelComponent } from './wy-search-panel/wy-search-panel.component';
import { ComponentPortal } from '@angular/cdk/portal';
@Component({
  selector: 'app-wy-search',
  templateUrl: './wy-search.component.html',
  styleUrls: ['./wy-search.component.less']
})
export class WySearchComponent implements OnInit, AfterViewInit, OnChanges {


  // myContext={$implicit:'world',localsk:'Svet'}
  @Output() onSearch = new EventEmitter < string > ();
  @Input() customView: TemplateRef < any > ;
  @Input() searchResult: SearchResult;
  @Input() connectedRef:ElementRef;
  @ViewChild('nzInput', {static: false}) private nzInput: ElementRef;
  @ViewChild('search',{static:false}) private defaultRef:ElementRef;
   private overlayRef:OverlayRef;
  constructor(private overlay:Overlay,private viewContainerRef:ViewContainerRef) {}

  ngOnInit() {

  }
  ngAfterViewInit() {
   // console.log(':', this.nzInput.nativeElement);
    fromEvent(this.nzInput.nativeElement, "input")
      .pipe(debounceTime(300), distinctUntilChanged(), pluck('target', 'value'))
      .subscribe((value: string) => {
        console.log(value)
        this.onSearch.emit(value);
      });
  }
  onFocus(){
    if (this.searchResult&&!isEmptyObject(this.searchResult)) {
      this.showOverlayPanel();  
    }
  }
  onBlur(){
    this.hideOverlayPanel();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchResult']&&!changes['searchResult'].firstChange) {
     
      if (!isEmptyObject(this.searchResult)) {
        this.showOverlayPanel();  
      }else{
        this.showOverlayPanel();
      }
    }
  }
  hideOverlayPanel(){
      if(this.overlayRef&&this.overlayRef.hasAttached){
  this.overlayRef.dispose();
}

  }
  showOverlayPanel(){
    this.hideOverlayPanel();
    const positionStrategy=this.overlay.position().flexibleConnectedTo(this.defaultRef||this.connectedRef)
    .withPositions([{
      originX:'start',
      originY:'bottom',
      overlayX:'start',
      overlayY:'top'
    }]).withLockedPosition(true);
    this.overlayRef=this.overlay.create({ 
     // hasBackdrop:true,
      positionStrategy,
      scrollStrategy:this.overlay.scrollStrategies.reposition()});
    const panelPortal=new ComponentPortal(WySearchPanelComponent,this.viewContainerRef);
    const panelRef=this.overlayRef.attach(panelPortal);
    panelRef.instance.searchResult=this.searchResult;
    this.overlayRef.backdropClick().subscribe(()=>{
      this.hideOverlayPanel();
    });
  }

}
