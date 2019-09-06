import React, {useState, useEffect} from 'react';
import socket from './api';
import logo from './logo.svg';
import './App.css';

function App() {

	const [messages,setMessages] = useState([{'handle':'God','message':'You have no messages'}]);

	// const [typing,setTyping] = useState(false);

	const [handle,setHandle] = useState('');
	const [textarea,setTextarea] = useState('');

	const [error,setError] = useState(null);

	const [typist,setTypist] = useState(null);
	const [joined,setJoined] = useState(false);
	// const [left,setLeft] = useState(null);
	// Similar to componentDidMount
	useEffect(() => {
		socket.emit('online');
	},[]);

	socket.on('joined', (welcome_gift) => {
		setJoined(welcome_gift.success);
	});

	socket.on('typing',(data) => {
		setTypist(data.handle);
	});
	socket.on('chat', (data) => {
		console.log('listened');
		let temp = messages;
		temp.push({
			'handle':data.handle,
			'message':data.message,
		});
		console.log("what_happend");
		setMessages(temp);
	});

	const handleTyping = () => {
		socket.emit('typing',{
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
					{joined ? <em>You are connected</em> : <em>You were denied connection</em>}
				</div>
				<div id="message" className="container">
					<h1>Chat</h1>
					{typist ? <pre><code>{typist} is Typing...</code></pre> : null}
					{messages.map((item,index) => {
						return(
							<div key={index} className="row">
								<span><strong>{item.handle}</strong></span><p>{item.message}</p>
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
							<textarea placeholder="Type a message..." id="messageField" value={textarea} onChange={(e) => {
								setTextarea(e.target.value);
								handleTyping();
							}}></textarea>
							<input className="button-primary" type="submit" value="send" onClick={(e) => {
								e.preventDefault();
								handleSubmit(handle,textarea);
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

export default App;
