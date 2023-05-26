import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Homepage from "./pages/Homepage"
import Students from "./pages/Student"
import Rubberducks from "./pages/Rubberduck"
import NotFound from "./pages/NotFound"
import AuthForm from "./components/AuthForm"
import ProtectedRoute from "./pages/ProtectedRoute"
import IsAdmin from "./pages/IsAdmin"
import CreateDuck from "./components/CreateDuck"
import OneDuck from "./pages/OneDuck"
// import { useContext } from "react"
// import { AuthContext } from "./context/authContext"
function App() {
	// const values = useContext(AuthContext)
	// console.log(values)
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Homepage />}></Route>
					<Route element={<IsAdmin />}>
						<Route path="/students" element={<Students />}></Route>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route path="/rubberducks" element={<Rubberducks />}></Route>
						<Route path="/rubberducks/create" element={<CreateDuck />} />
						<Route path="/rubberducks/:id" element={<OneDuck />} />
					</Route>

					<Route path="/auth">
						<Route path="login" element={<AuthForm mode="Log in" />} />
						<Route path="signup" element={<AuthForm mode="Signup" />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
