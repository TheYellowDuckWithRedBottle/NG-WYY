import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WySearchComponent } from './wy-search.component';
import { NzIconModule, NzInputModule, NzOverlayModule } from 'ng-zorro-antd';
import { WySearchPanelComponent } from './wy-search-panel/wy-search-panel.component';

@NgModule({
  declarations: [WySearchComponent, WySearchPanelComponent],
  entryComponents:[WySearchPanelComponent],
  imports: [
    CommonModule,
    NzIconModule,
    NzInputModule,
    NzOverlayModule
  ],
  exports:[WySearchComponent]
})
export class WySearchModule { }
