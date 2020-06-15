import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Meetings(props) {
	const fetchMeetings = async () => {
		// console.log(props.currentDate);
		try {
			const res = await axios.get(
				`api/schedule?date=${props.currentDate}/${props.currentMonth}/${props.currentYear}`,
				{
					proxy: {
						host: 'http://fathomless-shelf-5846.herokuapp.com/',
					},
				}
			);
			console.log(res);
			const time = res.data.sort((a, b) => {
				var t1 = a.start_time.replace(':', '');
				var t2 = b.start_time.replace(':', '');
				return t1 - t2;
			});

			props.setState(time);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		fetchMeetings();
	}, [props.currentDate, props.currentMonth, props.currentYear]);

	const prevDate = () => {
		if (parseInt(props.currentDate) >= 2) {
			const newDate = parseInt(props.currentDate) - 1;
			props.setDate(newDate.toString());
		} else {
			if (parseInt(props.currentMonth) >= 2) {
				const newMonth = parseInt(props.currentMonth) - 1;
				props.setDate(31);
				props.setMonth(newMonth);
			} else {
				const newYear = parseInt(props.currentYear) - 1;
				props.setMonth(12);
				props.setYear(newYear);
			}
		}
	};

	const nextDate = () => {
		if (parseInt(props.currentDate) === 31) {
			if (parseInt(props.currentMonth) === 12) {
				props.setDate(1);
				props.setMonth(1);
				const newYear = parseInt(props.currentYear) + 1;
				props.setYear(newYear);
			} else {
				props.setDate(1);
				const newMonth = parseInt(props.currentMonth) + 1;
				props.setMonth(newMonth);
			}
		} else {
			const newDate = parseInt(props.currentDate) + 1;
			props.setDate(newDate);
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
				>{`${props.currentDate}/${props.currentMonth}/${props.currentYear}`}</h5>
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

			{props.state ? (
				props.state.map((meeting) => (
					<ul
						className="collection"
						style={{
							width: '75%',
							marginLeft: '12.5%',
							border: 'none',
						}}
					>
						<li
							key={meeting.start_time}
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
			<div
				style={{
					textAlign: 'center',
					marginTop: '3%',
					marginBottom: '2%',
				}}
			>
				<Link
					to="/schedule-meeting"
					className="waves-effect waves-light btn light-blue darken-2"
				>
					Add Meeting
				</Link>
			</div>
		</div>
	);
}

export default Meetings;
