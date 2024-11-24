import React from "react";
import axios from "axios";
import { useState } from "react";
const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);

  // Fetch employee data from API (or static data)
  /* useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployees();
  }, []);*/

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered employees based on search query
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.f_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.f_Email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get the current employees for the current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="mb-6">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-lg"
          placeholder="Search by Name or Email"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left font-medium text-gray-700">
              Unique ID
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-700">
              Image
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-700">
              Name
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-700">
              Email
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-700">
              Mobile No
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-700">
              Designation
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-700">
              Gender
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-700">
              Course
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-700">
              Create Date
            </th>
            <th className="py-3 px-6 text-left font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-3 px-6 text-gray-700">{employee.f_Id}</td>
              <td className="py-3 px-6">
                <img
                  src={employee.f_Image}
                  alt={employee.f_Name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="py-3 px-6 text-gray-700">{employee.f_Name}</td>
              <td className="py-3 px-6 text-gray-700">{employee.f_Email}</td>
              <td className="py-3 px-6 text-gray-700">{employee.f_Mobile}</td>
              <td className="py-3 px-6 text-gray-700">
                {employee.f_Designation}
              </td>
              <td className="py-3 px-6 text-gray-700">{employee.f_gender}</td>
              <td className="py-3 px-6 text-gray-700">
                {employee.f_Course.join(", ")}
              </td>
              <td className="py-3 px-6 text-gray-700">
                {new Date(employee.f_Createdate).toLocaleDateString()}
              </td>
              <td className="py-3 px-6">
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  Edit
                </button>
                <button className="text-red-500 hover:text-red-700 mr-2">
                  Delete
                </button>
                <button
                  className={`text-${
                    employee.isActive ? "green" : "gray"
                  }-500 hover:text-${employee.isActive ? "green" : "gray"}-700`}
                >
                  {employee.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mx-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="px-4 py-2 text-gray-700">Page {currentPage}</span>
        <button
          className="px-4 py-2 mx-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * employeesPerPage >= filteredEmployees.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
