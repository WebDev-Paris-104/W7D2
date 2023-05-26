import React, { useContext } from "react"
import { AuthContext } from "../context/authContext"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
	// const navigate = useNavigate()
	const { isLoggedIn, isLoading, user } = useContext(AuthContext)
	if (isLoading) {
		return <p>Loading...</p>
	}
	console.table(isLoading, isLoggedIn, user)
	if (!isLoggedIn) {
		return <Navigate to={"/"} />
	}
	if (isLoggedIn) {
		return <Outlet />
	}
}

export default ProtectedRoute
