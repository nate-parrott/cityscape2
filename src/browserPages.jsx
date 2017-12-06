import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export let WelcomePage = ({simState, navigate}) => {
	return (
		<div className='WelcomePage'>
			<h1>Welcome to the World Wide Teletype System!</h1>
			<p>Use this space-age tool to find anything you want! Find a job, find an apartment, find truth, even find love!</p>
			<p>Your kingdom awaits!</p>
		</div>
	);
}

export let FriendsterPage = ({simState, navigate}) => {
	return <h1>Friendster goes here</h1>;
}
