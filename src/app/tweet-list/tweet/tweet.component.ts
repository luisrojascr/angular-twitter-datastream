import { Component, OnInit, Input } from '@angular/core';
import { TweetMessage } from 'src/app/state-management/tweets/tweet.model';

@Component({
	selector: 'app-tweet',
	templateUrl: './tweet.component.html',
	styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {
	@Input() tweets: TweetMessage[];

	constructor() {}

	ngOnInit() {}
}
