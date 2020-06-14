import React from 'react';

function Navbar() {
	return (
		<div>
			<nav className="white" style={{}}>
				<div className="nav-wrapper">
					<a
						href="#"
						className="brand-logo black-text"
						style={{ width: '20%' }}
					>
						<img
							src="https://vieuth.com/assets/img/brand/Vieuth%20PNG.png"
							style={{ width: '70%', marginLeft: '15%' }}
						></img>
					</a>
					<h6
						className="right black-text"
						style={{ marginRight: '70%', marginTop: '1.5%' }}
					>
						Vieuth / Meetings
					</h6>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
