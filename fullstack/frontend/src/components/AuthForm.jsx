import React, { useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { useNavigate } from "react-router-dom"

const AuthForm = ({ mode }) => {
	const { authenticateUser } = useContext(AuthContext)
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			const userToLogin = { username, password }
			if (mode === "Signup") {
				const response = await axios.post(
					"http://localhost:3000/api/auth/signup",
					userToLogin
				)
				navigate("/auth/login")
			} else {
				const response = await axios.post(
					"http://localhost:3000/api/auth/login",
					userToLogin
				)
				localStorage.setItem("token", response.data.token)
				setError("")
				await authenticateUser()
			}
		} catch (error) {
			console.log(error)
			setError(error.response.data.message)
		}
	}
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<p style={{ color: "red" }}>{error}</p>

				<button>{mode}</button>
			</form>
		</div>
	)
}

export default AuthForm
