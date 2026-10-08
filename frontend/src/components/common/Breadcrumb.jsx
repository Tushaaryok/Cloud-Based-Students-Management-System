// src/components/common/Breadcrumb.jsx
// This bar will appear at the top of every page: home icon > Dashboard > Students > <current page>
// Pass an array in the `trail` prop: [{ label: 'Dashboard', onClick }, { label: 'Students', onClick }]
// The last item automatically becomes the current page (bold, non-clickable).
// You can pass the right-side button using the `action` prop (e.g., "Back to Students").

function HomeIcon() {
    return (
        <svg className="w-4 h-4 block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10h14V10" />
            </svg>
    );
}

function ChevronIcon() {
    return (
        <svg className="w-3.5 h-3.5 text-slate-300 block shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
    );
}

function Breadcrumb({ trail = [], current, onHome, action }) {
    return (
        <div className="flex items-center justify-between gap-4 mb-5">
            <nav className="flex items-center gap-2 text-sm leading-none" aria-label="Breadcrumb">
                <button
                onClick={onHome}
                className="inline-flex items-center text-slate-400 hover:text-blue-600 transition-colors"
                aria-label="Home"
                >
                    <HomeIcon />
                </button>

                {trail.map((item) => (
                    <span key={item.label} className="contents">
                        <ChevronIcon />
                        <button
                        onClick={item.onClick}
                        className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors"
                        >
                            {item.label}
                        </button>
                    </span>
                ))}

                {current && (
                    <span className="contents">
                        <ChevronIcon />
                        <span className="inline-flex items-center text-slate-800 font-medium">{current}</span>
                    </span>
                )}
            </nav>

            {action}
        </div>
    );
    
}

export default Breadcrumb;
