import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Meetings from './components/Meetings';
import AddMeeting from './components/AddMeeting';

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Route exact path="/" component={Meetings} />
				<Route path="/schedule-meeting" component={AddMeeting} />
			</Router>
		</div>
	);
}

export default App;
