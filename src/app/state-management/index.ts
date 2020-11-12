import { TwitterDataState, twitterDataReducer } from './tweets/tweet.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
	twitterData: TwitterDataState;
}

export const reducers: ActionReducerMap<State> = {
	twitterData: twitterDataReducer
};
