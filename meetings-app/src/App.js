import React, { useState } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Meetings from './components/Meetings';
import AddMeeting from './components/AddMeeting';

function App() {
	const [state, setState] = useState([]);
	const [currentDate, setDate] = useState(String(new Date().getDate()));
	const [currentMonth, setMonth] = useState(
		String(new Date().getMonth() + 1)
	);
	const [currentYear, setYear] = useState(new Date().getFullYear());
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Route
					exact
					path="/"
					render={(props) => (
						<Meetings
							{...props}
							state={state}
							currentDate={currentDate}
							currentMonth={currentMonth}
							currentYear={currentYear}
							setState={setState}
							setDate={setDate}
							setMonth={setMonth}
							setYear={setYear}
						/>
					)}
				/>
				<Route
					path="/schedule-meeting"
					render={(props) => (
						<AddMeeting
							{...props}
							currentDate={currentDate}
							currentMonth={currentMonth}
							currentYear={currentYear}
							state={state}
							setState={setState}
							setDate={setDate}
							setMonth={setMonth}
							setYear={setYear}
						/>
					)}
				/>
			</Router>
		</div>
	);
}

export default App;
