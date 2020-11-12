import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TweetActions from '../state-management/tweets/tweet.actions';
import { TweetService } from '.././state-management/tweets/tweet.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SetSelectedHashtag } from '../state-management/tweets/tweet.actions';
import { State } from '../state-management';
import {
	selectSelectedHashtag,
	selectHashtagTweetCount,
	selectCountryCodeDataArray,
	selectTweetData
} from '../state-management/tweets/tweet.selectors';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-tweet-list',
	templateUrl: './tweet-list.component.html',
	styleUrls: ['./tweet-list.component.scss'],
	providers: [TweetService]
})
export class TweetListComponent implements OnInit {
	selectedHashtag$: Observable<string>;
	selectedHashtagTweetCount$: Observable<number>;
	selectedTweetData$: Observable<any>;
	chartData$: Observable<{ name: string; value: number }[]>;

	tweets = [];
	isSubscribed = true;
	form: FormGroup;
	submitted = false;

	constructor(private tweetService: TweetService, private store: Store<State>, private readonly fb: FormBuilder) {}

	ngOnInit(): void {
		this.subscribe();
		this.selectedHashtag$ = this.store.select(selectSelectedHashtag);
		this.selectedHashtagTweetCount$ = this.store.select(selectHashtagTweetCount);
		this.selectedTweetData$ = this.store.select(selectTweetData);
		this.chartData$ = this.store.select(selectCountryCodeDataArray);

		this.form = this.fb.group({
			hashtag: ['']
		});
	}

	toggleSubscription() {
		if (this.isSubscribed) {
			this.tweetService.stopListening();
		} else {
			this.subscribe();
		}
		this.isSubscribed = !this.isSubscribed;
	}

	subscribe() {
		this.tweetService.listen().subscribe((tweet) => {
			this.tweets.unshift(tweet.message);
			this.store.dispatch(new TweetActions.AddTweet(tweet.message));
		});
	}

	filterByHashtag(): void {
		this.submitted = true;

		const { hashtag } = this.form.value;

		if (this.form.valid) {
			this.store.dispatch(new SetSelectedHashtag({ hashtag }));
		}
	}
}
