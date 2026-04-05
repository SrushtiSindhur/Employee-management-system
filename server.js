const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/emsDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const employeeSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phone: String,
  department: String,
  designation: String,
  salary: Number,
  doj: String
});

const Employee = mongoose.model("Employee", employeeSchema);

// API - Add Employee
app.post("/add", async (req, res) => {
  try {
    const emp = new Employee(req.body);
    await emp.save();
    res.send("Employee Added");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding employee");
  }
});

// API - Get Employees
app.get("/employees", async (req, res) => {
  try {
    const data = await Employee.find();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching employees");
  }
});

// API - Delete Employee
app.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Employee.deleteOne({ id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).send("Employee not found");
    }

    res.send("Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting employee");
  }
});

// ✅ Update Employee (Improved)
app.put("/update/:id", async (req, res) => {
  try {
    const result = await Employee.updateOne(
      { id: req.params.id },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send("Employee not found");
    }

    res.send("Employee Updated Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating employee");
  }
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});