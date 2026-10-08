// src/components/layout/Sidebar.jsx
// Fixed left sidebar — all modules will be listed here.
// Currently, only "Students" is live (your module).
// The other team members' modules are displayed grayed out with a "Soon" tag.
// As each team member finishes their work, create their route
// and set `soon: false`; their module will then become clickable.

import { useLocation, useNavigate } from "react-router-dom";

const GradIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9v6l9 5 9-5V9" />
    </svg>
);

const GridIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" />

    </svg>
);

const UsersIcon = (
    <svg className="w-5 h-5" fill="none"  stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 10a3 3 0 100-6 3 3 0 000 6zM21 20v-2a4 4 0 00-3-3.9" />
    </svg>
);

const CalendarIcon = (
    <svg className="w-5 h-5" fill="none"  stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="16" rx="2"/>
        <path strokeLinecap="round" d="M16 3v4M8 3v4M3 10h18" />
    </svg>
    
);

const BookIcon = (
    <svg className="w-5 h-5" fill="none"  stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5C10.5 5.2 8.4 4.7 6 5v13c2.4-.3 4.5.2 6 1.5 1.5-1.3 3.6-1.8 6-1.5V5c-2.4-.3-4.5.2-6 1.5zM12 6.5v13" />
    </svg>
    
);

const CashIcon = (
    <svg className="w-5 h-5" fill="none"  stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
    </svg>
    
);

const BellIcon = (
    <svg className="w-5 h-5" fill="none"  stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5M9 17v1a3 3 0 006 0v-1" />
    </svg>
    
);

const ChalkIcon = (
    <svg className="w-5 h-5" fill="none"  stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5A2.5 2.5 0 016.5 17H20M6.5 2H20v15H6.5A2.5 2.5 0 014 14.5v-10A2.5 2.5 0 016.5 2z" />
    </svg>
    
);

const ChevronLeftIcon = (
        <svg className="w-4 h-4" fill="none"  stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const NAV_SECTIONS = [
    {
        label: 'Overview',
        items: [{ label: 'Dashboard', icon: GridIcon, path: '/', soon: true }],
    },
    {
        label: 'Academics',
        items: [
            { label: 'Students', icon: UsersIcon, path: '/students', soon: false },
            { label: 'Attendance', icon: CalendarIcon, path: '/attendance', soon: true },
            { label: 'Marks', icon: BookIcon, path: '/marks', soon: true },

        ],
    },
    {
        label: 'Administration',
        items: [
            { label: 'Fees', icon: CashIcon, path: '/fees', soon: true },
            { label: 'Notices', icon: BellIcon, path: '/notices', soon: true },
            { label: 'Teachers', icon: ChalkIcon, path: '/teachers', soon: true },
        ],
    },
];

function Sidebar({ collapsed, onToggle }) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <aside className={`fixed inset-y-0 left-0 bg-slate-900 text-slate-300 flex flex-col z-20 transition-all duration-200
        ${collapsed ? 'w-20' : 'w-64'}`}
        >
            {/* Brand */}
            <div className={`flex items-center h-20 border-b border-white/10 ${collapsed ? 'justify-center px-2' : 'gap-3 px-6'}`}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
                {GradIcon}
            </div>
            {!collapsed && (
                <div className="min-w-0">
                    <div className="text-white font-bold leading-tight truncate">Campus SMS</div>
                    <div className="text-[11px] text-slate-400 truncate">Cloud-Based Management</div>
                </div>
            )}
            </div>

            {/* collapse/expand toggle */}
            <button
            onClick={onToggle}
            className="absolute -right-3 top-24 w-6 h-6 rounded-full bg-slate-800 border border-white/10 text-slate-300 flex items-center justify-center hover:bg-slate-700 transition"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                <span className={`transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}>
                    {ChevronLeftIcon}
                </span>
            </button>

            {/* Nav -With the scroll-hide class, scrolling will work, but the bar won't be visible. */}
            <nav className="flex-1 overflow-y-auto scrollbar-hide px-3 py-6 space-y-7">
                {NAV_SECTIONS.map((section) => (
                    <div key={section.label}>
                        {!collapsed && (
                            <div className="px-2 mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                {section.label}
                            </div>
                        )}

                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const active = location.pathname.startsWith(item.path) && item.path !== '/';

                                return (
                                    <button
                                    key={item.label}
                                    disabled={item.soon}
                                    title={collapsed ? item.label : undefined}
                                    onClick={() => !item.soon && navigate(item.path)}
                                    className={`w-full flex items-center rounded-lg text-sm font-medium transition
                                        ${collapsed ? 'justify-center px-0 py-2.5' : 'gap-3 px-3 py-2.5'}
                                        ${active
                                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/40'
                                            : item.soon
                                            ? 'text-slate-500 cursor-not-allowed'
                                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                    >
                                        <span className={active ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                                        {!collapsed && (
                                            <>
                                            <span className="flex-1 text-left">{item.label}</span>
                                            {item.soon && (
                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-500">
                                                Soon
                                            </span>
                                        )}
                                            </>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* footer */}
            <div className="px-3 py-4 border-t border-white/10">
            <div className={`flex items-center py-2 rounded-lg ${collapsed ? 'justify-center' : 'gap-3 px-2'}`}>
                <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    SM
                </div>
                {!collapsed && (
                    <div className="min-w-0">
                        <div className="text-sm font-medium text-white truncate">Student Module</div>
                        <div className="text-[11px] text-slate-500 truncate">v1.0</div>
                    </div>
                )}
            </div>
            </div>
        </aside>
    );
}

export default Sidebar;