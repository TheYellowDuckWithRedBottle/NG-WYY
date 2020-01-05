import { Component } from '@angular/core';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Ng-WYY';
  menu=[
    {
label:'发现',
path:'/home'
    },
    {
      label:'歌单',
      path:'/sheet'

    }
  ];
  constructor(private searchServe:SearchService){

  }
  onSearch(keyword:string){
    console.log("keyword",keyword);
    if(keyword){
      this.searchServe.search(keyword).subscribe(res=>{
        console.log('res',res);
      })
    }
    else{}
  }
}
