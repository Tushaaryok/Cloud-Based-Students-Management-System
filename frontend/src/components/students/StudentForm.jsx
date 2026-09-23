// src/components/students/StudentForm.jsx
// Add and Edit both use the same component.
// Based on the screenshot, there are 3 sections: Personal / Address / Academic,
// and an action bar at the bottom (Reset / Cancel / Save).

import { useState } from "react";
import { useToast } from "../../context/ToastContext";

const emptyForm = {
    enrollment_no: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country_code: '+91',
    date_of_birth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    course: '',
    class_name: '',
    division: '',
    admission_date: '',
};

    const COURSES = [ 'BCA', 'BBA', 'BTech', 'B.Com', 'BA', 'B.Sc', 'MCA', 'MBA', 'Other' ];
    const CLASSES = [ '1st', '2nd', '3rd', '4th' ];
    const DIVISIONS = [ 'A', 'B', 'C', 'D', 'E' ];

const STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
    'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
    'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir',
    'Ladakh', 'Chandigarh', 'Puducherry',
];

const COUNTRY_CODES = [
    { code: '+91', label: 'IN +91' },
    { code: '+1', label: '🇺🇸 +1' },
    { code: '+44', label: '🇬🇧 +44' },
    { code: '+971', label: '🇦🇪 +971' },
    { code: '+61', label: '🇦🇺 +61' },
    { code: '+65', label: '🇸🇬 +65' },
];

const inputClass = 'w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 ' +
    'focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition disabled:bg-slate-50 disabled:text-slate-500';

function Label({ children, required }) {
    return (
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            {children} {required && <span className="text-red-500">*</span> }
        </label>
    );
}

function Field({ label, required, children }) {
    return (
        <div>
            <Label required={required}>{label}</Label>
            {children}
        </div>
    );
}

function SectionHeading({ icon, title, subtitle }) {
    return (
        <div className="flex items-center gap-3.5 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                {icon}
            </div>
            <div>
                <h2 className="text-lg font-bold text-slate-900">{title}</h2>
                <p className="text-sm text-slate-500">{subtitle}</p>
            </div>
        </div>
    );
}

const PersonIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5C10.5 5.2 8.4 4.7 6 5v13c2.4-.3 4.5.2 6 1.5 1.5-1.3 3.6-1.8 6-1.5V5c-2.4-.3-4.5.2-6 1.5zM12 6.5v13" />
        </svg>
);

/* ----- Main form ---------- */

