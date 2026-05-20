import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Students from "./pages/students"
import Calendar from "./pages/calendar";
import ClassesDashboard from "./pages/classes-dashboard";

// after finishing each page, import it here with the same name as the function. 

function Home() {
  return <h1>Home Page</h1>;
}

function MathHome() {
  return <h1>Math Home</h1>;
}

function EnglishHome() {
  return <h1>English Home</h1>;
}

function TeacherDashboard() {
  return <h1>Teacher Dashboard</h1>;
}

function Teachers() {
  return <h1>Teacher Directory</h1>;
}

function App() {
  return (
    <Router>
      <Navbar />

      <div style={{ padding: "24px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes-dashboard" element={<ClassesDashboard />} />
          <Route path="/math-home" element={<MathHome />} />
          <Route path="/english-home" element={<EnglishHome />} />
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