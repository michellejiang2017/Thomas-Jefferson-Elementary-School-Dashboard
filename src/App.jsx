import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Students from "./pages/students";
import Calendar from "./pages/calendar";
import ClassesDashboard from "./pages/classes-dashboard";
import ClassHome from "./pages/class-home";
import SubjectHome from "./pages/SubjectHome";
import Teachers from "./pages/teachers";

// after finishing each page, import it here with the same name as the function. 

function TeacherDashboard() {
  return <h1>Teacher Dashboard</h1>;
}

function App() {
  return (
    <Router>
      <Navbar />

      <div style={{ padding: "24px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes-dashboard" element={<ClassesDashboard />} />
          <Route path="/class/:classId" element={<ClassHome />} />
          <Route path="/math-home/:classId" element={<SubjectHome subject="math" />} />
          <Route path="/english-home/:classId" element={<SubjectHome subject="english" />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;