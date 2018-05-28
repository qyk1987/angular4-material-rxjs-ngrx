import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private store$:Store<fromRoot.State>,
        private router: Router
    ){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean>  {
        return this.store$.select(fromRoot.getAuth).take(1)
        .map(auth=>{
            if(auth.isLogin){
                return true;
            }else{
                this.router.navigate(['/login']);
                return false;
            }
            
        })
    }
}
