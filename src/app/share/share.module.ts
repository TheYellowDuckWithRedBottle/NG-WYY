import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { WyUiModule } from './wy-ui/wy-ui.module';
import { FormatTimePipe } from './pipes/format-time.pipe';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    WyUiModule
  ],
  exports:[
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    WyUiModule,
   
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class ShareModule { }
