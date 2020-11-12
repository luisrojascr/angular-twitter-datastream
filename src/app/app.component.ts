import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state-management';
import { InitializeStream } from './state-management/tweets/tweet.actions';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(private store: Store<State>) {}

	public ngOnInit() {
		this.store.dispatch(new InitializeStream());
	}
}
