import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Meetings() {
	const [state, setState] = useState([]);
	const [currentDate, setDate] = useState(
		String(new Date().getDate()).padStart(2, '0')
	);
	const [currentMonth, setMonth] = useState(
		String(new Date().getMonth() + 1).padStart(2, '0')
	);
	const [currentYear, setYear] = useState(new Date().getFullYear());

	useEffect(() => {
		fetchMeetings();
	}, [currentDate, currentMonth, currentYear]);

	const fetchMeetings = async () => {
		console.log(currentDate);
		try {
			const res = await axios.get(
				`api/schedule?date=${currentDate}/${currentMonth}/${currentYear}`,
				{
					proxy: {
						host: 'http://fathomless-shelf-5846.herokuapp.com/',
					},
				}
			);
			console.log(res);
			const sorted = res.data.sort((a, b) => {
				var t1 = a.start_time.replace(':', '');
				var t2 = b.start_time.replace(':', '');
				console.log('ti:' + t1);
				return t1 - t2;
			});
			// console.log(sorted)
			setState(sorted);
		} catch (error) {
			console.log(error.message);
		}
	};

	const prevDate = () => {
		if (parseInt(currentDate) >= 2) {
			const newDate = parseInt(currentDate) - 1;
			setDate(newDate.toString());
		} else {
			if (parseInt(currentMonth) >= 2) {
				const newMonth = parseInt(currentMonth) - 1;
				setDate(31);
				setMonth(newMonth);
			} else {
				const newYear = parseInt(currentYear) - 1;
				setMonth(12);
				setYear(newYear);
			}
		}
	};

	const nextDate = () => {
		if (parseInt(currentDate) == 31) {
			if (parseInt(currentMonth) == 12) {
				setDate(1);
				setMonth(1);
				const newYear = parseInt(currentYear) + 1;
				setYear(newYear);
			} else {
				setDate(1);
				const newMonth = parseInt(currentMonth) + 1;
				setMonth(newMonth);
			}
		} else {
			const newDate = parseInt(currentDate) + 1;
			setDate(newDate);
		}
	};

	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginTop: '2%',
				}}
			>
				<button
					style={{ all: 'initial' }}
					onClick={() => {
						prevDate();
					}}
				>
					<i
						className="large material-icons light-blue-text text-darken-1"
						style={{ padding: '1%' }}
					>
						keyboard_arrow_left
					</i>
				</button>
				<h5
					className="light-blue-text"
					style={{ padding: '2%' }}
				>{`${currentDate}/${currentMonth}/${currentYear}`}</h5>
				<button
					style={{ all: 'initial' }}
					onClick={() => {
						nextDate();
					}}
				>
					<i
						className="large material-icons light-blue-text text-darken-1"
						style={{ padding: '1%' }}
					>
						keyboard_arrow_right
					</i>
				</button>
			</div>

			{state ? (
				state.map((meeting) => (
					<ul
						class="collection"
						style={{
							width: '75%',
							marginLeft: '12.5%',
							border: 'none',
						}}
					>
						<li
							className="collection-item "
							style={{ borderRadius: '30px' }}
						>
							<div
								style={{
									width: '100%',
									textAlign: 'center',
								}}
							>
								<div
									style={{
										width: '20%',
										display: 'inline-block',
										padding: '1% 0',
									}}
								>
									<b>{`${meeting.start_time}-${meeting.end_time}`}</b>
								</div>
								<div
									style={{
										width: '80%',
										display: 'inline-block',
										textAlign: 'justify',
									}}
								>
									Meeting With
									<b>{`   ${meeting.participants.toString()}   `}</b>
									regarding project
									{`  ${meeting.description}  `}
								</div>
							</div>
						</li>
					</ul>
				))
			) : (
				<h1>Meetings unavailable!</h1>
			)}
		</div>
	);
}

export default Meetings;
