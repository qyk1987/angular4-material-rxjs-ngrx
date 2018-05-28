import {trigger,state,transition,style,animate,keyframes,query,stagger} from '@angular/animations';
export const listAnimate=trigger('listAnim',[
    transition('*=>*',[
        query(':enter',style({opacity:'0'}),{optional:true}),
        query(':enter',stagger(100,[
            animate('0.1s',style({opacity:'1'}))
        ]),{optional:true}),
        query(':leave',style({opacity:'1'}),{optional:true}),
        query(':leave',stagger(100,[
            animate('0.1s',style({opacity:'0'}))
        ]),{optional:true})
    ])
]);