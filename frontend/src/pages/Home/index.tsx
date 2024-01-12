import preactLogo from '../../assets/preact.svg';
import { signal } from "@preact/signals";
import ReconnectingWebSocket from 'reconnecting-websocket';

import './style.css';

export function Home() {
	return (
		<div class="home">
			<a href="https://preactjs.com" target="_blank">
				<img src={preactLogo} alt="Preact logo" height="160" width="160" />
			</a>
			<h1>Get Started building Vite-powered Preact Apps </h1>
			<App />
			<section>
				<Resource
					title="Learn Preact"
					description="If you're new to Preact, try the interactive tutorial to learn important concepts"
					href="https://preactjs.com/tutorial"
				/>
				<Resource
					title="Differences to React"
					description="If you're coming from React, you may want to check out our docs to see where Preact differs"
					href="https://preactjs.com/guide/v10/differences-to-react"
				/>
				<Resource
					title="Learn Vite"
					description="To learn more about Vite and how you can customize it to fit your needs, take a look at their excellent documentation"
					href="https://vitejs.dev"
				/>
			</section>
		</div>
	);
}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}

const App = () => {
    // Create a signal for the WebSocket
    const socket = signal(null);

    // Function to initialize the WebSocket
    const initializeWebSocket = () => {
        const newSocket = new ReconnectingWebSocket('ws://localhost:8080/ws');
        socket.value = newSocket;

        newSocket.addEventListener('open', () => {
            console.log('WebSocket connection opened');
            newSocket.send('Welcome to Preact!');
        });

        newSocket.addEventListener('message', (event) => {
            console.log('Received message:', event.data);
        });

        newSocket.addEventListener('close', () => {
            console.log('WebSocket connection closed');
        });
    };

	const sendMessage = () => {
        const message = 'This is a message from Client to Server';
        socket.value.send(message);
    };

    // Call the function when the component is created
    initializeWebSocket();

    return (
        <div>
            <h1>Preact WebSocket Example</h1>
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};
