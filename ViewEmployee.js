import React, { useEffect, useState } from "react";
import "../App.css";   // ✅ ADD THIS LINE

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({});

  // Fetch data from backend
  const fetchEmployees = () => {
    fetch("http://localhost:5000/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Delete employee
  const deleteEmployee = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchEmployees();
      })
      .catch((err) => console.log(err));
  };

  // Start editing
  const handleEdit = (emp) => {
    setEditId(emp.id);
    setEditedData(emp);
  };

  // Handle input change
  const handleChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  // Update employee
  const handleUpdate = () => {
    fetch(`http://localhost:5000/update/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then(() => {
        alert("Updated!");
        setEditId(null);
        fetchEmployees();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container"> {/* ✅ optional class */}
      <h2 className="title">Employee List</h2>

      <table className="employee-table"> {/* ✅ class added */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.length > 0 ? (
            employees.map((emp, index) => (
              <tr key={index}>
                <td>{emp.id}</td>

                {editId === emp.id ? (
                  <>
                    <td>
                      <input
                        name="name"
                        value={editedData.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="email"
                        value={editedData.email}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        name="salary"
                        value={editedData.salary}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={() => setEditId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.salary}</td>
                    <td>
                      <button onClick={() => handleEdit(emp)}>Edit</button>
                      <button onClick={() => deleteEmployee(emp.id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Employees Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmployee;