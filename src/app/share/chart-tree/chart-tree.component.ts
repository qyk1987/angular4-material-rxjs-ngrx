import { Component, OnInit,Inject,Input ,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef}from "@angular/material"
@Component({
  selector: 'app-chart-tree',
  templateUrl: './chart-tree.component.html',
  styleUrls: ['./chart-tree.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChartTreeComponent implements OnInit {
 @Input() title="结构图";
  chartOption ={};
  isLoading = true;
  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef:MdDialogRef<ChartTreeComponent>,
  ) { }

  ngOnInit() {
    if(this.data.data&&this.data.title){
      this.initChart(this.data.data,this.data.title);
    }
  }


  initChart(data,title){
    // echarts.util.each(data.children, function (datum, index) {
    //   index % 2 === 0 && (datum.collapsed = true);
    // });
    this.chartOption={
      tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        toolbox: {
          show : true,
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      //calculable : false,
        series: [
            {
                type: 'tree',
                //orient: 'horizontal',  // vertical horizontal
                //rootLocation: {x: '50%', y: '15%'}, // 根节点位置  {x: 'center',y: 10}
                top: '1%',
                left: '7%',
                bottom: '1%',
                right: '20%',

                symbolSize: 7,
                //nodePadding: 20,
                //layerPadding:40,
                //symbol: 'rectangle',
                //borderColor:'black',
                // itemStyle: {
                //     normal: {
                //           color: '#fff',//节点背景色
                //         label: {
                //             show: true,
                //             position: 'inside',
                //             textStyle: {
                //                 color: 'black',
                //                 fontSize: 15,
                //                 //fontWeight:  'bolder'
                //             }
                //         },
                //         lineStyle: {
                //             color: '#000',
                //             width: 1,
                //             type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                //         }
                //     },
                //     emphasis: {
                //         label: {
                //             show: false
                //         }
                //     }
                // },
                data: [this.dueTree(data)],
                label: {
                  normal: {
                      position: 'left',
                      verticalAlign: 'middle',
                      align: 'right',
                      fontSize: 12
                  }
              },

              leaves: {
                  label: {
                      normal: {
                          position: 'right',
                          verticalAlign: 'middle',
                          align: 'left'
                      }
                  }
              },

                // top: '1%',
                // left: '7%',
                // bottom: '1%',
                // right: '20%',

                // symbolSize: 7,

                // label: {
                //     normal: {
                //         position: 'left',
                //         verticalAlign: 'middle',
                //         align: 'right',
                //         fontSize: 9
                //     }
                // },
                
                // leaves: {
                //     label: {
                //         normal: {
                //             position: 'inside',
                //             verticalAlign: 'middle',
                //             align: 'left',
                //             textStyle: {
                //               color: 'black',
                //               fontSize: 15,
                //               //fontWeight:  'bolder'
                //           }
                //         }
                //     }
                // },

                // expandAndCollapse: true,
                // animationDuration: 550,
                // animationDurationUpdate: 750
            }
        ]
    };
    this.isLoading=false;
  }

  dueTree(tree){
    if(tree.children==null){
      return {
        name:tree.name,
        value:tree.value,
        symbolSize: [7,7],
        symbol: 'rectangle',
        // itemStyle: {
        //     normal: {
        //         label: {
        //           position: 'left',
        //           verticalAlign: 'middle',
        //           align: 'right',
        //           fontSize: 9
        //         },
        //         borderWidth: 1,
        //         //borderColor: 'black'
        //     }
        // },
      }
    }else{
      return {
        name:tree.name,
        value:tree.value,
        symbolSize:7,
        //symbol: 'rectangle',
        // itemStyle: {
        //     normal: {
        //         label: {
        //           position: 'left',
        //           verticalAlign: 'middle',
        //           align: 'right',
        //           fontSize: 9
        //         },
        //         borderWidth: 1,
        //         //borderColor: 'black'
        //     }
        // },
        children:tree.children.map(t=>this.dueTree(t))
      }
    }
  }
}
