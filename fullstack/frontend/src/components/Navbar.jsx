import React from "react"
import { NavLink } from "react-router-dom"
import "./Navbar.css"
import { useContext } from "react"
import { AuthContext } from "../context/authContext"

const Navbar = () => {
	const { user, isLoggedIn, authenticateUser } = useContext(AuthContext)
	console.log(user)
	const logout = () => {
		localStorage.removeItem("token")
		authenticateUser()
	}
	return (
		<nav className="Navbar">
			<ul>
				<li>
					<NavLink to={"/"}>Home</NavLink>
				</li>
				{!isLoggedIn && (
					<>
						<li>
							<NavLink to={"/auth/login"}>Log in</NavLink>
						</li>
						<li>
							<NavLink to={"/auth/signup"}>Sign up</NavLink>
						</li>
					</>
				)}
				<li>
					<NavLink to={"/profile"}>{user?.username}</NavLink>
				</li>
				{isLoggedIn && (
					<>
						<li>
							<NavLink to={"/students"}>Students</NavLink>
						</li>
						<li>
							<NavLink to={"/rubberducks"}>Rubberducks</NavLink>
						</li>
						<li>
							<button onClick={logout}>Logout</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
}

export default Navbar
