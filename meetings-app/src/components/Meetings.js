import React, { useState, useEffect } from 'react';
// import axios from 'axios';

function Meetings() {
	const [state, setstate] = useState([]);
	const [userDate, setDate] = useState(
		String(new Date().getDate()).padStart(2, '0')
	);
	const [userMonth, setMonth] = useState(
		String(new Date().getMonth() + 1).padStart(2, '0')
	);
	const [userYear, setYear] = useState(new Date().getFullYear());

	return (
		<div>
			<div>
				<i className="large material-icons">keyboard_arrow_left</i>
				<i className="large material-icons">keyboard_arrow_right</i>
			</div>
		</div>
	);
}

export default Meetings;
