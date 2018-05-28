import {trigger,state,transition,style,animate,keyframes} from '@angular/animations';
export const itemAnimate=trigger('item',[
    state('in',style({'border-left-width':'3px'})),
    state('out',style({'border-left-width':'8px'})),
    transition('in=>out',animate('0.1s ease-in')),
    transition('out=>in',animate('0.1s ease-out')),
]);