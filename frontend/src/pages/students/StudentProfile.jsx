// src/pages/students/StudentProfile.jsx
// Ek student ki poori detail — sections me divided, read-only view.

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from '../../components/layout/Layout';
import { getStudentById } from "../../services/studentService";
import Breadcrumb from "../../components/common/Breadcrumb";

const BackArrow = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const formatDate = (value) => {
    if (!value) return '-';
    const d = new Date(value);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

function Row({ label, value }) {
    return (
        <div className="flex justify-between items-start gap-4 py-2.5">
            <dt className="text-sm text-slate-500 shrink-0">{label}</dt>
            <dd className="text-sm text-slate-800 font-medium text-right">{value || '-'}</dd>
        </div>
    );
}

function Card({ title, icon, children }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                    {icon}
                </div>
                <h2 className="font-bold text-slate-900">{title}</h2>
            </div>
            <dl className="divide-y divide-slate-50">{children}</dl>
        </div>
    );
}

const PersonIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
    </svg>
);

const PinIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.7 11.7a5.7 5.7 0 10-11.4 0C6.3 16 12 21 12 21s5.7-5 5.7-9.3z"/>
        <circle cx="12" cy="11" r="2" />
    </svg>
);

const BookIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5C10.5 5.2 8.4 4.7 6 5v13c2.4-.3 4.5.2 6 1.5 1.5-1.3 3.6-1.8 6-1.5V5c-2.4-.3-4.5.2-6 1.5zM12 6.5v13"/>
    </svg>
);

function StudentProfile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                setStudent(await getStudentById(id));
            } catch {
                setError('Student details could not be loaded...');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    const goBack = () => navigate('/students');

    const fullName = student ? `${student.first_name} ${student.last_name || ''}`.trim() : '';
    const avatarText = student
    ? `${student.first_name?.charAt(0) || ''}${student.last_name?.charAt(0) || ''}`.toUpperCase() : '';

    return (
        <Layout>
            <Breadcrumb
            trail={[
                { label: 'Dashboard', onClick: () => navigate('/') },
                { label: 'Students', onClick: goBack },
            ]}
            current="Student Profile"
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

            {loading ? (
                <div className="bg-white rounded-xl border border-slate-200 py-16 text-center text-slate-400 text-sm">
                    Loading profile....
                </div>
            ) : error ? (
                <div className="bg-white rounded-xl border border-slate-200 py-16 text-center">
                    <p className="text-red-600 text-sm">{error}</p>
                    <button onClick={goBack} className="mt-3 text-sm text-blue-600 hover:underline">
                        Back to Students
                    </button>
                </div>
            ) : (
                <>
                {/* Hero card */}
                <div className="relative overflow-hidden bg-white rounded-xl border border-slate-200 px-8 py-7 mb-6">
                    <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-l from-blue-50/80 to-transparent pointer-events-none" />

                    <div className="relative flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shrink-0">
                                {avatarText || '?'}
                            </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{fullName}</h1>
                        <p className="text-slate-500 mt-0.5 font-mono text-sm">{student.enrollment_no}</p>
                        <div className="flex items-center gap-2 mt-2.5">
                            {student.course && (
                                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                                    {student.course}
                                </span>
                            )}
                            {student.class_name && (
                                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                                    Class {student.class_name}
                                </span>
                            )}
                            {student.division && (
                                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                                    Div {student.division}
                                </span>
                            )}
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {student.status === 'inactive' ? 'Inactive' : 'Active'}
                            </span>
                        </div>
                    </div>
                </div>

                <button onClick={() => navigate(`/students/${id}/edit`)}
                    className="relative px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                        Edit Student
                    </button>
                </div>
            </div>

            {/* Detail cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <Card title="Personal" icon={PersonIcon}>
                    <Row label="Full Name" value={fullName} />
                    <Row label="Email" value={student.email} />
                    <Row label="Phone" value={student.phone} />
                    <Row label="Date of birth" value={formatDate(student.date_of_birth)} />
                    <Row label="Gender" value={student.gender} />
                </Card>

                <Card title="Address" icon={PinIcon}>
                    <Row label="Address" value={student.address} />
                    <Row label="City" value={student.city} />
                    <Row label="State" value={student.state} />
                    <Row label="Pincode" value={student.pincode} />
                </Card>

                <Card title="Academic" icon={BookIcon}>
                    <Row label="Enrollment no." value={student.enrollment_no} />
                    <Row label="Course" value={student.course} />
                    <Row label="Class" value={student.class_name} />
                    <Row label="Division" value={student.division} />
                    <Row label="Admission Date" value={formatDate(student.admission_date)} />
                </Card>
            </div>
            </>
            )}
        </Layout>
    );
}

export default StudentProfile;