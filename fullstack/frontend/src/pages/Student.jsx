import React, { useState, useEffect } from "react"
import axios from "axios"
const Student = () => {
	const [students, setStudents] = useState([])

	const fetchStudents = async () => {
		try {
			const response = await axios.get("http://localhost:3000/api/student")
			console.log(response)
			setStudents(response.data)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		fetchStudents()
	}, [])
	return (
		<div>
			<h2>Students:</h2>
			<div className="container">
				{students.map((student) => {
					return (
						<div key={student._id} className="card">
							<p>
								{student.username} {student.status}
							</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Student
