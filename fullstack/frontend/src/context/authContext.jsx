import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()
const AuthContextWrapper = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// execute authuser
		authenticateUser()
	}, [])
	const authenticateUser = async () => {
		try {
			// Get the token
			const token = localStorage.getItem("token")
			if (token) {
				// Send the token, we expect a response with the user informations.
				const response = await axios.get("http://localhost:3000/api/auth/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				console.log(response)

				// Set the received user infos to my user state
				// Set is logged in to true.
				setUser(response.data)
				setIsLoggedIn(true)
				setIsLoading(false)
			} else {
				setUser(null)
				setIsLoggedIn(false)
				setIsLoading(false)
			}
		} catch (error) {
			console.log(error)
			setUser(null)
			setIsLoggedIn(false)
			setIsLoading(false)
		}
	}

	const values = {
		user,
		setUser,
		authenticateUser,
		isLoggedIn,
		isLoading,
	}
	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
// export { AuthContext }
export default AuthContextWrapper
