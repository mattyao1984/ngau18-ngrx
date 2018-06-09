import * as fromUser from "./user.reducer";
import { ActionReducerMap } from "@ngrx/store";
import * as fromApp from "../../../+state/reducers";

export interface UserFeatureState {
    users: fromUser.State
}

export const reducers: ActionReducerMap<UserFeatureState> = {
    users: fromUser.reducer
};

export interface State extends fromApp.State {
    user: UserFeatureState
}