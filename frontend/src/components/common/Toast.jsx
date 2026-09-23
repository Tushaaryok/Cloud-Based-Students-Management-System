// src/components/common/Toast.jsx
// A small pop-up that appears at the top-center of the screen after a few seconds.


import { useEffect } from "react";

const CheckIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
    </svg>
);

const XIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
);

const CloseIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
);


function Toast({ type = 'success', message, onClose, duration = 3500 }) {
    const isSuccess = type === 'success';

    useEffect(() => {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className="fixed top-6 left-1/2 z-[100] animate-toast-in">
            <div className={`flex items-center gap-3 pl-3 pr-2.5 py-3 rounded-xl shadow-lg border max-w-sm
            ${isSuccess ? 'bg-white border-emerald-200' : 'bg-white border-red-200'}`}
            >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white ${isSuccess ? 'bg-emerald-500' : 'bg-red-500'}`}>
                    {isSuccess ? CheckIcon : XIcon}
                </span>
                <p className="text-sm font-medium text-slate-800 leading-snug">{message}</p>
                <button
                onClick={onClose}
                className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                aria-label="Close"
                >
                    {CloseIcon}
                </button>
            </div>
        </div>
    );
}

export default Toast;