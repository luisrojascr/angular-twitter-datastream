import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TwitterDataState } from './tweet.reducer';

export const selectMessagesState = createFeatureSelector<TwitterDataState>('twitterData');

export const selectSelectedHashtag = createSelector(selectMessagesState, (state) => state.selectedHashtag);

export const selectTweetCount = createSelector(selectMessagesState, (state) => state.tweetCount);

export const selectTweetData = createSelector(selectMessagesState, (state) => state.tweetData);

export const selectHashtagTweetCount = createSelector(
	selectTweetCount,
	selectSelectedHashtag,
	(tweetCount, hashtag: string) => tweetCount[hashtag]
);

export const selectCountryCodeData = createSelector(selectMessagesState, (state) => state.countryCodeData);

export const selectCountryCodeDataArray = createSelector(selectCountryCodeData, (countryCodeData) => {
	return Object.keys(countryCodeData).map((countryCode) => {
		return { name: countryCode, value: countryCodeData[countryCode] };
	});
});
