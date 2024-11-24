import React, { useState, useEffect } from "react";
import { useParams,  } from "react-router-dom";
import axios from "axios";
const About = () => {
  const { id } = useParams(); // Get employee ID from URL
  //const history = useHistory();

  // State to hold the employee data
  const [employee, setEmployee] = useState({
    f_Id: "",
    f_Image: "",
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: [],
    isActive: true,
  });

  // Fetch employee data when the component mounts
 /* useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id]);*/

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setEmployee({
        ...employee,
        [name]: checked
          ? [...employee[name], value]
          : employee[name].filter((v) => v !== value),
      });
    } else {
      setEmployee({
        ...employee,
        [name]: value,
      });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/employees/${id}`, employee);
      alert("Employee updated successfully");
      history.push("/employee-list"); // Redirect to employee list
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Error updating employee");
    }
  };

  return (
    <div className="container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            name="f_Name"
            value={employee.f_Name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="f_Email"
            value={employee.f_Email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label>Mobile No</label>
          <input
            type="text"
            name="f_Mobile"
            value={employee.f_Mobile}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label>Designation</label>
          <input
            type="text"
            name="f_Designation"
            value={employee.f_Designation}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label>Gender</label>
          <select
            name="f_gender"
            value={employee.f_gender}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label>Course</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="f_Course"
                value="MCA"
                checked={employee.f_Course.includes("MCA")}
                onChange={handleChange}
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                name="f_Course"
                value="BCA"
                checked={employee.f_Course.includes("BCA")}
                onChange={handleChange}
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="f_Course"
                value="BSC"
                checked={employee.f_Course.includes("BSC")}
                onChange={handleChange}
              />
              BSC
            </label>
          </div>
        </div>
        <div>
          <label>Active Status</label>
          <input
            type="checkbox"
            name="isActive"
            checked={employee.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          Active
        </div>
        <div>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default About;
