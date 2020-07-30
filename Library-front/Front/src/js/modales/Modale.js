import React from "react";

import Register from "./Register";
import Login from "./Login";

import { useSelector } from "react-redux";

const Modale = (props) => {
	const modal = useSelector((state) => state.authReducer.isModalShowing);

	return (
		<div>
			{ modal.type === "login" && <Login /> }
			{ modal.type === "register" && <Register /> }
		</div>
	);
};

export default Modale;
