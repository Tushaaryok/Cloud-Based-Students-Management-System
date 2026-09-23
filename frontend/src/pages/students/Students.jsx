// src/pages/students/Students.jsx
// Main list page: start cards + search/filter students table.

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb";
import PageHeader from '../../components/common/PageHeader';
import Layout from '../../components/layout/Layout';
import { getAllStudents, deactivateStudent } from '../../services/studentService';
import { useToast } from '../../context/ToastContext';

// icon
const GradIcon = (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-4 9 4-9 4-9-4z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11v4c0 1.3 2.2 2.5 5 2.5s5-1.2 5-2.5v-4" />
        </svg>

);

const SearchIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="7" />
    <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
    </svg>

);
//.. Before the name create avatar (e.g "Prince Nath" -> "PN")
function initials(first = '', last = '') {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase() || '?';
    
}

const AVATAR_COLORS = [
    'bg-blue-100 text-blue-700',
    'bg-emerald-100 text-emerald-700',
    'bg-amber-100 text-amber-700',
    'bg-violet-100 text-violet-700',
    'bg-rose-100 text-rose-700',
    'bg-cyan-100 text-cyan-700',
];
const colorFor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

function StatCard({ label, value, tint, icon }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${tint}`}>{icon}</div>
            <div>
                <div className="text-2xl font-bold text-slate-900 leading-tight">{value}</div>
                <div className="text-sm text-slate-500">{label}</div>
            </div>
        </div>
    );
}

const inputClass =
    'border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 '
    + 'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition';

    const COURSES = [ 'BCA', 'BBA', 'BTech', 'B.Com', 'BA', 'B.Sc', 'MCA', 'MBA', 'Other' ];
    const DIVISIONS = [ 'A', 'B', 'C', 'D', 'E' ];

function Students() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const showToast = useToast();

    const [search, setSearch] = useState('');
    const [course, setCourse] = useState('');
    const [division, setDivision] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const filters = {};
            if (search) filters.search = search;
            if (course) filters.course = course;
            if (division) filters.division = division;

            const data = await getAllStudents(filters);
            setStudents(data);
            
        } catch (error) {
            setError('Students not loading, please check again!');
        } finally {
            setLoading(false);
        }
    }, [search, course, division]);

    useEffect(() => {
        const timer = setTimeout(fetchStudents, 400);
        return () => clearTimeout(timer);
    }, [fetchStudents]);

    const handleDeactivate = async (student) => {
        const ok = window.confirm(
            `${student.first_name} ${student.last_name || ''} ko deactivate karna hai?\n\nRecord delete nahi hoga, sirf inactive ho jayega.`
        );
        if (!ok) return;

        try {
            await deactivateStudent(student.id);
            showToast('success', `${student.first_name} deactivated successfully`);
            fetchStudents();
        } catch {
            showToast('error', 'student not deactivate, please try again');
        }
    };

    const clearFilters = () => {
        setSearch('');
        setCourse('');
        setDivision('');
    };

    const hasFilters = search || course || division;

    const courseCount = new Set(students.map((s) => s.course).filter(Boolean)).size;
    const divisionCount = new Set(students.map((s) => s.division).filter(Boolean)).size;

    return (
        <Layout>
                <Breadcrumb
                    trail={[{ label: 'Dashboard', onClick: () => navigate('/') }]}
                    current="Students"
                    onHome={() => navigate('/')}
                    action={
                        <button
                        onClick={() => navigate('/students/add')}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition" >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                            </svg>
                            Add Student
                        </button>
                    }
                />

                <PageHeader
                icon={GradIcon}
                title="Students"
                subtitle="View, search and manage all registered students."
                />

                {/* stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                    <StatCard
                    label="Active Students"
                    value={students.length}
                    tint="bg-blue-100 text-blue-600"
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 10a3 3 0 100-6 3 3 0 000 6zM21 20v-2a4 4 0 00-3-3.9" />
                            </svg>
                    }
                    />

                    <StatCard
                    label="Courses"
                    value={courseCount}
                    tint="bg-emerald-100 text-emerald-600"
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5C10.5 5.2 8.4 4.7 6 5v13c2.4-.3 4.5.2 6 1.5 1.5-1.3 3.6-1.8 6-1.5V5c-2.4-.3-4.5.2-6 1.5zM12 6.5v13" />
                            </svg>
                    }
                    />

                    <StatCard
                    label="Divisions"
                    value={divisionCount}
                    tint="bg-violet-100 text-violet-600"
                    icon={
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="8" height="8" rx="2" />
                        <rect x="13" y="3" width="8" height="8" rx="2" />
                        <rect x="3" y="13" width="8" height="8" rx="2" />
                        <rect x="13" y="13" width="8" height="8" rx="2" />
                    
                    </svg>
                    }
                    />
                </div>

                {/* table card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    {/* search + filters */}
                    <div className="flex flex-wrap items-center gap-3 p-5 border-b border-slate-100">
                        <div className="relative flex-1 min-w-[240px]">
                            <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-all duration-200
                                ${ searchFocused ? 'opacity-0 -translate-x-2' : 'opacity-100' }`}>
                                {SearchIcon}
                            </span>
                            <input
                            type="text"
                            placeholder={searchFocused ? '' : 'Search by name or enrollment no.'}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                            className={inputClass + ` w-full transition-all duration-200 ${searchFocused ? 'pl-3.5' : 'pl-10'}`}
                            />
                        </div>

                        <select value={course} onChange={(e) => setCourse(e.target.value)} className={inputClass}>
                            <option value="">All Courses</option>
                            {COURSES.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                            </select>

                        <select value={division} onChange={(e) => setDivision(e.target.value)} className={inputClass}>
                            <option value="">All Divisions</option>
                            {DIVISIONS.map((d) => (
                                <option key={d} value={d}>Division {d}</option>
                            ))}
                        </select>

                        {hasFilters && (
                            <button onClick={clearFilters} className="px-4 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                                Clear
                                </button>
                        )}
                    </div>

                    {error && (
                        <div className="m-5 bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="py-16 text-center text-slate-400 text-sm">Loading Students....</div>
                    ) : students.length === 0 ? (
                        <div className="py-16 text-center">
                            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                {SearchIcon}
                            </div>
                            <p className="text-slate-600 font-medium">No student found</p>
                            <p className="text-sm text-slate-400 mt-1">
                                {hasFilters ? 'Try changing the filters.' : 'Add your first student to get started.'}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        <th className="px-5 py-3">Student</th>
                                        <th className="px-5 py-3">Enrollment No.</th>
                                        <th className="px-5 py-3">Course</th>
                                        <th className="px-5 py-3">Class</th>
                                        <th className="px-5 py-3">Division</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3 text-right">Actions</th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {students.map((s) => (
                                        <tr key={s.id} className="hover:bg-slate-50/70 transition">
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${colorFor(s.id)}`}>
                                                        {initials(s.first_name, s.last_name)}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-800">
                                                            {s.first_name} {s.last_name}
                                                        </div>
                                                        {s.email && <div className="text-xs text-slate-400">{s.email}</div>}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-3.5 font-mono text-xs text-slate-600">{s.enrollment_no}</td>
                                            <td className="px-5 py-3.5 text-slate-700">{s.course || '-'}</td>
                                            <td className="px-5 py-3.5 text-slate-700">{s.class_name || '-'}</td>
                                            <td className="px-5 py-3.5 text-slate-700">{s.division || '-'}</td>
                                            <td className="px-5 py-3.5">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                    Active
                                                </span>
                                            </td>

                                            <td className="px-5 py-3.5">
                                                <div className="flex  items-center justify-end gap-1">
                                                    <button onClick={() => navigate(`/students/${s.id}`)}
                                                    className="px-2.5 py-1.5 text-xs font-medium text-slate-600 rounded-md hover:bg-slate-100 transition">
                                                        View
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/students/${s.id}/edit`)}
                                                        className="px-2.5 py-1.5 text-xs font-medium text-blue-600 rounded-md hover:bg-blue-50 transition">
                                                            Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeactivate(s)}
                                                        className="px-2.5 py-1.5 text-xs font-medium text-red-600 rounded-md hover:bg-red-50 transition">
                                                            Deactivate
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {!loading && students.length > 0 && (
                        <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-500">
                            Showing {students.length} student{students.length !== 1 && 's'}
                        </div>
                    )}
                </div>
    </Layout>
    );
}

export default Students;