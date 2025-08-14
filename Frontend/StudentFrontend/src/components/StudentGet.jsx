import { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function StudentGet(){
    const[telephone, setTelephone]= useState("");
    const[students, setStudents] = useState([]);
    
//fetch students on load
    useEffect(()=>{
        try{
        fetchStudents();
        }catch(error){
            console.error("Error fetching students:", error);
        }
    }, [])

    const fetchStudents = async () => {
        try{
        const response = await axios.get("https://localhost:7110/api/students");
        setStudents(response.data);
    }catch(error){
        console.error("Error fetching students11:", error);
    }};

    const handleSearch = async () => {
    try {
      const res = await axios.get(`https://localhost:7110/api/students/search?telephone=${telephone}`);
      console.log("Api response:", res.data);
      setStudents(res.data);
    } catch (err) {
      console.error("Error searching students:", err);
      setStudents([]);
    }
  };
    
    const handleDelete = async (id) =>{
        if(window.confirm("Are you sure you want to delete this student?")) {
            try{
                await axios.delete(`http://localhost:7110/api/students/${id}`);
                fetchStudents(); // Refresh the list after deletion
            }catch(error){
                console.error("Error deleting student:", error);
            }
        }
    };


    return(
       <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h3>Student List</h3>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Telephone</label>
        <input
          type="text"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
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

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((s) => (
              <tr key={s.id}>
                <td>{s.fullName}</td>
                <td>{new Date(s.dateOfBirth).toISOString().split("T")[0]}</td>
                <td>
                  <a href={`mailto:${s.email}`}>{s.email}</a>
                </td>
                <td>{s.telephoneNumber}</td>
                <td>
                  <button style={{ background: "Solid", border: "none", cursor: "pointer", marginRight: "8px" }}>
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No students found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

}
export default StudentGet;