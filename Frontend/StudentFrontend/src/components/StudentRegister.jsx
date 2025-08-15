import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentRegister() {

    const navigate = useNavigate();
    const goToStudents = () => {
	navigate("/"); // This will go to students list page
  };

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        telephone: ""
    });

    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.dateOfBirth || !formData.email || !formData.telephone) return;

        setStudents(prev => [...prev, formData]);

        // Reset form except gender
        setFormData({
            name: "",
            address: "",
            email: "",
            dateOfBirth: "",
            gender: formData.gender,
            telephone: ""
        });
    };

    const handleSubmit = async () => {
        if (students.length === 0) return;
        setMessage("Submitting...");

        try {
            for (let student of students) {
                const payload = {
                    Id: 0,
                    FullName: student.name,
                    Address: student.address,
                    Email: student.email,
                    DateOfBirth: student.dateOfBirth,
                    Gender: student.gender,
                    TelephoneNumber: student.telephone
                };
                await axios.post("https://localhost:7110/api/students", payload);
            }
            setMessage("All students registered successfully!");
            setStudents([]);
        } catch (error) {
            console.error("Error registering students:", error);
            
        }
    };

    return (
        <div style={{
            maxWidth: "900px",
            margin: "40px auto",
            background: "#f8f9fa",
            borderRadius: "12px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            padding: "32px"
        }}>
            <button
                onClick={goToStudents}
                style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    marginBottom: "24px",
                    cursor: "pointer",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.07)"
                }}
            >
                Go to Students List
            </button>

            <h2 style={{ textAlign: "center", color: "#343a40", marginBottom: "28px" }}>Student Registration</h2>

            <form style={{
                display: "grid",
                gap: "18px",
                marginBottom: "28px"
            }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "6px", fontWeight: "500" }}>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ced4da",
                            fontSize: "16px"
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "6px", fontWeight: "500" }}>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ced4da",
                            fontSize: "16px"
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "6px", fontWeight: "500" }}>Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ced4da",
                            fontSize: "16px"
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "6px", fontWeight: "500" }}>Gender</label>
                    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={formData.gender === "Male"}
                                onChange={handleChange}
                                style={{ accentColor: "#007bff" }}
                            /> Male
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={formData.gender === "Female"}
                                onChange={handleChange}
                                style={{ accentColor: "#007bff" }}
                            /> Female
                        </label>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "6px", fontWeight: "500" }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ced4da",
                            fontSize: "16px"
                        }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ marginBottom: "6px", fontWeight: "500" }}>Telephone</label>
                    <input
                        type="number"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ced4da",
                            fontSize: "16px"
                        }}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleAdd}
                    style={{
                        marginTop: "10px",
                        background: "#1d8cf8",
                        color: "#fff",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.07)"
                    }}
                >
                    Add
                </button>
            </form>

            {students.length > 0 && (
                <table
                    style={{
                        width: "100%",
                        marginTop: "20px",
                        borderCollapse: "collapse",
                        background: "#fff",
                        borderRadius: "8px",
                        overflow: "hidden",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.06)"
                    }}
                >
                    <thead>
                        <tr style={{ background: "#007bff", color: "#fff" }}>
                            <th style={{ padding: "12px" }}>Name</th>
                            <th style={{ padding: "12px" }}>Date of Birth</th>
                            <th style={{ padding: "12px" }}>Email</th>
                            <th style={{ padding: "12px" }}>Telephone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s, idx) => (
                            <tr key={idx} style={{ borderBottom: "1px solid #dee2e6" }}>
                                <td style={{ padding: "10px" }}>{s.name}</td>
                                <td style={{ padding: "10px" }}>{s.dateOfBirth}</td>
                                <td style={{ padding: "10px" }}>{s.email}</td>
                                <td style={{ padding: "10px" }}>{s.telephone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button
                onClick={handleSubmit}
                style={{
                    marginTop: "28px",
                    background: "#28a745",
                    color: "#fff",
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.07)"
                }}
            >
                Submit
            </button>

            {message && (
                <p style={{
                    marginTop: "20px",
                    color: message.includes("success") ? "#28a745" : "#dc3545",
                    fontWeight: "bold",
                    textAlign: "center"
                }}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default StudentRegister;
