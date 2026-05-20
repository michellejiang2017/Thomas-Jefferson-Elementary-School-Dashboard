import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase/firebase" // will work once SE creates this

export default function AddStudentForm() {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [birthday, setBirthday] = useState("")
    const [gradeLevel, setGradeLevel] = useState("")
    const [classId, setClassId] = useState("")
    const [parentContact, setParentContact] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await addDoc(collection(db, "students"), {
            firstName,
            lastName,
            birthday,
            gradeLevel,
            classId,
            parentContact
        })
        setFirstName("")
        setLastName("")
        setBirthday("")
        setGradeLevel("")
        setClassId("")
        setParentContact("")
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">firstName:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="lastName">lastName:</label>
                <input 
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor="birthday">birthday:</label>
                <input 
                    type="date"
                    id="birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
                <label htmlFor="gradeLevel">gradeLevel:</label>
                <input 
                    type="number"
                    id="gradeLevel"
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                />
                <label htmlFor="classId">classId:</label>
                <input 
                    type="text"
                    id="classId"
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                />
                <label htmlFor="parentContact">parentContact:</label>
                <input 
                    type="text"
                    id="parentContact"
                    value={parentContact}
                    onChange={(e) => setParentContact(e.target.value)}
                />
                <button type="submit">Add Student</button>
            </form>
        </div>
    )
}