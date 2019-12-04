import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-sheet-info',
  templateUrl: './sheet-info.component.html',
  styles: []
})
export class SheetInfoComponent implements OnInit {

  constructor(private route:ActivatedRoute) {
    this.route.data.pipe(map(res=>res.SheetInfoComponent)).subscribe(res=>
      console.log(res))
   }

  ngOnInit() {
  }

}
