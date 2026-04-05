import React, { useState } from "react";
import {
  Container,
  Typography,
  createTheme,
  ThemeProvider,
  Button,
  Box
} from "@mui/material";

import AddEmployee from "./components/AddEmployee";
import ViewEmployee from "./components/ViewEmployee";
import UpdateEmployee from "./components/UpdateEmployee";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Box sx={{ mt: 3 }}>

          {/* Dark Mode Button */}
          <Button
            variant="contained"
            onClick={() => setDarkMode(!darkMode)}
            sx={{ mb: 2 }}
          >
            Toggle Dark Mode
          </Button>

          {/* Title */}
          <Typography variant="h4" align="center" gutterBottom>
            Employee Management System
          </Typography>

          {/* Add Employee */}
          <Box sx={{ mb: 3 }}>
            <AddEmployee />
          </Box>

          {/* Update Employee */}
          <Box sx={{ mb: 3 }}>
            <UpdateEmployee />
          </Box>

          {/* View Employees */}
          <Box sx={{ mb: 3 }}>
            <ViewEmployee />
          </Box>

        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;