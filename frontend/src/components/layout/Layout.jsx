// src/components/layout/Layout.jsx
// Connects the sidebar and content area. Each page puts its content
// (Breadcrumb, PageHeader, and other UI) inside it as children —
// this avoids having to write the sidebar again and again on every page.

import { useState } from "react";
import Sidebar from "./Sidebar";

function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100">
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
            <main className={`min-h-screen py-8 px-8 transition-all duration-200 ${ collapsed ? 'ml-20' : 'ml-64' }`}
            >
                <div className="max-w-6xl mx-auto">{children}</div>
            </main>
        </div>
    );
}

export default Layout;