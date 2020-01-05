import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-wy-search',
  templateUrl: './wy-search.component.html',
  styleUrls:['./wy-search.component.less']
})
export class WySearchComponent implements OnInit {
  myContext={$implicit:'world',localsk:'Svet'}
@Input() customView :TemplateRef<any>;
  constructor() { }

  ngOnInit() {
  }

}
