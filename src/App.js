// src\App.js
import "./App.css";
import { Routes, Route } from "react-router-dom";

// Import your page components
import GettingStartedPage from "./pages/getting_started/GettingStartedPage";
import MapPage from "./pages/map/MapPage";
import ItineraryPage from "./pages/itinerary/ItineraryPage";
import ExpensesPage from "./pages/expenses/ExpensesPage";
import MyTripsPage from "./pages/my_trips/MyTripsPage";
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/register/RegisterPage";

// import nav components
import NavBar from "./components/NavBar/NavBar";
import ToggleColorMode from "./components/NavBar/ToggleTheme";

// import theme and stuff to deal with toggle
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";


function App() {
	// hard code for testing as we not have databse/back end yet
	const [user, setUser] = useState(null);

	const toggleUser = () => {
		if (user) {
			setUser(null); // log out simulation
		} else {
			setUser({
				id: 1,
				username: "test User 1",
				email: "testUser1@example.com",
			}); // some fake user
		}
	};

	return (
		// Wrap the app in the ToggleColorMode component so that the theme can be toggled
		<ToggleColorMode>
			<AppContent user={user} />
			{/*Add some button to test the user by simulate log out*/}
			<button onClick={toggleUser}>{user ? "Log out" : "Log in"}</button>
		</ToggleColorMode>
	);
}

function AppContent({ user }) {
	// Get the current theme
	const theme = useTheme();

	// Apply the background color to the body element
	useEffect(() => {
		// Apply the background color to the body element
		document.body.style.backgroundColor = theme.palette.background.default;
	}, [theme.palette.background.default]);

	return (
		// Apply the theme to the app
		<div className="App" style={{ color: theme.palette.text.primary }}>
			<NavBar user={user} />
			<Routes>
				<Route path="/" element={<GettingStartedPage />} />
				<Route path="/map" element={<MapPage />} />
				<Route path="/itinerary" element={<ItineraryPage />} />
				<Route path="/expenses" element={<ExpensesPage />} />
				<Route path="/my-trips" element={<MyTripsPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</div>
	);
}

export default App;
