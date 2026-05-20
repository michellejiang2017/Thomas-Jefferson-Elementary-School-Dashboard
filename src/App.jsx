import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/NavBar";

import Home from "./pages/home";
import ClassesDashboard from "./pages/classes-dashboard";
import ClassHome from "./pages/class-home";
import TeacherDashboard from "./pages/teacher-dashboard";
import Students from "./pages/students";
import Teachers from "./pages/teachers";
import Calendar from "./pages/calendar";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes-dashboard" element={<ClassesDashboard />} />
        <Route path="/class-home" element={<ClassHome />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
}

export default App;