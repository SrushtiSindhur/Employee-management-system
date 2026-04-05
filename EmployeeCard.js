import React from "react";

const EmployeeCard = ({ emp }) => {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h3>{emp.name}</h3>
      <p>ID: {emp.id}</p>
      <p>Email: {emp.email}</p>
      <p>Salary: {emp.salary}</p>
    </div>
  );
};

export default EmployeeCard;