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
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <button onClick={goToStudents}>Go to Students List</button>

            <h2>Student Registration</h2>

            <form>
                <div>
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                </div>
                <div>
                    <label>Gender</label>
                    <input type="radio" name="gender" value="Male" checked={formData.gender === "Male"} onChange={handleChange} /> Male
                    <input type="radio" name="gender" value="Female" checked={formData.gender === "Female"} onChange={handleChange} /> Female
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Telephone</label>
                    <input type="number" name="telephone" value={formData.telephone} onChange={handleChange} required />
                </div>
                <button type="button" onClick={handleAdd} style={{ marginTop: "10px" }}>Add</button>
            </form>

            {students.length > 0 && (
                <table border="1" style={{ width: "100%", marginTop: "20px" }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date of Birth</th>
                            <th>Email</th>
                            <th>Telephone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((s, idx) => (
                            <tr key={idx}>
                                <td>{s.name}</td>
                                <td>{s.dateOfBirth}</td>
                                <td>{s.email}</td>
                                <td>{s.telephone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button onClick={handleSubmit} style={{ marginTop: "20px" }}>Submit</button>

            {message && <p>{message}</p>}
        </div>
    );
}

export default StudentRegister;
