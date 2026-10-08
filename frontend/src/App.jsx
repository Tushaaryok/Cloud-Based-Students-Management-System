// src/App.jsx
// Only routing. Each URL is connected to a page component.
// NOTE: First install -> npm install react-router-dom.

import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import Students from "./pages/students/Students";
import AddStudent from "./pages/students/AddStudent";
import EditStudent from "./pages/students/EditStudent";
import StudentProfile from "./pages/students/StudentProfile";

function App() {
    return (
        <ToastProvider>
            <BrowserRouter>
                <Routes>

                    <Route path="/" element={<Navigate to="students" replace />} />

                    <Route path="/students" element={<Students />} />
                    <Route path="/students/add" element={<AddStudent />} />
                    <Route path="/students/:id" element={<StudentProfile />} />
                    <Route path="/students/:id/edit" element={<EditStudent />} />

                    {/* Redirect wrong URLs to the students list */}
                    <Route path="" element={<Navigate to="/students" replaces />} />
                </Routes>
            </BrowserRouter>
        </ToastProvider>
    );
}

export default App;