function StudentForm({ initialData, onSubmit, onCancel, isEdit = false }) {
    const [formData, setFormData] = useState(initialData || emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const showToast = useToast();

    const [showCustomCourse, setShowCustomCourse] = useState(
        !!(initialData?.course && !COURSES.includes(initialData.course))
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCourseSelect = (e) => {
        const value = e.target.value;
        if (value === 'Other') {
            setShowCustomCourse(true);
            setFormData((prev) => ({ ...prev, course: ''}));
        } else {
            setFormData((prev) => ({ ...prev, course: value }));
        }
    }

    const backToCourseList  = () => {
        setShowCustomCourse(false);
        setFormData((prev) => ({ ...prev, course: ''}));
    };

    const handleReset = () => {
        setFormData(initialData || emptyForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await onSubmit(formData);

            showToast('success', isEdit ? 'Student updated successfully' : 'Students added successfully');
            if (!isEdit) setFormData(emptyForm);
            
        } catch (err) {
            showToast('error', err.response?.data?.message || 'Student could not be saved. Please try again.')
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 overflow-hidden">

            <div className="p-8 space-y-10">

                {/* -- Personal Information -- */}
                <section>
                    <SectionHeading
                    icon={PersonIcon}
                    title="Personal Information"
                    subtitle="Basic details about the student."
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                        <Field label="Enrollment No." required>
                            <input
                            type="text"
                            name="enrollment_no"
                            value={formData.enrollment_no}
                            onChange={handleChange}
                            placeholder="Enter enrollment number"
                            required
                            disabled={isEdit}
                            className={inputClass}
                            />
                        </Field>

                        <Field label="First Name" required>
                            <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            placeholder="Enter first name"
                            required
                            className={inputClass}
                            />
                        </Field>

                            <Field label="Last Name">
                            <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            placeholder="Enter last name"
                            className={inputClass}
                            />
                        </Field>

                            <Field label="Email">
                            <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className={inputClass}
                            />
                        </Field>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700">
                                Phone Number
                            </label>

                            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10">
                            
                                {/* Country Code */}
                                <select name="country_code"
                                value={formData.country_code}
                                onChange={handleChange}
                                className="w-[105px] shrink-0 border-0 border-r border-slate-200 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 outline-none focus:ring-0"
                                >
                                    {COUNTRY_CODES.map((country) => (
                                        <option
                                            key={country.code}
                                            value={country.code}
                                        >
                                            {country.code}
                                        </option>
                                    ))}
                                </select>

                                {/* Phone Number */}
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                pattern="\d{10}"
                                title="10 digit phone number"
                                className="flex-1 min-w-0 border-0 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-0"
                            />
                            </div>
                        </div>


                        {/* <Field label="Phone">
                            <div className="flex gap-2">
                                <select
                                name="country_code"
                                value={formData.country_code || '+91'}
                                onChange={handleChange}
                                className={inputClass + ' w-24 shrink-0 px-2'}
                                >
                                    {COUNTRY_CODES.map((c) => (
                                        <option key={c.code} value={c.code}>{c.label}</option>
                                    ))}
                                </select>
                            <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter 10 digit phone number"
                            pattern="\d{10}"
                            title="10 digit phone number"
                            className={inputClass}
                            />
                            </div>
                        </Field> */}
                        
                        <Field label="Date of Birth">
                            <input
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            className={inputClass}
                            />
                        </Field>

                        <div className="md:col-span-3">
                            <Label>Gender</Label>
                            <div className="flex items-center gap-8 mt-1">
                                {['Male', 'Female', 'Other'].map((g) => (
                                    <label key={g} className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-700">
                                        <input
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        checked={formData.gender === g}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                                        />
                                        {g}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <hr className="border-slate-100" />
                
                {/* ---- Address Information ---- */}
                <section>
                <SectionHeading
                icon={PinIcon}
                title="Address Information"
                subtitle="Current address details."
                />

                <div className="grid grid-cols-1 md:grid-cols-9 gap-x-6 gap-y-5">
                    <div className="md:col-span-3">
                        <Label>Address</Label>
                        <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter full address"
                        rows="3"
                        className={inputClass + ' resize-y'}
                        />
                    </div>

                    <div className="md:col-span-2">
                        <Field label="City">
                            <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                            className={inputClass}
                            />
                        </Field>
                    </div>

                    <div className="md:col-span-2">
                        <Field label="State">
                            <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={inputClass}
                            >
                                <option value="">Select state</option>
                                {STATES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </Field>
                    </div>

                    
                    <div className="md:col-span-2">
                        <Field label="Pincode">
                            <input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            placeholder="Enter pincode"
                            className={inputClass}
                            />
                        </Field>
                    </div>
                </div>
                </section>

                <hr className="border-slate-100" />

                {/* ------- Academic  Information ------- */}
                <section>
                    <SectionHeading
                    icon={BookIcon}
                    title="Academic Information"
                    subtitle="Course and class details."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-9 gap-x-6 gap-y-5">
                        <div className="md:col-span-2">
                            <Field label="Course">
                                {showCustomCourse ? (
                                <div>
                                    <input
                                    type="text"
                                    name="course"
                                    value={formData.course}
                                    onChange={handleChange}
                                    placeholder="Enter course name"
                                    autoFocus
                                    className={inputClass}
                                    />
                                    <button type="button"
                                    onClick={backToCourseList}
                                    className="text-xs text-blue-600 hover:underline mt-1"
                                    >
                                        Choose from list instead
                                    </button>
                                    </div>
                                ) : (
                                    <select name="course" value={formData.course} onChange={handleChange} className={inputClass}>
                                    <option value="">Select course</option>
                                    {COURSES.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                    </select>
                                )}
                            </Field>
                        </div>

                        <div className="md:col-span-2">
                            <Field label="Class">
                                <select name="class_name" value={formData.class_name} onChange={handleChange} className={inputClass}>
                                    <option value="">Select class</option>
                                    {CLASSES.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </Field>
                        </div>

                        <div className="md:col-span-2">
                            <Field label="Division">
                                <select name="division" value={formData.division} onChange={handleChange} className={inputClass}>
                                    <option value="">Select Division</option>
                                    {DIVISIONS.map((d) => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                            </Field>
                        </div>

                        <div className="md:col-span-2">
                            <Field label="Admission Date">
                                <input
                                type="date"
                                name="admission_date"
                                value={formData.admission_date}
                                onChange={handleChange}
                                className={inputClass}
                                />
                            </Field>
                        </div>
                    </div>
                </section>
            </div>

            {/* ---- Action bar ---- */}
            <div className="flex items-center justify-between gap-4 px-8 py-4 bg-slate-50 border-t border-slate-200">
                <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10a8 8 0 1114 5M3 10V5m0 5h5" />
                        </svg>
                        Reset form
                </button>

                <div className="flex items-center gap-3">
                    <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                        Cancel
                    </button>

                    <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6" />
                        </svg>
                        {submitting ? 'Saving...' : isEdit ? 'Update student' : 'Save student'}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default StudentForm;