import Constants from './constants.js';

window.twitter = {};

let TWEET_LIMIT = 50;

let TWEET_IMPORTANCE = {
	high: 2,
	normal: 1
};

export let tweet = (personId, tick, text, importance) => {
	importance = importance || TWEET_IMPORTANCE.normal;
	if (!window.twitter[personId]) window.twitter[personId] = [];
	window.twitter[personId].splice(0, 0, {tick, text, importance});
	if (window.twitter[personId].length >= TWEET_LIMIT) window.twitter[personId] = window.twitter[personId].slice(0, TWEET_LIMIT);
}

export let tweetImportant = (personId, tick, text) => {
	tweet(personId, tick, text, TWEET_IMPORTANCE.high);
}

export let getTweets = (personId) => {
	return window.twitter[personId] || [];
}

// tweet('p000', 0, "hello, world");
// tweet('p000', 5 * 16 + 3, "hello, world from 16:36");
// tweet('p000', 5 * 24 * 2 * 6.5, "next tweet from 2006");
