import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as tweetActions from './tweet.actions';
import { TweetService } from './tweet.service';
import { State } from '../index';
import { TweetActionTypes } from './tweet.actions';

@Injectable()
export class TweetEffects {
	@Effect({ dispatch: false })
	addTweet$: Observable<Action> = this.action$.pipe(
		ofType<tweetActions.AddTweet>(TweetActionTypes.ADD_TWEET),
		mergeMap((action) => this.tweetService.listen()),
		map((msg) => msg.message)
	);

	@Effect({ dispatch: false })
	initializeStream$ = this.action$.pipe(
		ofType<tweetActions.InitializeStream>(TweetActionTypes.INITIALIZE_STREAM),
		tap(() => this.tweetService.initMessageStream()),
		catchError((err) => {
			console.log('An error ocurred while initializing the stream.', err);
			return EMPTY;
		})
	);

	constructor(private action$: Actions, private store$: Store<State>, private tweetService: TweetService) {}
}
