import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { WelcomePage, FriendsterPage, RoomsterPage, JobsterPage } from './browserPages.jsx';

let bookmarks = [
	{title: 'Home', nav: {component: WelcomePage}},
	{title: 'Friendster', nav: {component: FriendsterPage}},
	{title: 'Jobster', nav: {component: JobsterPage}},
	{title: 'Roomster', nav: {component: RoomsterPage}}
]

class Browser extends Component {
	constructor(props) {
		super(props);
		this.state = {simState: null, nav: bookmarks[0].nav, navStack: [], selectedTab: 'friendster'};
		
		this.navigate = this.navigate.bind(this);
		this.back = this.back.bind(this);
		this.reload = this.reload.bind(this);
	}
	componentDidMount() {
		this.reload();
		setInterval(() => {
			this.reload();
		}, 100);
	}
	reload() {
		this.forceUpdate();
	}
	render() {
		return (
			<div className='Browser'>
				<div className='NavBar'>
					{this.renderActions()}
					<BookmarksBar bookmarks={bookmarks} onNavigate={this.navigate} />
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
				<i className='fa fa-arrow-left' onClick={this.back} />
				<i className='fa fa-refresh' onClick={this.reload} />
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
		return <Component navigate={this.navigate} simState={this.props.city.currentSimState} {...this.state.nav} />;
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
		
		this.mouseDown = this.mouseDown.bind(this);
		this.mouseUp = this.mouseUp.bind(this);
		this.mouseMove =this.mouseMove.bind(this);
	}
	render() {
		return (
			<div className='FloatingWindow' style={{top: this.state.y, left: this.state.x}}>
			<div className='titleBar' onMouseDown={this.mouseDown} onMouseUp={this.mouseUp} onMouseMove={this.mouseMove}>
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
		ReactDOM.unmountComponentAtNode(div);
		div.parentElement.removeChild(div);
	}
	ReactDOM.render(<FloatingWindow onClose={onClose} title="Internet Explorer"><Browser city={city} /></FloatingWindow>, div);
}

