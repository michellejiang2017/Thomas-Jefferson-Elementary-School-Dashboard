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

import Navbar from "./components/Navbar";

function Home() {
  return <h1>Home Page</h1>;
}

function ClassesDashboard() {
  return <h1>Classes Dashboard</h1>;
}

function ClassHome() {
  return <h1>Class Home</h1>;
}

function TeacherDashboard() {
  return <h1>Teacher Dashboard</h1>;
}

function Students() {
  return <h1>Student Directory</h1>;
}

function Teachers() {
  return <h1>Teacher Directory</h1>;
}

function Calendar() {
  return <h1>Calendar</h1>;
}

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
      <div style={{ padding: "24px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes-dashboard" element={<ClassesDashboard />} />
          <Route path="/class-home" element={<ClassHome />} />
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