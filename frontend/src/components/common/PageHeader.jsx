// src/components/common/PageHeader.jsx
// The blue-tinted banner that appears at the top of every page.
// `icon` prop can contain any SVG, along with `title` and `subtitle` text.
// The tagline on the right side is fixed to keep it consistent across every page.

function PageHeader({ icon, title, subtitle}) {
    return (
        <div className="relative overflow-hidden bg-white rounded-x1 border-slate-200 px-8 py-7 mb-6">
            {/* Light blue wash on the right side  */}
            <div className="absolute inset-y-0 right-0 w-2/3 bg-gradient-to-1 from-blue-50/80 to-transparent pointer-events-none" />
            
            <div className="relative flex item-center justify-between gap-6">
                <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                    {icon}
                </div>
                <div>
                    <h1 className="text-3x1 font-bold text-slate-900 tracking-tight">{title}</h1>
                    {subtitle && <p className="text-slate-500 mt-1">{subtitle}</p>}
                </div>
            </div>

            <div className="hidden lg:block text-right text-slate-500 leading-relaxed">
                <div>Education</div>
                <div>Today</div>
                <div className="text-blue-500">A Brighter Tomorrow</div>
                <div className="ml-auto mt-1.5 w-14 h-0.5 bg-blue-500" /></div>
            </div>
    );
    
}

export default PageHeader;