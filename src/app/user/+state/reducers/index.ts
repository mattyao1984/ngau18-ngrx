import * as fromUser from "./user.reducer";
import { ActionReducerMap } from "@ngrx/store";
import * as fromApp from "../../../+state/reducers";

export interface UserState {
    users: fromUser.State
}

export const reducers: ActionReducerMap<UserState> = {
    users: fromUser.reducer
};

export interface State extends fromApp.State {
    user: UserState
}