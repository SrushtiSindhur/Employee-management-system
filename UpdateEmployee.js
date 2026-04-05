import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Grid } from "@mui/material";

const UpdateEmployee = () => {
  const [id, setId] = useState("");
  const [employee, setEmployee] = useState(null);

  // Fetch employee from backend
  const fetchEmployee = () => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => {
        const emp = data.find((e) => e.id === id);
        if (emp) {
          setEmployee(emp);
        } else {
          alert("Employee not found");
          setEmployee(null);
        }
      })
      .catch(() => alert("Error fetching employee"));
  };

  // Handle input change
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // Update employee in backend
  const updateEmployee = async () => {
    try {
      const res = await fetch(`http://localhost:5000/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      if (res.ok) {
        alert("Employee Updated Successfully!");
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6">Update Employee</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Enter ID"
            fullWidth
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" fullWidth onClick={fetchEmployee}>
            Search
          </Button>
        </Grid>

        {employee && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={employee.name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={updateEmployee}>
                Update
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default UpdateEmployee;