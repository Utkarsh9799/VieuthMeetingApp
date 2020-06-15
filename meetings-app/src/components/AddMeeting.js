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
		console.log(data);
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
			<form onSubmit={(e) => handleSubmit()}>
				{/* <label>Date</label> */}

				<input
					type="text"
					name="newDate"
					value={newDate}
					className="datepicker"
					placeholder="Meeting Date"
					onChange={handleInputChange}
				/>
				{/* <label style={{ display: 'inline-block', width: '50%' }}>
					Start Time
				</label> */}

				<input
					style={{ width: '40%', marginRight: '10%' }}
					type="text"
					required
					name="startTime"
					value={startTime}
					placeholder="00:00"
					onChange={handleInputChange}
					className="timepicker"
					placeholder="Start Time"
				/>
				{/* <label style={{ display: 'inline-block', width: '50%' }}>
					End Time
				</label> */}
				<input
					style={{
						width: '40%',
						marginLeft: '10%',
					}}
					type="text"
					className="timepicker"
					required
					name="endTime"
					value={endTime}
					placeholder="00:00"
					onChange={handleInputChange}
					placeholder="End Time"
				/>
				<div className="input-field col s12">
					<textarea
						id="textarea1"
						className="materialize-textarea"
					></textarea>
					<label htmlFor="textarea1">Description</label>
				</div>
				{/* <input
					type="submit"
					className="waves-effect waves-light btn light-blue darken-2"
					value="Save"
				/> */}
				<div style={{ textAlign: 'center' }}>
					{status === 'initial' || status === 'success' ? (
						<button
							type="submit"
							className="waves-effect waves-light btn light-blue darken-2"
							style={{ width: '15%', marginTop: '2%' }}
						>
							Save
						</button>
					) : (
						<button
							type="submit"
							className="disabled waves-effect waves-light btn light-blue darken-2"
							style={{ width: '15%', marginTop: '2%' }}
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
