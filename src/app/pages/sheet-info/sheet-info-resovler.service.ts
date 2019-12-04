import{Injectable} from "@angular/core"
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SongSheet } from 'src/app/services/data-types/common.type';
import { SheetService } from 'src/app/services/sheet.service';
import { Observable } from 'rxjs';
@Injectable()
export class SheetInfoResolverService implements Resolve<SongSheet>{
    constructor(private sheetServe:SheetService){}
    resolve(route:ActivatedRouteSnapshot):Observable<SongSheet>{
return this.sheetServe.getSongSheetDetail(Number(route.paramMap.get('id')));
    }
}