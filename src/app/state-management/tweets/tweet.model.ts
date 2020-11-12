export interface TweetMessage {
	id: string;
	created_at?: string;
	user: User;
	entities: any;
	place: Place;
	text: string;
	extended_tweet: any;
}

export interface User {
	name: string;
	screen_name: string;
	profile_image_url: string;
}

export interface Place {
	country: string;
	country_code: string;
	name: string;
	full_name: string;
}
