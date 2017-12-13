import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getTweets, formatTickAsTime } from './twitter.js';
import Constants, { ticksPerYear } from './constants.js';

let formatEuros = (e) => {
	return "€" + Math.round(e * 100) / 100;
}

let formatPercent = (frac) => {
	return Math.round(frac * 100) + '%';
}

export let WelcomePage = ({simState, navigate}) => {
	if (!simState) return null;
	return (
		<div className='WelcomePage'>
			<h1>Welcome to the World Wide Teletype System!</h1>
			<p>The current time is: <strong>{formatTickAsTime(simState.simulation.tick)}</strong></p>
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
			<ul>{Object.keys(ppl).map((id) => <FriendCell key={id} id={id} agent={ppl[id]} navigate={navigate} simState={simState} />)}</ul>
		</div>
	)
}

let agentAgeYears = (id, simState) => {
	let agent = simState.agents.people[id];
	return (simState.simulation.tick - agent.birthTick) / ticksPerYear;
}

let FriendCell = ({id, agent, navigate, simState}) => {
	return (
		<div className='FriendCell'>
			<div><img src='/webAssets/blankProfile.jpg' /></div>
			<div>
				<Link navigate={navigate} to={{component: FriendsterProfile, agentId: id}}>{agent.name}</Link>
				<BasicInfo navigate={navigate} agentId={id} simState={simState} />
			</div>
		</div> 
	)
}

let FriendsterProfile = ({agentId, navigate, simState}) => {
	let agent = simState.agents.people[agentId];
	let apartment = agent.homeId ? <ApartmentCell id={agent.homeId} simState={simState} navigate={navigate} /> : <EmptyState>No home</EmptyState>;
	
	let job;
	if (agent.workplaceId) {
		let workplace = simState.map.buildings[agent.workplaceId];
		job = <JobCell job={workplace.jobs[agent.jobId]} navigate={navigate} workplaceId={agent.workplaceId} workplace={workplace} />;
	} else {
		job = <EmptyState>No job</EmptyState>;
	}
	let skills = agent.skills;
	return (
		<div className='FriendsterProfile friendster-pages-shared'>
			<img src='/webAssets/blankProfile.jpg' />
			<h1>{agent.name}</h1>
			<p>{agentAgeYears(agentId, simState) | 0} years old</p>
			<SatisfactionRow agent={agent} />
		
			<h3>Residence:</h3>
			{apartment}
			<h3>Job:</h3>
			{job}
			<div className='skills'>
				<h3>Skills</h3>
				{Object.keys(skills).map((skill) => <Detail key={skill} name={skill} value={formatPercent(skills[skill])} />)}
			</div>
			<h3>Recent updates:</h3>
			<div className='tweets'>{getTweets(agentId).map((tweet, i) => <TweetCell key={i} tweet={tweet} />)}</div>
		</div>
	)
}

let BasicInfo = ({navigate, agentId, simState}) => {
	let agent = simState.agents.people[agentId];
	let job;
	if (agent.workplaceId) {
		let workplace = simState.map.buildings[agent.workplaceId];
		let jobTitle = workplace.jobs[agent.jobId].title;
		job = <span>{jobTitle} at <Link navigate={navigate} to={{component: JobsterBusinessPage, id: agent.workplaceId}}>{workplace.name}</Link></span>;
	} else {
		job = "No job";
	}
	let home = null;
	if (agent.homeId) {
		let homeName = simState.map.buildings[agent.homeId].name;
		home = <span>Lives at {homeName}</span>;
	} else {
		home = "No home";
	}
	
	return (
		<div className='BasicInfo'>
			<SatisfactionRow agent={agent} />
			<p>{job}</p>
			<p>{home}</p>
		</div>
	)
}

let SatisfactionRow = ({agent}) => {
	return <p className='SatisfactionRow'>🛌 {formatPercent(agent.satisfaction.rest)} 🎉 {formatPercent(agent.satisfaction.fun)}</p>;
}

let TweetCell = ({tweet}) => {
	let {text, tick} = tweet;
	return <div className='TweetCell'><p>{text}</p><p className='time'>{formatTickAsTime(tick)}</p></div>;
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
				<Detail name="Rent:" value={formatEuros(building.rent) + "/day"} />
				<Detail name="Occupants:" value={building.occupants.length} />
				<Detail name="Vacancies:" value={building.occupancy - building.occupants.length} />
			</div>
		</div>
	)
}

let Detail = ({name, value}) => {
	return <div className='Detail'><span className='name'>{name + ': '}</span><span className='value'>{value}</span></div>;
}

let EmptyState = ({children}) => {
	return <p className='EmptyState'>{children}</p>;
}

export let JobsterPage = ({navigate, simState}) => {
	let buildingsById = simState.map.buildings;
	let buildingIds = Object.keys(buildingsById).filter((id) => buildingsById[id].typeId === 'work');
	return (
		<div className='JobsterPage jobster-pages-shared'>
			<header>
				<img src='/webAssets/JobsterLogo.png' />
			</header>
			<div>{ buildingIds.map((id) => <BusinessCell key={id} id={id} navigate={navigate} simState={simState} />) }</div>
		</div>
	)
}

let BusinessCell = ({navigate, simState, id}) => {
	let building = simState.map.buildings[id];
	let jobs = Object.values(building.jobs);
	let filledJobs = jobs.filter((job) => !!job.personId);
	let unfilledJobs = jobs.filter((job) => !job.personId);
	return (
		<div className='BusinessCell'>
			<h3><Link navigate={navigate} to={{component: JobsterBusinessPage, id: id}}>{building.name}</Link></h3>
			<div><Detail name='Employees' value={filledJobs.length} /> <Detail name='Unfilled positions' value={unfilledJobs.length} /> </div>
		</div>
	)
}

let JobsterBusinessPage = ({navigate, simState, id}) => {
	let building = simState.map.buildings[id];
	let jobs = building.jobs;
	let filledJobIds = Object.keys(jobs).filter((id) => !!jobs[id].personId);
	let unfilledJobIds = Object.keys(jobs).filter((id) => !jobs[id].personId);
	return (
		<div className='JobsterBusinessPage jobster-pages-shared'>
			<BusinessCell navigate={navigate} simState={simState} id={id} />
			<h5>Job Openings</h5>
			{unfilledJobIds.map((id) => <JobCell job={jobs[id]} key={id} navigate={navigate} />)}
			{filledJobIds.map((id) => <FilledJobCell job={jobs[id]} key={id} navigate={navigate} simState={simState} />)}
		</div>
	)
};

let FilledJobCell = ({job, navigate, simState}) => {
	let personName = simState.agents.people[job.personId].name;
	return (
		<div className='FilledJobCell'>
			<h5>Filled by <Link navigate={navigate} to={{component: FriendsterProfile, id: job.jobId}}>{name}</Link></h5>
			<JobCell job={job} navigate={navigate} />
		</div>
	)
}

let JobCell = ({job, navigate, workplaceId, workplace}) => {
	let skills = job.skills;
	let workplaceLink = workplaceId ? ["at ", <Link key='link' navigate={navigate} to={{component: JobsterBusinessPage, id: workplaceId}}>{workplace.name}</Link>] : null;
	return (
		<div className='JobCell'>
			<div className='desc'>
				<h3>{job.title} {workplaceLink}</h3>
				<div className='skills'>
					<h6>Required skills</h6>
					{Object.keys(skills).map((skill) => <Detail key={skill} name={skill} value={formatPercent(skills[skill])} />)}
				</div>
			</div>
			<div className='salary'>{formatEuros(job.salary)}/day</div>
		</div>
	)
}
