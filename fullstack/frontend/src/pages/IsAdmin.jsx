import React, { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { Navigate, Outlet } from "react-router-dom"

const IsAdmin = () => {
	// const navigate = useNavigate()
	const { isLoggedIn, isLoading, user } = useContext(AuthContext)
	if (isLoading) {
		return <p>Loading...</p>
	}
	if (!isLoggedIn || user.status !== "admin") {
		return <Navigate to={"/"} />
	}
	if (isLoggedIn && user.status === "admin") {
		return <Outlet />
	}
}

export default IsAdmin
