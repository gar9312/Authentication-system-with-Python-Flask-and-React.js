import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{!store.token ? (
						<Link to="/">
							<button className="btn btn-primary">log in</button>
						</Link>
					) : (
						<Link to="/">
						<button
							onClick={() => actions.logout()}
							className="btn btn-primary"
						>
							log out
						</button>
						</Link>
					)}
					<Link to="/signup">
						<button className="btn btn-primary">Sign up</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
