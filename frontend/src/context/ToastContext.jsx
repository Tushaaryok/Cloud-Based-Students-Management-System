    // src/context/ToastContext.jsx

    import { createContext, useCallback, useContext, useState } from "react";
    import Toast from "../components/common/Toast";

    const ToastContext = createContext(null);

    export function ToastProvider({ children }) {
        const [toast, setToast] = useState(null);

        const showToast = useCallback((type, message) => {
            setToast({ id: Date.now(), type, message });
        }, []);

        return (
            <ToastContext.Provider value={showToast}>
                {children}
                {toast && (
                    <Toast
                        key={toast.id}
                        type={toast.type}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                )}
            </ToastContext.Provider>
        );
    }

    // Components call this : const showToast = useToast(); showToast('success', '...')
    export function useToast() {
        const ctx = useContext(ToastContext);
        if(!ctx) {
            throw new Error('useToast must be used inside <ToastProvider>');
        }
        return ctx;
    }