import { UserActions, UserActionTypes } from '../actions/user.actions';
import { User } from '../../models/user';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IdSelector } from '@ngrx/entity/src/models';

export interface State extends EntityState<User> {
  selectedUserId: string;

  loading: boolean;
  saving: boolean;
}

export const userSelector: IdSelector<User> = (user: User) => user.userId.toString();
export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: userSelector
});

export const initialState: State = adapter.getInitialState({
  selectedUserId: null,

  loading: false,
  saving: false
});

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {

    case UserActionTypes.LOAD_USERS: {
      let newState = adapter.addAll(action.payload, state);
      newState.loading = false;

      return newState;

    }

    case UserActionTypes.GET_USERS: {

      return {
        ...state,
        loading: true
      }

    }

    case UserActionTypes.DELETE_USER: {

      const newState = adapter.removeOne(action.payload, state);

      return newState;

    }

    case UserActionTypes.SELECT_USER: {

      const userKey = action.payload;
      let selectedUserId = null;
      const ids: any = state.ids;

      if (ids.includes(userKey)) {
        selectedUserId = userKey;
      }

      return {
        ...state,
        selectedUserId
      }

    }

    case UserActionTypes.LOAD_USER: {

      const payload = action.payload;
      const userKey = payload.userId.toString();

      const newState = adapter.upsertOne(payload, state);
      if (state.saving) {
        newState.selectedUserId = userKey;
      }

      return newState;

    }

    case UserActionTypes.SAVE_USER: {

      return {
        ...state,
        saving: true
      }
    }

    case UserActionTypes.SAVED_USER: {

      return {
        ...state,
        saving: false
      }

    }

    default:
      return state;
  }
}

const {
  // select the array of user ids
  selectIds: selectUserIds,

  // select the dictionary of user entities
  selectEntities: selectUserEntities,

  // select the array of users
  selectAll: selectAllUsers,

  // select the total user count
  selectTotal: selectUserTotal,
} = adapter.getSelectors();

export const getUsers = selectAllUsers;
export const getLoading = (state: State) => state.loading;
export const getUserKeys = selectUserIds;
export const getSelectedUser = (state: State) => state.selectedUserId ? state.entities[state.selectedUserId] : null;
export const getSaving = (state: State) => state.saving;