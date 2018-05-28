import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect,toPayload } from '@ngrx/effects';
import * as actions from '../actions/post.action';
import { PostService } from '../services/post.service';
import { Post } from '../domain';
import {go} from '@ngrx/router-store';
import * as fromRoot from '../reducers';
import {of} from 'rxjs/observable/of';
@Injectable()
export class PostEffects {
    
  
    @Effect() 
    addPost$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.ADD)
        .map(toPayload)
        .switchMap(post=>{
           return  this.service$.add(post)
            .map(post=>new actions.AddSuccessAction(post))
            .catch(err=>Observable.of(new actions.AddFailAction(JSON.stringify(err))));
        }
       
        );
    @Effect() 
    updatePost$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.UPDATE)
        .map(toPayload)
        .switchMap(post=>this.service$.update(post)
            .map(post=>new actions.UpdateSuccessAction(post))
            .catch(err=>Observable.of(new actions.UpdateFailAction(JSON.stringify(err))))            
        );   
    @Effect() 
    deletePost$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.DELETE)
        .map(toPayload)
        .switchMap((post)=>this.service$.del(post)
            .map(post=>new actions.DeleteSuccessAction(post))
            .catch(err=>Observable.of(new actions.DeleteFailAction(JSON.stringify(err))))            
        );   
     @Effect() 
    loadPostsByPage$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD_BY_PAGE)
        .map(toPayload)
        .switchMap(p=>this.service$.getByPage(p.level,p.id,p.page)
            .map(result=>new actions.LoadByPageSuccessAction(result))
            .catch(err=>Observable.of(new actions.LoadByPageFailAction(JSON.stringify(err))))
        );
    @Effect() 
    loadPosts$: Observable<Action> = this.actions$.
        ofType(actions.ActionTypes.LOAD)
        .map(toPayload)
        .switchMap(p=>this.service$.get()
            .map(result=>new actions.LoadSuccessAction(result))
            .catch(err=>Observable.of(new actions.LoadFailAction(JSON.stringify(err))))
        );

    constructor(
        private actions$: Actions,
        private store$:Store<fromRoot.State>,
        private service$:PostService
    ) {}
}