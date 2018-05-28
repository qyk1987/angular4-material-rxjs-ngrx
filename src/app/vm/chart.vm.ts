export interface LineChartVMObj {
   title:string;
   data:LineChartVM;
}

export interface LineChartVM {
    chartDatas:ChartData[];
    chartLabels:string[]
}

export interface ChartData{
    data:number[];
    name:string;
}
export interface PieChartVM {
    value:number;
    name:string;
}

export interface BasicLinePoint{
    data:number; 
    label:string;
}