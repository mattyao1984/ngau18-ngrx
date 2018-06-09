import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserActions, UserActionTypes, GetUsersAction, LoadUsersAction } from '../actions/user.actions';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from '../../user.service';

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

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

}