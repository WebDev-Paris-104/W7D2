import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

const Layout = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<main>
				<Outlet />
			</main>
			<footer>
				<Footer />
			</footer>
		</>
	)
}

export default Layout
