import { Component } from '@angular/core';
import { SearchService } from './services/search.service';
import { SearchResult } from './services/data-types/common.type';
import { NzResultTitleDirective } from 'ng-zorro-antd';
import { isEmptyObject } from './utils/tools';

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
  searchResult:SearchResult;
  constructor(private searchServe:SearchService){

  }
  onSearch(keyword:string){
    console.log("keyword",keyword);
    if(keyword){
      this.searchServe.search(keyword).subscribe(res=>{
        console.log('res',res);
        this.searchResult=this.highlightKeyWord(keyword,res);
        console.log(this.searchResult);
      })
    }

    else{this.searchResult={};}
  }
  private highlightKeyWord(keyword:string,result:SearchResult):SearchResult{
    if(isEmptyObject(result)){
      const reg=new RegExp(keyword,'ig');
      ['artists','playlists','songs'].forEach(type=>{
        if(result[type]){
          result[type].array.forEach(item => {
            item.name=item.name.replace(reg,'<span class="highlight">$&</span>')
          });
        }
      });
    }
    return result;
  }
}
