/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TweetListComponent } from './tweet-list.component';

describe('TweetListComponent', () => {
	let component: TweetListComponent;
	let fixture: ComponentFixture<TweetListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TweetListComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TweetListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
