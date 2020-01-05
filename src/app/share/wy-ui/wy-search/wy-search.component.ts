import { Component, OnInit, Input, TemplateRef, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { fromEvent } from 'rxjs';
import { pluck, debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';


@Component({
  selector: 'app-wy-search',
  templateUrl: './wy-search.component.html',
  styleUrls:['./wy-search.component.less']
})
export class WySearchComponent implements OnInit ,AfterViewInit{
  
 // myContext={$implicit:'world',localsk:'Svet'}
 @Output() onSearch=new EventEmitter<string>();
@Input() customView :TemplateRef<any>;
@ViewChild('nzInput',{static:false}) private nzInput:ElementRef;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log(':',this.nzInput.nativeElement);
    fromEvent(this.nzInput.nativeElement,"input")
    .pipe(debounceTime(300),distinctUntilChanged(),pluck('target','value'))
    .subscribe((value:string)=>{console.log(value)
    this.onSearch.emit(value);} 
    );
  }

}
