import { NgModule } from '@angular/core';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';
import { PlayCountPipe } from '../play-count.pipe';
import { WyPlayerModule } from './wy-player/wy-player.module';
import { WySliderTrackComponent } from './wy-slider/wy-slider-track.component';
import { WySliderHandleComponent } from './wy-slider/wy-slider-handle.component';
import { WySearchModule } from './wy-search/wy-search.module';



@NgModule({
  declarations: [SingleSheetComponent,PlayCountPipe,],
  imports: [
    WyPlayerModule,
    WySearchModule
  ],
  exports:[
    SingleSheetComponent,
    PlayCountPipe,
    WyPlayerModule,
    WySearchModule
  ]
})
export class WyUiModule { }
