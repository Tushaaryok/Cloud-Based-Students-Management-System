// src/pages/students/AddStudent.jsx
// Keep this page thin — the complete form is in components/StudentForm.jsx,
// so the Edit page can reuse the same form (to avoid code duplication).

import { useNavigate } from 'react-router-dom';
import Layout from "../../components/layout/Layout";
import Breadcrumb from '../../components/common/Breadcrumb';
import PageHeader from '../../components/common/PageHeader';
import StudentForm from '../../components/students/StudentForm';
import { addStudent } from '../../services/studentService';

const GradIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-4 9 4-9 4-9-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11v4c0 1.3 2.2 2.5 5 2.5s5-1.2 5-2.5v-4" />
    </svg>
);

const BackArrow = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

function AddStudent() {
    const navigate = useNavigate();
    const goBack = () => navigate('/students');

    const handleAdd = async (formData) => {
        await addStudent(formData);
        goBack(); // Go back to the list after saving
    };

    return (
        <Layout>
            <Breadcrumb 
                trail={[
                    { label: 'Dashboard', onClick: () => navigate('/')},
                    { label: 'Students', onClick: goBack },
                ]}
                current="Add Student"
                onHome={() => navigate('/')}
                action={
                    <button 
                    onClick={goBack}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                        {BackArrow}
                        Back to Students
                    </button>
                }
                />

                <PageHeader
                icon = {GradIcon}
                title="Add new Student"
                subtitle="Fill in the details below to register a new student.."
                />

                <StudentForm onSubmit={handleAdd} onCancel={goBack} />
        </Layout>
    );
}

export default AddStudent;