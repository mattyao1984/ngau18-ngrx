import { Action } from '@ngrx/store';
import { User } from '../../models/user';
import { type } from '../../../+state/utils/type-cache.util';

export class UserActionTypes {
  static readonly LOAD_USERS = type('[User] Load Users');
  static readonly GET_USERS = type('[User] Get Users');
}

export class LoadUsersAction implements Action {
  readonly type = UserActionTypes.LOAD_USERS;

  constructor(public payload: User[]) { }
}

export class GetUsersAction implements Action {
  readonly type = UserActionTypes.GET_USERS;

  constructor() { }
}

export type UserActions
  = LoadUsersAction
  | GetUsersAction
  ;

