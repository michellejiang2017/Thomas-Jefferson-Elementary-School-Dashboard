import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "teachers")).then((snapshot) => {
      const teacherList = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setTeachers(teacherList);
    });
  }, []);

  return (
    <div>
      <h1>Teacher Directory</h1>

      {teachers.length === 0 ? (
        <p>No teachers in Firebase yet.</p>
      ) : (
        teachers.map((teacher) => (
          <div key={teacher.id}>
            <p>
              {teacher.firstName} {teacher.lastName}
            </p>
            <p>{teacher.email}</p>
          </div>
        ))
      )}
    </div>
  );
}
