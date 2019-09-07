import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';	
import {store} from './store';
import { justJoined } from './Actions/justJoined';
import { appendMessage } from './Actions/appendMessage';
import { isTyping } from './Actions/isTyping';
import { notTyping } from './Actions/notTyping';
import socket from './api';
import logo from './logo.svg';
import './App.css';

// SOCKETS EVENT HANDLING

socket.on('joined', (welcome_gift) => {
	store.dispatch(justJoined(welcome_gift.success));
});

socket.on('typing',(data) => {
	store.dispatch(isTyping(data));
});
socket.on('chat', (data) => {
	console.log('received');
	store.dispatch(appendMessage(data));
});
socket.on('no_typing',(data) => {
	store.dispatch(notTyping(data));
});

function App(props) {

	// const [messages,setMessages] = useState([]);

	// const [typing,setTyping] = useState(false);

	const [handle,setHandle] = useState('');
	const [textarea,setTextarea] = useState('');

	const [error,setError] = useState(null);

	// const [typist,setTypist] = useState(null);
	// const [joined,setJoined] = useState(false);
	// const [left,setLeft] = useState(null);
	// Similar to componentDidMount
	useEffect(() => {
		socket.emit('online');
	},[]);

	

	const handleTyping = () => {
		socket.emit('typing',{
			'handle':handle,
		});
	};

	const noMoreTyping = () => {
		socket.emit('no_typing', {
			'handle':handle,
		});
	};

	const handleSubmit = (handle,message) => {
		console.log("Called");
		if(handle === '' || message === '') {
			setError('Handle or message should not be null');
			return;
		}
		setError('');
			
		socket.emit('chat',{
			'handle':handle,
			'message':message,
		});
	};
	

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			<div id="main">
				<div id="status">
					{props.joined ? <em>You are connected</em> : <em>You were denied connection</em>}
				</div>
				<div id="message" className="container">
					<h1><em><strong>Chat Messages</strong></em></h1>
					{props.typist ?<h2> {props.typist} is Typing...</h2> : null}
					{props.messages.length === 0 ? <h3><em>No messages</em></h3> : null}
					{props.messages.map((item,index) => {
						return(
							<div key={index} className="row">
								<span><strong>{item.handle}:</strong></span>&nbsp;<p>{item.message}</p>
							</div>
						);
					})}
				</div>
				<div id="form">
					<form>
						<fieldset>
							<label htmlFor="handleField">Handle</label>
							<input id="handleField" type="text" placeholder="Handle" value={handle} onChange={(e) => setHandle(e.target.value)} />
							<label htmlFor="messageField">Message</label>
							<input type='text' placeholder="Type a message..." id="messageField" value={textarea} onChange={(e) => {
								setTextarea(e.target.value);
								if(e.target.value !== '')
									handleTyping();
								else
									noMoreTyping();
							}} />
							<input className="button-primary" type="submit" value="send" onClick={(e) => {
								e.preventDefault();
								handleSubmit(handle,textarea);
								setTextarea('');
								noMoreTyping();
							}} />
						</fieldset>
					</form>
					{error ? <blockquote>
						<p><em>Error: {error}</em></p>
					</blockquote> : null}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	const {messages,typist,joined} = state.user;
	// console.log("typist:",typist);
	return {
		messages,
		typist,
		joined,
	};
};

export default connect(mapStateToProps)(App);
