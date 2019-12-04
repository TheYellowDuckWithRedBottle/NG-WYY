import { Component, OnInit } from '@angular/core';
import { SheetParams, SheetService } from 'src/app/services/sheet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SheetList } from 'src/app/services/data-types/common.type';
import { setSongList, setPlayList, setCurrentIndex } from 'src/app/store/acitions/play.action';
import { Store } from '@ngrx/store';
import { AppStoreModule } from 'src/app/store';
import { shuffle, findIndex } from 'src/app/utils/array';
import { PlayState } from 'src/app/store/reducers/player.reducer';

@Component({
  selector: 'app-sheet-list',
  templateUrl: './sheet-list.component.html',
  styleUrls:['./sheet-list.component.less']
})
export class SheetListComponent implements OnInit {
  sheets:SheetList
  private playState:PlayState;
  listParams:SheetParams={
    cat:'全部',
    order:'hot',
    offset:1,
    limit:35
  }
  orderValue:"hot";
  constructor(private route:ActivatedRoute,
    private router:Router,
    private sheetServe:SheetService,
    private store$:Store<AppStoreModule>) 
  {
this.listParams.cat=this.route.snapshot.queryParamMap.get('cat')||'全部';
this.getList();
   }

  ngOnInit() {
  }
  private getList(){
    this.sheetServe.getSheets(this.listParams).subscribe(
      res=>{
        this.sheets=res
      }
    );
  }
  onPlaySheet(id: number) {
    this.sheetServe.playSheet(id).subscribe(list=>{
      console.log(list);
      this.store$.dispatch(setSongList({songList:list}));
      let trueIndex=0;
      let trueList=list.slice();
if(this.playState.playMode.type=="random"){
  trueList=shuffle(list||[]);
  trueIndex=findIndex(trueList,list[trueIndex]);
}
      this.store$.dispatch(setPlayList({playList:trueList}));
      this.store$.dispatch(setCurrentIndex({currentIndex:trueIndex}));
    });
  }
  onOrderChange(order:'new'|'hot'){
    console.log('cat:',order);
    this.listParams.order=order;
    this.listParams.offset=1;
    this.getList();
  }
 
  onPageChange(page:number){
    console.log(page)
    this.listParams.offset=page;
    this.getList();
  }
  toInfo(id:number){

    this.router.navigate(['/sheetInfo',id]);
  }
}
