import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserActions, UserActionTypes, GetUsersAction, LoadUsersAction, DeleteUserAction, SelectUserAction, LoadUserAction, SavedUserAction, SaveUserAction } from '../actions/user.actions';
import { UserService } from '../../user.service';
import { switchMap, map, mergeMap, debounceTime, withLatestFrom } from 'rxjs/operators';
import { Observable, defer, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from '../reducers';
import * as userSelectors from '../selectors/user.selectors';

@Injectable()
export class UserEffects {

  @Effect()
  get$ = this.actions$.pipe(
    ofType<GetUsersAction>(UserActionTypes.GET_USERS),
    switchMap(_ => {

      return this.userService.getUsers$()
        .pipe(
          map(users => {
            return new LoadUsersAction(users);
          })
        )

    })
  )

  @Effect({ dispatch: false })
  delete$ = this.actions$.pipe(
    ofType<DeleteUserAction>(UserActionTypes.DELETE_USER),
    mergeMap(action => {
      return this.userService.deleteUser$(+action.payload)
    })
  )

  @Effect()
  select$ = this.actions$.pipe(
    ofType<SelectUserAction>(UserActionTypes.SELECT_USER),
    withLatestFrom(this.store.pipe(select(userSelectors.selectUserKeys))),
    switchMap(([action, keys]) => {

      if (keys.includes(action.payload)) {
        return of();
      }

      return this.userService.getUser$(+action.payload)
        .pipe(
          mergeMap(user => {
            return [
              new LoadUserAction(user),
              new SelectUserAction(user.userId.toString())
            ];
          })
        )

    })
  )

  @Effect()
  save$ = this.actions$.pipe(
    ofType<SaveUserAction>(UserActionTypes.SAVE_USER),
    switchMap(action => {

      return this.userService.saveUser$(action.payload)
        .pipe(
          mergeMap(user => {
            if (user) {
              return [
                new LoadUserAction(user),
                new SavedUserAction()
              ]
            } else {
              return [
                new LoadUserAction(action.payload),
                new SavedUserAction()
              ]
            }
          })
        )

    })
  )

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private store: Store<State>
  ) { }

}