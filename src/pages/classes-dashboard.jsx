import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

export default function ClassesDashboard() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getDocs(collection(db, "classes")).then((snapshot) => {
      const classList = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setClasses(classList);
    });
  }, []);

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Classes Dashboard
      </Typography>

      {classes.length === 0 ? (
        <Typography color="text.secondary">
          No classes in Firebase yet.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
            gap: 2,
            mt: 2,
          }}
        >
          {classes.map((classItem) => (
            <Card key={classItem.id} variant="outlined">
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {classItem.name || "Unnamed class"}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Grade level: {classItem.gradeLevel ?? "—"}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Average grade: {classItem.averageGrade ?? "—"}
                </Typography>

                <Button
                  variant="contained"
                  component={Link}
                  to={`/class/${classItem.id}`}
                  sx={{ mt: 2, backgroundColor: "#1f2937" }}
                >
                  Open
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
