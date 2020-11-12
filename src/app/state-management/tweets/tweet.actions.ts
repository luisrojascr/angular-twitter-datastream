import { Action } from '@ngrx/store';
import { TweetMessage } from './tweet.model';

export enum TweetActionTypes {
	ADD_TWEET = 'ADD_TWEET',
	SET_SELECTED_HASHTAG = '[User] Set Selected Hashtag',
	PROCESS_TWEET = '[API] Process tweet',
	INITIALIZE_STREAM = '[User] Initialize message stream'
}

export class AddTweet implements Action {
	readonly type = TweetActionTypes.ADD_TWEET;

	constructor(public tweet: TweetMessage) {}
}

export class InitializeStream implements Action {
	readonly type = TweetActionTypes.INITIALIZE_STREAM;
}

export class SetSelectedHashtag implements Action {
	readonly type = TweetActionTypes.SET_SELECTED_HASHTAG;

	constructor(readonly payload: { hashtag: string }) {}
}

export class ProcessTweet implements Action {
	readonly type = TweetActionTypes.PROCESS_TWEET;

	constructor(readonly payload: { hashtag: string; tweet: TweetMessage }) {}
}

export type TweetActions = AddTweet | InitializeStream | SetSelectedHashtag | ProcessTweet;
