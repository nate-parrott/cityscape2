import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { WelcomePage, FriendsterPage } from './browserPages.jsx';

let bookmarks = [
	{title: 'Home', nav: {component: WelcomePage}},
	{title: 'Friendster', nav: {component: FriendsterPage}},
	{title: 'Jobster', nav: {component: FriendsterPage}},
	{title: 'Roomster', nav: {component: FriendsterPage}}
]

class Browser extends Component {
	constructor(props) {
		super(props);
		this.state = {simState: null, nav: bookmarks[0].nav, navStack: [], selectedTab: 'friendster'};
	}
	componentDidMount() {
		this.reload();
	}
	reload() {
		this.setState({simState: this.props.city.simState});
	}
	render() {
		return (
			<div className='Browser'>
				<div className='NavBar'>
					{this.renderActions()}
					<BookmarksBar bookmarks={bookmarks} onNavigate={this.navigate.bind(this)} />
				</div>
				<div className='content'>{this.renderContent()}</div>
			</div>
		)
	}
	navigate(nav) {
		this.reload();
		this.setState({nav, navStack: [...this.state.navStack, this.state.nav]});
	}
	renderActions() {
		return (
			<div className='browserButtons'>
				<i className='fa fa-arrow-left' onClick={this.back.bind(this)} />
				<i className='fa fa-refresh' onClick={this.reload.bind(this)} />
			</div>
		);
	}
	back() {
		let navStack = this.state.navStack.slice();
		if (navStack.length > 0) {
			let backTo = navStack[navStack.length-1];
			navStack.splice(navStack.length-1, 1);
			this.setState({nav: backTo, navStack});
		}
	}
	renderContent() {
		if (!this.state.nav) return null;
		let Component = this.state.nav.component;
		return <Component navigate={this.navigate.bind(this)} simState={this.state.simState} {...this.state.nav} />;
	}
}

let BookmarksBar = ({bookmarks, onNavigate}) => {
	return (
		<div className='BookmarksBar'>
		{bookmarks.map(({title, nav}, i) => {
			return <div onClick={() => onNavigate(nav)} key={i}>{title}</div>;
		})}
		</div>
	)
}

class FloatingWindow extends Component {
	constructor(props) {
		super(props);
		this.state = {x: 100, y: 100};
		this.posAtDragStart = null;
	}
	render() {
		return (
			<div className='FloatingWindow' style={{top: this.state.y, left: this.state.x}}>
			<div className='titleBar' onMouseDown={this.mouseDown.bind(this)} onMouseUp={this.mouseUp.bind(this)} onMouseMove={this.mouseMove.bind(this)}>
					<div className='title'>{this.props.title}</div>
					<div className='actions'><div onClick={() => this.props.onClose()}><i className='fa fa-times' /></div></div>
				</div>
				<div className='windowContent'>{this.props.children}</div>
			</div>
		)
	}
	mouseDown(e) {
		this.posAtDragStart = {mouseX: e.screenX, mouseY: e.screenY, windowX: this.state.x, windowY: this.state.y};
	}
	mouseUp(e) {
		this.posAtDragStart = null;
	}
	mouseMove(e) {
		if (this.posAtDragStart) {
			let x = this.posAtDragStart.windowX + e.screenX - this.posAtDragStart.mouseX;
			let y = this.posAtDragStart.windowY + e.screenY - this.posAtDragStart.mouseY;
			this.setState({x, y});
		}
	}
}

export let showBrowserWindow = (city) => {
	let div = document.createElement("div");
	document.body.appendChild(div);
	let onClose = () => {
		// TODO
	}
	ReactDOM.render(<FloatingWindow onClose={onClose} title="Internet Explorer"><Browser city={city} /></FloatingWindow>, div);
}
