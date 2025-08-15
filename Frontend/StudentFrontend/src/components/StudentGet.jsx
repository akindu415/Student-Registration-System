import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

function StudentGet() {
  const [telephone, setTelephone] = useState("");
  const [students, setStudents] = useState([]);
  const [editStudentId, setEditStudentId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    telephoneNumber: ""
  });

  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  // Fetch students on load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("https://localhost:7110/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://localhost:7110/api/students/search?telephone=${telephone}`
      );
      setStudents(res.data);
    } catch (err) {
      console.error("Error searching students:", err);
      setStudents([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`https://localhost:7110/api/students/${id}`);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const handleEditClick = (student) => {
    setEditStudentId(student.id);
    setEditFormData({
      fullName: student.fullName,
      address: student.address || "",
      dateOfBirth: new Date(student.dateOfBirth)
        .toISOString()
        .split("T")[0],
      gender: student.gender || "",
      email: student.email,
      telephoneNumber: student.telephoneNumber
    });
  };

  // Update form fields
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Save changes
  const handleEditSave = async (id) => {
    try {
      await axios.put(`https://localhost:7110/api/students/${id}`, {
        id,
        ...editFormData
      });
      setEditStudentId(null);
      fetchStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditStudentId(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      
      
      <h2>Student List</h2>

      <div style={{
    display: "flex",
    justifyContent: "center",
  }}> 

      <div style={{ marginBottom: "20px" }}> 
        <label style={{ marginRight: "10px" }}>Telephone</label>
        <input
          type="text"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          style={{
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginLeft: "10px",
            background: "#1d8cf8",
            color: "#fff",
            padding: "6px 12px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>
      </div> 

      <table
        border="1"
        cellPadding="8"
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Address</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((s) =>
              editStudentId === s.id ? (
                <tr key={s.id}>
                  <td>
                    <input
                      type="text"
                      name="fullName"
                      value={editFormData.fullName}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editFormData.dateOfBirth}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="gender"
                      value={editFormData.gender}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="telephoneNumber"
                      value={editFormData.telephoneNumber}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    {/* OK button */}
                    <button onClick={() => handleEditSave(s.id)} style={{ background: "#1d8cf8",
            color: "#fff",
            padding: "6px 12px",
            border: "none",
            borderRadius: "5px"
          }}>
                      OK
                    </button>


                    <button onClick={handleEditCancel} style={{ background: "#f44336",
            color: "#fff",
            padding: "6px 12px",
            border: "none",
            borderRadius: "5px"
          }}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={s.id}>
                  <td>{s.fullName}</td>
                  <td>{s.address}</td>
                  <td>
                    {new Date(s.dateOfBirth).toISOString().split("T")[0]}
                  </td>
                  <td>{s.gender}</td>
                  <td>
                    <a href={`mailto:${s.email}`}>{s.email}</a>
                  </td>
                  <td>{s.telephoneNumber}</td>
                  <td>
                    <button
                      onClick={() => handleEditClick(s)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "8px"
                      }}
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer"
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table><br/>
      <button onClick={goToRegister} style={{ backgroundColor: "blue", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px" }}>
        Register Student
        </button>
    </div>
  );
}

export default StudentGet;
