import { UserActions, UserActionTypes } from '../actions/user.actions';
import { User } from '../../models/user';

export interface State {
  users: { [id: string]: User },
  userKeys: string[];
  selectedUserKey: string;

  loading: boolean;
  saving: boolean;
}

export const initialState: State = {
  users: {},
  userKeys: [],
  selectedUserKey: null,

  loading: false,
  saving: false
};

export function reducer(state = initialState, action: UserActions): State {
  switch (action.type) {

    case UserActionTypes.LOAD_USERS: {

      const payload = action.payload;
      const users = payload.reduce((acc, cur, i) => {
        acc[cur.userId] = cur;
        return acc;
      }, {});

      return {
        ...state,
        users,
        userKeys: Object.keys(users),
        loading: false
      }

    }

    case UserActionTypes.GET_USERS: {

      return {
        ...state,
        loading: true
      }

    }

    case UserActionTypes.DELETE_USER: {

      const userKeys = [...state.userKeys];
      const userKey = action.payload;

      const index = userKeys.indexOf(userKey);
      if (index > -1) {
        userKeys.splice(index, 1);
      }

      return {
        ...state,
        userKeys
      }
    }

    case UserActionTypes.SELECT_USER: {

      const userKey = action.payload;
      let selectedUserKey = null;

      if (state.userKeys.includes(userKey)) {
        selectedUserKey = userKey;
      }

      return {
        ...state,
        selectedUserKey
      }

    }

    case UserActionTypes.LOAD_USER: {

      const payload = action.payload;
      const userKey = payload.userId.toString();

      const users = { ...state.users };
      const userKeys = [...state.userKeys];
      let selectedUserKey = state.selectedUserKey;

      users[userKey] = payload;

      if (!state.userKeys.includes(userKey)) {
        userKeys.push(userKey);
      }

      if (state.saving) {
        selectedUserKey = userKey;
      }

      return {
        ...state,
        users,
        userKeys,
        selectedUserKey
      }

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

export const getUsers = (state: State) => state.userKeys.map(e => state.users[e]);
export const getLoading = (state: State) => state.loading;
export const getUserKeys = (state: State) => state.userKeys;
export const getSelectedUser = (state: State) => state.selectedUserKey ? state.users[state.selectedUserKey] : null;
export const getSaving = (state: State) => state.saving;