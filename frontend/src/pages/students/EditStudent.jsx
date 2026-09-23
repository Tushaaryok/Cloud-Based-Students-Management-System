// src/pages/students/EditStudent.jsx
// Gets the ID from the URL (/students/5/edit), fetches that student's data,
// and displays the same StudentForm pre-filled that is used by AddStudent.

import { useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Breadcrumb from "../../components/common/Breadcrumb";
import PageHeader from "../../components/common/PageHeader";
import StudentForm from "../../components/students/StudentForm";
import { getStudentById, updateStudent } from "../../services/studentService";

const EditIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
);

const BackArrow = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const toDateInput = (value) => (value ? String(value).split('T')[0] : '');


function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getStudentById(id);
                setStudent({
                    ...data,
                    date_of_birth: toDateInput(data.date_of_birth),
                    admission_date: toDateInput(data.admission_date),
                });
            } catch {
                setError('Student data not a loading');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const goBack = () => navigate('/students');

    const handleUpdate = async (formData) => {
        await updateStudent(id, formData);
        goBack();
    };

    return (
        <Layout>
            <Breadcrumb
            trail={[
                { label: 'Dashboard', onClick: () => navigate('/') },
                { label: 'Students', onClick: goBack },
            ]}
            current="Edit  Student"
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
            icon={EditIcon}
            title="Edit student"
            subtitle="Update the student record below.."
            />

            {loading ? (
                <div className="bg-white rounded-xl border border-slate-200 py-16 text-center text-slate-400 text-sm">
                    Loading student....
                </div>
            ) : error ? (
                <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
                    <p className="text-red-600 text-sm">{error}</p>
                    <button onClick={goBack} className="mt-3 text-sm text-blue-600 hover:underline">
                        Back to students
                    </button>
                </div>
            ) : (
                <StudentForm
                initialData={student}
                isEdit
                onSubmit={handleUpdate}
                onCancel={goBack}
                />
            )}
        </Layout>
    );
}

export default EditStudent;