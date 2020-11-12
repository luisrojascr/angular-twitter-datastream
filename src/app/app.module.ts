import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { TweetListComponent } from './tweet-list/tweet-list.component';
import { PubNubAngular } from 'pubnub-angular2';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { reducers } from './state-management/index';
import { EffectsModule } from '@ngrx/effects';
import { TweetEffects } from './state-management/tweets/tweet.effects';
import { TweetComponent } from './tweet-list/tweet/tweet.component';

@NgModule({
	declarations: [AppComponent, TweetListComponent, TweetComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot([TweetEffects])
	],
	providers: [PubNubAngular],
	bootstrap: [AppComponent]
})
export class AppModule {}
