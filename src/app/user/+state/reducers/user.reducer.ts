import { UserActions, UserActionTypes } from '../actions/user.actions';
import { User } from '../../models/user';

export interface State {
  users: { [id: string]: User },
  userKeys: string[];

  loading: boolean;
}

export const initialState: State = {
  users: {},
  userKeys: [],

  loading: false
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

    default:
      return state;
  }
}

export const getUsers = (state: State) => state.userKeys.map(e => state.users[e]);
export const getLoading = (state: State) => state.loading;
