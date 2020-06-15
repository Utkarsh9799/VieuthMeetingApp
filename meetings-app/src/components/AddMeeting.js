import React, { useState } from 'react';
import M from 'materialize-css';

function AddMeeting(props) {
	// Materialize css for datepicker initialise
	document.addEventListener('DOMContentLoaded', function () {
		var elems = document.querySelectorAll('.datepicker');
		var instances = M.Datepicker.init(elems, {});
	});
	// Timepicker
	document.addEventListener('DOMContentLoaded', function () {
		var elems = document.querySelectorAll('.timepicker');
		var instances = M.Timepicker.init(elems, { twelveHour: false });
	});

	const [data, setData] = useState({
		newDate: '',
		startTime: '',
		endTime: '',
	});

	const [status, setStatus] = useState('initial');

	const handleSubmit = async (e) => {
		console.log('y' + data);
		var ans = slotAvailable(data);
		console.log('x' + ans);
		if (ans) {
			setStatus('success');
			alert('Slot available!');
		} else {
			setStatus('fail');
			alert('Slot unavailable!');
		}
		console.log(ans);
		e.preventDefault();
	};

	const handleInputChange = (e) => {
		console.log('Inside handleChange');
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const { newDate, startTime, endTime } = data;

	const slotAvailable = (data) => {
		console.log(data.newDate);
		if (data.newDate) {
			const arr = data.newDate.split('-');
			// console.log(arr)
			props.setYear(arr[0]);
			props.setMonth(arr[1]);
			props.setDate(arr[2]);
		}

		const StartingtimeArray = data.startTime.replace(':', '');
		const starthrs = parseInt(StartingtimeArray);
		const EndingTimeArray = data.endTime.replace(':', '');
		const end_hrs = parseInt(EndingTimeArray);
		for (var i = 0; i < props.state.length; i++) {
			const s = props.state[i].start_time.replace(':', '');
			const e = props.state[i].end_time.replace(':', '');
			if (starthrs >= parseInt(s) && starthrs <= parseInt(e)) {
				return false;
			} else if (end_hrs >= parseInt(s) && end_hrs <= parseInt(e)) {
				return false;
			}
		}
		return true;
	};

	return (
		<div
			className="container white"
			style={{ marginTop: '5%', padding: '2%' }}
		>
			<form onSubmit={(e) => handleSubmit(e)}>
				<label>Meeting Date</label>
				<input
					type="date"
					className="teal lighten-5"
					name="newDate"
					value={newDate}
					onChange={handleInputChange}
					placeholder="Meeting Date"
				/>

				<br />

				<label>StartTime </label>
				<input
					type="time"
					className="teal lighten-5"
					name="startTime"
					required
					value={startTime}
					onChange={handleInputChange}
				/>

				<br />

				<label>EndTime </label>
				<input
					type="time"
					name="endTime"
					className="teal lighten-5"
					required
					value={endTime}
					onChange={handleInputChange}
				/>

				<br />

				<div className="input-field col s12">
					<textarea
						id="textarea1"
						className="materialize-textarea teal lighten-5"
					></textarea>
					<label htmlFor="textarea1">Description</label>
				</div>
				<br />

				<div style={{ textAlign: 'center' }}>
					{status === 'initial' || status === 'success' ? (
						<button
							type="submit"
							className="waves-effect waves-light btn light-blue darken-2"
							style={{ width: '15%', marginTop: '1%' }}
						>
							Save
						</button>
					) : (
						<button
							type="submit"
							className="disabled waves-effect waves-light btn light-blue darken-2"
							style={{ width: '15%', marginTop: '1%' }}
						>
							Save
						</button>
					)}
				</div>
			</form>
		</div>
	);
}

export default AddMeeting;
