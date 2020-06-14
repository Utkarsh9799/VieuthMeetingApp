import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Meetings() {
	const [state, setstate] = useState([]);
	const [userDate, setDate] = useState(
		String(new Date().getDate()).padStart(2, '0')
	);
	const [userMonth, setMonth] = useState(
		String(new Date().getMonth() + 1).padStart(2, '0')
	);
	const [userYear, setYear] = useState(new Date().getFullYear());

	useEffect(() => {
		fetchMeetings();
	}, [userDate, userMonth, userYear]);

	const fetchMeetings = async () => {
		console.log(userDate);
		try {
			const res = await axios.get(
				`api/schedule?date=${userDate}/${userMonth}/${userYear}`
			);
			console.log(res);
			const sorted = res.data.sort((a, b) => {
				var t1 = a.start_time.replace(':', '');
				var t2 = b.start_time.replace(':', '');
				// console.log(t1)
				return t1 - t2;
			});
			// console.log(sorted)
			setstate(sorted);
		} catch (error) {
			console.log(error.message);
		}
	};

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
