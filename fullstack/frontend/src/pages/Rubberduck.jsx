import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Rubberduck = () => {
	const [ducks, setDucks] = useState([])
	const getDucks = async () => {
		try {
			const allDucks = await axios.get("http://localhost:3000/api/rubberduck", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			setDucks(allDucks.data)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getDucks()
	}, [])
	return (
		<div>
			{ducks.map((duck) => {
				return (
					<div key={duck._id}>
						<Link to={duck._id}>{duck.name}</Link>
					</div>
				)
			})}
		</div>
	)
}

export default Rubberduck
