import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Grid } from "@mui/material";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    email: "",
    salary: ""
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!employee.name || !employee.email) {
      alert("Required fields missing");
      return;
    }

    if (isNaN(employee.salary)) {
      alert("Salary must be numeric");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (response.ok) {
        alert("Employee Added Successfully!");

        // Clear form after submit
        setEmployee({
          id: "",
          name: "",
          email: "",
          salary: ""
        });
      } else {
        alert("Error adding employee");
      }
    } catch (error) {
      console.error(error);
      alert("Server not connected!");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6">Add Employee</Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          
          <Grid item xs={12} sm={6}>
            <TextField
              label="ID"
              name="id"
              fullWidth
              value={employee.id}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={employee.name}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={employee.email}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Salary"
              name="salary"
              fullWidth
              value={employee.salary}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" type="submit" fullWidth>
              Add Employee
            </Button>
          </Grid>

        </Grid>
      </form>
    </Paper>
  );
};

export default AddEmployee;