import React, { useState } from "react";
import {
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  Box
} from "@mui/material";

const EmployeeTable = ({ employees, deleteEmployee, refreshEmployees }) => {
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({});

  // Handle edit click
  const handleEditClick = (emp) => {
    setEditId(emp.id);
    setEditedData(emp);
  };

  // Handle input change
  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  // Update employee
  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/update/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      alert("Employee Updated!");
      setEditId(null);
      refreshEmployees(); // refresh list
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Employee List
      </Typography>

      {employees.length > 0 ? (
        employees.map((emp) => (
          <Paper key={emp.id} sx={{ p: 2, mb: 2, backgroundColor: "#f5f5f5" }}>
            <Grid container spacing={2} alignItems="center">

              {/* EDIT MODE */}
              {editId === emp.id ? (
                <>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      name="name"
                      label="Name"
                      value={editedData.name}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      name="email"
                      label="Email"
                      value={editedData.email}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      name="salary"
                      label="Salary"
                      value={editedData.salary}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleUpdate}
                      sx={{ mr: 1 }}
                    >
                      Save
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </>
              ) : (
                <>
                  {/* VIEW MODE */}
                  <Grid item xs={12} sm={3}>
                    <Typography><strong>ID:</strong> {emp.id}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Typography><strong>Name:</strong> {emp.name}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Typography><strong>Email:</strong> {emp.email}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <Typography><strong>Salary:</strong> ₹{emp.salary}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={1}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEditClick(emp)}
                      sx={{ mb: 1 }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteEmployee(emp.id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </>
              )}

            </Grid>
          </Paper>
        ))
      ) : (
        <Box textAlign="center">
          <Typography>No Employees Found</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default EmployeeTable;