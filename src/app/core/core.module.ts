import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from '../share/share.module';
import { ServicesModule } from '../services/services.module';
import { PagesModule } from '../pages/pages.module';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { StoreModule } from '@ngrx/store';
registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PagesModule,
    ShareModule,
    ServicesModule,
    AppRoutingModule,
    StoreModule
  ],
  exports:[
    ShareModule,
    AppRoutingModule,
  ]
})
export class CoreModule { 
constructor(@SkipSelf() @Optional() parentModule:CoreModule)
{
  if(parentModule)
  {
    throw new Error('CoreModule只能被appModule引入')
  }
}

}
