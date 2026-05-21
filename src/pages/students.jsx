import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import AddStudentForm from "../components/AddStudentForm"

export default function Students() {
    const [students, setStudents] = useState([])    //stores data; variable that causes the UI to re-render when it changes

    useEffect(() => {
        getDocs(collection(db, "students"))     // fetch from Firebase
        .then((allDocs) => {
            const studentList = allDocs.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setStudents(studentList)
        })
    }, []) 

    return (
        <div>
            <AddStudentForm />
            {students.map((student) => (
                <div key={student.id}>
                    <p>{student.firstName}</p>
                    <p>{student.lastName}</p>
                    <p>{student.gradeLevel}</p>

                </div>
            ))}
        </div>
    )
}