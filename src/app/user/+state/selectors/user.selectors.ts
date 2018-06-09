import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserFeatureState } from '../reducers';
import * as fromUser from '../reducers/user.reducer';

export const selectUserFeatureState = createFeatureSelector<UserFeatureState>('user');

export const selectUserState = createSelector(selectUserFeatureState, (state) => state.users);

export const selectUsers = createSelector(selectUserState, fromUser.getUsers);
export const selectLoading = createSelector(selectUserState, fromUser.getLoading);
export const selectUserKeys = createSelector(selectUserState, fromUser.getUserKeys);
export const selectSelectedUser = createSelector(selectUserState, fromUser.getSelectedUser);
export const selectSaving = createSelector(selectUserState, fromUser.getSaving);

export const selectAnyUsers = createSelector(selectUserState, (state) => state.userKeys.length > 0);
