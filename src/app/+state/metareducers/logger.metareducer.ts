import { ActionReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

export function logger(reducer: ActionReducer<any>): any {
    // default, no options
    return storeLogger()(reducer);
}
