import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: "#1f2937" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" fontWeight="bold">
          Thomas Jefferson School Dashboard
        </Typography>

        <div>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/classes-dashboard">Classes</Button>
          <Button color="inherit" component={Link} to="/math-home">Math Home</Button>
          <Button color="inherit" component={Link} to="/english-home">English Home</Button>
          <Button color="inherit" component={Link} to="/teacher-dashboard">Teacher Dashboard</Button>
          <Button color="inherit" component={Link} to="/students">Student Directory</Button>
          <Button color="inherit" component={Link} to="/teachers">Teacher Directory</Button>
          <Button color="inherit" component={Link} to="/calendar">Calendar</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;