import { Injectable,Inject} from '@angular/core';
import {HttpService} from './http.service';
import{Observable} from 'rxjs/Observable';
import {Order} from '../domain';
import {  LineChartVM, PieChartVM,LineChartVMObj,BasicLinePoint } from '../vm';

@Injectable()
export class ChartService  {
    
    private readonly domain="charts";

    constructor(private http:HttpService,){
        
      
    }
    getLineByDate(formDate): Observable<LineChartVM>{//获取堆积折线图数据
        const uri=`${this.domain}/GetStackBySeller`;
        return this.http
            .get(uri,formDate)
            .map(res=>res as LineChartVM);
    }
    getCampusStackByManager(formDate): Observable<LineChartVM>{//获取堆积折线图数据
        const uri=`${this.domain}/GetCampusStackByManager`;
        return this.http
            .get(uri,formDate)
            .map(res=>res as LineChartVM);
    }

    getSpotStackByManager(formDate): Observable<LineChartVMObj[]>{//获取堆积折线图数据
        const uri=`${this.domain}/GetSpotStackByManager`;
        return this.http
            .get(uri,formDate)
            .map(res=>res as LineChartVMObj[]);
    }

    getSpotStackByMaster(formDate):Observable<LineChartVM>{//获取堆积折线图数据  根据校区id获取校区下所有服务点业绩
        const uri=`${this.domain}/GetSpotStackByMaster`;
        return this.http
            .get(uri,formDate)
            .map(res=>res as LineChartVM);
    }

    getSpotBySpot(formDate):Observable<BasicLinePoint[]>{//获取堆积折线图数据  根据服务点id获取服务点业绩
        const uri=`${this.domain}/GetSpotBySpot`;
        return this.http
            .get(uri,formDate)
            .map(res=>res as BasicLinePoint[]);
    }
    getCategoryStackByManager(formDate):Observable<LineChartVM>{//获取堆积折线图数据  根据岗位获取对应级别的各大类业绩分部
        const uri=`${this.domain}/GetCategoryStackByManager`;
        return this.http
            .get(uri,formDate)
            .map(res=>res as LineChartVM);
    }
    getsubjectStackByManager(formDate): Observable<LineChartVMObj[]>{//获取堆积折线图数据  获取各大类下各科目的业绩
        const uri=`${this.domain}/GetsubjectStackByManager`;
        return this.http
            .get(uri,formDate)
            .map(res=>res as LineChartVMObj[]);
    }
    getSellerStackByManager(formDate):Observable<LineChartVM>{//获取堆积折线图数据  根据岗位获取所属业务员的业绩分部
        const uri=`${this.domain}/GetSellerStackByManager`;
        return this.http
            .get(uri,formDate)
            .map(res=>res as LineChartVM);
    }
    getPieByDate(formDate): Observable<PieChartVM[]>{//获取饼图数据
        const uri=`${this.domain}/GetPieBySeller`;
        const doc={
            startDate:formDate.startDate,
            endDate:formDate.endDate,
            postUserId:formDate.postUserId,
            flag:formDate.flag
        }
        return this.http
            .get(uri,doc)
            .map(res=>res as PieChartVM[]);
    }
   
}