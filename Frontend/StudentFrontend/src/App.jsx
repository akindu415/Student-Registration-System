
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentGet from './components/StudentGet'
import StudentRegister from './components/StudentRegister';


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentGet />} />
        <Route path="/register" element={<StudentRegister />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
