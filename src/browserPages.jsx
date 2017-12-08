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

let Link = ({navigate, to, children}) => {
	return <span className='WebLink' onClick={() => navigate(to)}>{children}</span>;
}

export let FriendsterPage = ({simState, navigate}) => {
	let ppl = simState.agents.people; // a dictionary
	return (
		<div className='FriendsterPage friendster-pages-shared'>
			<h5>ALL PUBLIC PROFILES</h5>
			<ul>{Object.keys(ppl).map((id) => <FriendCell key={id} id={id} agent={ppl[id]} navigate={navigate} />)}</ul>
		</div>
	)
}

let FriendCell = ({id, agent, navigate}) => {
	return (
		<div className='FriendCell'>
			<div><img src='/webAssets/blankProfile.jpg' /></div>
			<div>
				<Link navigate={navigate} to={{component: FriendsterProfile, agentId: id}}>{agent.name}</Link>
				<p>{agent.ageYears} years old</p>
			</div>
		</div> 
	)
}

let FriendsterProfile = ({agentId, navigate, simState}) => {
	let agent = simState.agents.people[agentId];
	let apartment = agent.homeId ? <ApartmentCell id={agent.homeId} simState={simState} navigate={navigate} /> : <EmptyState>No home</EmptyState>;
	return (
		<div className='FriendsterProfile friendster-pages-shared'>
			<img src='/webAssets/blankProfile.jpg' />
			<h1>{agent.name}</h1>
			<p>{agent.ageYears} years old</p>
			<h3>Residence:</h3>
			{apartment}
		</div>
	)
}

export let RoomsterPage = ({navigate, simState}) => {
	let buildingsById = simState.map.buildings;
	let apartmentIds = Object.keys(buildingsById).filter((id) => buildingsById[id].typeId === 'home');
	return (
		<div className='RoomsterPage roomster-pages-shared'>
			<header>
				<img src='/webAssets/Roomster.png' />
				<p>Live where you love. Love where you live. Love where you love.</p>
			</header>
			<ul>{ apartmentIds.map((id) => <li key={id}><ApartmentCell id={id} navigate={navigate} simState={simState} /></li> ) }</ul>
		</div>
	)
}

let ApartmentCell = ({id, navigate, simState}) => {
	let building = simState.map.buildings[id];
	return (
		<div className='ApartmentCell'>
			<h3>{building.name}</h3>
			<div className='details'>
				<ApartmentDetail name="Rent: " value={building.rent} />
				<ApartmentDetail name="Occupants: " value={building.occupants.length} />
				<ApartmentDetail name="Vacancies: " value={building.occupancy - building.occupants.length} />
			</div>
		</div>
	)
}

let ApartmentDetail = ({name, value}) => {
	return <div className='ApartmentDetail'><span className='name'>{name}</span><span className='value'>{value}</span></div>;
}

let EmptyState = ({children}) => {
	return <p className='EmptyState'>{children}</p>;
}
