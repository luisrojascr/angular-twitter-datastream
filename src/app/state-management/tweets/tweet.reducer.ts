import { TweetMessage } from './tweet.model';
import { TweetActions, TweetActionTypes } from './tweet.actions';
import produce from 'immer';

export interface TwitterDataState {
	tweetCount: { [hashtag: string]: number };
	countryCodeData: { [countryCode: string]: number };
	selectedHashtag: string;
	tweetData: any;
}

export const initialState: TwitterDataState = {
	tweetCount: {},
	countryCodeData: {},
	selectedHashtag: '',
	tweetData: []
};

export function twitterDataReducer(state: TwitterDataState = initialState, action: TweetActions) {
	return produce(state, (draft) => {
		switch (action.type) {
			case TweetActionTypes.SET_SELECTED_HASHTAG: {
				if (draft.selectedHashtag === action.payload.hashtag) {
					return;
				}

				if (draft.selectedHashtag) {
					draft.tweetCount[draft.selectedHashtag] = 0;
				}

				draft.countryCodeData = {};

				draft.selectedHashtag = action.payload.hashtag;
				draft.tweetCount[action.payload.hashtag] = 0;

				return;
			}

			case TweetActionTypes.PROCESS_TWEET: {
				const tweet = action.payload.tweet;
				const countryCode: string = tweet.place && tweet.place.country_code;

				draft.tweetData.push(action.payload.tweet);

				draft.tweetCount[action.payload.hashtag]++;
				if (countryCode) {
					draft.countryCodeData[countryCode] = draft.countryCodeData[countryCode] || 0;
					draft.countryCodeData[countryCode]++;
				}
				return;
			}
		}
	});
}
