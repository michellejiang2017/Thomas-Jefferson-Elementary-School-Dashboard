import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

export default function ClassHome() {
  const { classId } = useParams();
  const [classInfo, setClassInfo] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [roster, setRoster] = useState([]);

  useEffect(() => {
    if (!classId) return;

    getDoc(doc(db, "classes", classId)).then(async (classDoc) => {
      if (!classDoc.exists()) {
        setClassInfo(null);
        return;
      }

      const data = { id: classDoc.id, ...classDoc.data() };
      setClassInfo(data);

      if (data.teacherId) {
        const teacherDoc = await getDoc(doc(db, "teachers", data.teacherId));
        if (teacherDoc.exists()) {
          setTeacher({ id: teacherDoc.id, ...teacherDoc.data() });
        }
      }

      const studentIds = data.studentIds || [];
      if (studentIds.length === 0) {
        setRoster([]);
        return;
      }

      const studentsSnapshot = await getDocs(collection(db, "students"));
      const studentsOnRoster = studentsSnapshot.docs
        .map((document) => ({ id: document.id, ...document.data() }))
        .filter((student) => studentIds.includes(student.id));

      setRoster(studentsOnRoster);
    });
  }, [classId]);

  if (!classInfo) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Class not found.</Typography>
        <Button component={Link} to="/classes-dashboard" sx={{ mt: 2 }}>
          Back to classes
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Button component={Link} to="/classes-dashboard" sx={{ mb: 2 }}>
        Back to classes
      </Button>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {classInfo.name}
      </Typography>

      <Typography color="text.secondary">
        Grade level: {classInfo.gradeLevel ?? "—"}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Average grade: {classInfo.averageGrade ?? "—"}
      </Typography>

      {teacher && (
        <Typography sx={{ mb: 2 }}>
          Teacher: {teacher.firstName} {teacher.lastName}
        </Typography>
      )}

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Roster
      </Typography>

      {roster.length === 0 ? (
        <Typography color="text.secondary">No students on this roster.</Typography>
      ) : (
        roster.map((student) => (
          <Card key={student.id} variant="outlined" sx={{ mb: 1 }}>
            <CardContent>
              <Typography fontWeight="bold">
                {student.firstName} {student.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Grade level: {student.gradeLevel ?? "—"}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
