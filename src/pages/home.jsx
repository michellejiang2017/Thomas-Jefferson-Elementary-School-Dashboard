import { Link } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

// links to each main part of the app
const features = [
  {
    title: "Classes Dashboard",
    description: "View all classes and open a class page.",
    path: "/classes-dashboard",
  },
  {
    title: "Student Directory",
    description: "Look up students and manage enrollment info.",
    path: "/students",
  },
  {
    title: "Teacher Directory",
    description: "View teachers and which classes they teach.",
    path: "/teachers",
  },
  {
    title: "School Calendar",
    description: "See and manage upcoming school events.",
    path: "/calendar",
  },
  {
    title: "Teacher Dashboard",
    description: "Add and update grades for students in your classes.",
    path: "/teacher-dashboard",
  },
];

export default function Home() {
  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
        Thomas Jefferson Elementary School
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
          gap: 2,
        }}
      >
        {features.map((feature) => (
          <Card key={feature.path} variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {feature.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {feature.description}
              </Typography>

              <Button
                variant="contained"
                component={Link}
                to={feature.path}
                sx={{ backgroundColor: "#1f2937" }}
              >
                Open
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
