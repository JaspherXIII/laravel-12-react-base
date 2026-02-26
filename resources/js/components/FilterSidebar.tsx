// components/FilterSidebar.tsx
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    onApply?: () => void;
    onReset?: () => void;
}

export function FilterSidebar({
    isOpen,
    onClose,
    title = 'Filters',
    children,
    onApply,
    onReset,
}: FilterSidebarProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-xl z-50 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>

                {/* Footer Actions */}
                {(onApply || onReset) && (
                    <div className="p-4 border-t border-border flex gap-2">
                        {onReset && (
                            <button
                                onClick={onReset}
                                className="flex-1 px-4 py-2 border border-input rounded-lg hover:bg-accent text-foreground transition-colors"
                            >
                                Reset
                            </button>
                        )}
                        {onApply && (
                            <button
                                onClick={onApply}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Apply Filters
                            </button>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}