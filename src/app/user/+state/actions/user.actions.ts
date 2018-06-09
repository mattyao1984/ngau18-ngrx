import { Action } from '@ngrx/store';
import { User } from '../../models/user';
import { type } from '../../../+state/utils/type-cache.util';

export class UserActionTypes {
  static readonly LOAD_USERS = type('[User] Load Users');
  static readonly GET_USERS = type('[User] Get Users');

  static readonly DELETE_USER = type('[User] Delete User');

  static readonly SELECT_USER = type('[User] Select User');
  static readonly LOAD_USER = type('[User] Load User');
  static readonly SAVE_USER = type('[User] Save User');
  static readonly SAVED_USER = type('[User] Saved User');

}

export class LoadUsersAction implements Action {
  readonly type = UserActionTypes.LOAD_USERS;

  constructor(public payload: User[]) { }
}

export class GetUsersAction implements Action {
  readonly type = UserActionTypes.GET_USERS;

  constructor() { }
}

export class DeleteUserAction implements Action {
  readonly type = UserActionTypes.DELETE_USER;

  constructor(public payload: string) { }
}

export class LoadUserAction implements Action {
  readonly type = UserActionTypes.LOAD_USER;

  constructor(public payload: User) { }
}

export class SelectUserAction implements Action {
  readonly type = UserActionTypes.SELECT_USER;

  constructor(public payload: string) { }
}

export class SaveUserAction implements Action {
  readonly type = UserActionTypes.SAVE_USER;

  constructor(public payload: User) { }
}

export class SavedUserAction implements Action {
  readonly type = UserActionTypes.SAVED_USER;

  constructor() { }
}

export type UserActions
  = LoadUsersAction
  | GetUsersAction
  | DeleteUserAction
  | LoadUserAction
  | SelectUserAction
  | SaveUserAction
  | SavedUserAction
  ;

