import {trigger,state,transition,style,animate,keyframes} from '@angular/animations';
export const cardAnimate=trigger('card',[
    state('out',style({transform:'scale(1)','box-shadow':'none'})),
    state('hover',style({transform:'scale(1.1)','box-shadow':'3px 3px 5px  #ccc'})),
    transition('out=>hover',animate('0.1s ease-in')),
    transition('hover=>out',animate('0.1s ease-out')),
]);