import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { PubNubAngular } from 'pubnub-angular2';
import { Store } from '@ngrx/store';
import { State } from '../index';
import { selectSelectedHashtag } from './tweet.selectors';
import { TweetMessage } from './tweet.model';
import { ProcessTweet } from './tweet.actions';

@Injectable({
	providedIn: 'root'
})
export class TweetService implements OnDestroy {
	private channel = 'pubnub-twitter';
	private subsKey = 'sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe';
	private hashtag: string;
	private subs: Subscription[] = [];

	constructor(private pubnub: PubNubAngular, private store: Store<State>) {
		pubnub.init({
			publishKey: 'pub-c-f8efaa8a-cecf-4ac1-b2f8-cbf5b2931f88',
			subscribeKey: this.subsKey
		});

		this.subs.push(
			store.select(selectSelectedHashtag).subscribe((hashtag) => {
				this.hashtag = hashtag;
			})
		);

		pubnub.subscribe({
			channels: [this.channel]
		});
	}

	public ngOnDestroy() {
		for (const sub of this.subs) {
			sub.unsubscribe();
		}

		this.pubnub.unsubscribeAll();
		this.pubnub.stop();
	}

	public listen(): Observable<any> {
		return new Observable((observer: Observer<any>) => {
			this.pubnub.addListener({
				message: (msg) => observer.next(msg)
			});
		});
	}

	public stopListening() {
		this.pubnub.removeAllListeners();
	}

	public initMessageStream() {
		this.pubnub.init({
			subscribeKey: this.subsKey
		});

		this.pubnub.addListener({
			message: (data: any) => {
				this.processTweet(data);
			}
		});

		this.pubnub.subscribe({
			channels: [this.channel]
		});
	}

	private processTweet(data: any) {
		const tweet: TweetMessage = data.message;

		if (this.hashtag && this.hasHashtag(tweet)) {
			this.store.dispatch(new ProcessTweet({ hashtag: this.hashtag, tweet }));
		}
	}

	private hasHashtag(tweet: TweetMessage) {
		// Check both the text and the hastags to match against for more chances at a relevant tweet.
		return (
			tweet.text.toLowerCase().includes(this.hashtag.toLowerCase()) ||
			tweet.entities.hashtags.find((h) => h.text.toLowerCase() === this.hashtag.toLowerCase())
		);
	}
}
