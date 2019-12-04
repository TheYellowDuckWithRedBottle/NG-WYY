import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  HomeService
} from 'src/app/services/home.service';
import {
  SingerService
} from 'src/app/services/singer.service';
import {
  Banner,
  HotTag,
  SongSheet,
  Song,
  Singer
} from 'src/app/services/data-types/common.type';
import {
  NzCarouselComponent
} from 'ng-zorro-antd';
import { SheetService } from 'src/app/services/sheet.service';
import { Store, select } from '@ngrx/store';
import { AppStoreModule } from 'src/app/store';
import { setSongList, setPlayList, setCurrentIndex } from 'src/app/store/acitions/play.action';
import { PlayState } from 'src/app/store/reducers/player.reducer';

import { shuffle, findIndex } from 'src/app/utils/array';
import { RouterModule, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  carouselActiveIndex = 0;
  banners: Banner[];
  hotTags: HotTag[];
  songSheet: SongSheet[];
  singers: Singer[];
  songList:Song[];
  private playState:PlayState;
  @ViewChild(NzCarouselComponent, {
    static: true
  }) nzCarousel: any;
  constructor(
    private router:Router,
    private homeServe: HomeService,
    private singerServe: SingerService,
    private sheeetServe:SheetService,
    private store$:Store<AppStoreModule>
  ) {
    this.getBinners();
    this.getHotTags();
    this.getSongSheets();
    this.getEnterSinger();
    this.store$.pipe(select('player')).subscribe(res=>this.playState=res)
  }
  private getEnterSinger() {
    this.singerServe.getEnterSinger().subscribe(singers1 => {
      this.singers = singers1;
   
    })
  }
  private getBinners() {
    this.homeServe.getBanners().subscribe(banner1s => {
      this.banners = banner1s;

    })
  }
  private getHotTags() {
    this.homeServe.getHotTags().subscribe(hotTags => {
      this.hotTags = hotTags;

    })
  }
  private getSongSheets() {
    this.homeServe.getPersonalSheetList().subscribe(songSheet => {
      this.songSheet = songSheet;

    })
  }

  ngOnInit() {}
  onBeforeChange({
    to
  }) {
    
    this.carouselActiveIndex = to;
  }
  onChangeSlide(type: 'pre' | 'next') {
    this.nzCarousel[type]();
    console.log(this.nzCarousel[type]);
  }
  onPlaySheet(id: number) {
    this.sheeetServe.playSheet(id).subscribe(list=>{
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
toInfo(id:number){
  this.router.navigate(['/sheetInfo',id]);
}
}
