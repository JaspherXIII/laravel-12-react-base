// components/TableComponents.tsx
import React from 'react';

interface TableControlsProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    perPage: number;
    onPerPageChange: (value: number) => void;
    searchPlaceholder?: string;
}

export function TableControls({
    searchTerm,
    onSearchChange,
    perPage,
    onPerPageChange,
    searchPlaceholder = 'Search...',
}: TableControlsProps) {
    return (
        <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground whitespace-nowrap">
                    Show
                </label>
                <select
                    value={perPage}
                    onChange={(e) => onPerPageChange(parseInt(e.target.value))}
                    className="px-3 py-1.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground text-sm"
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                <label className="text-sm text-muted-foreground whitespace-nowrap">
                    entries
                </label>
            </div>

            <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full sm:w-64 px-4 py-1.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground text-sm"
            />
        </div>
    );
}

interface TablePaginationProps {
    currentPage: number;
    totalItems: number;
    perPage: number;
    onPageChange: (page: number) => void;
}

export function TablePagination({
    currentPage,
    totalItems,
    perPage,
    onPageChange,
}: TablePaginationProps) {
    const totalPages = Math.ceil(totalItems / perPage);

    const getPaginationRange = () => {
        const range: (number | string)[] = [];
        const delta = 2;
        const left = Math.max(2, currentPage - delta);
        const right = Math.min(totalPages - 1, currentPage + delta);

        range.push(1);

        if (left > 2) range.push('...');

        for (let i = left; i <= right; i++) {
            range.push(i);
        }

        if (right < totalPages - 1) range.push('...');

        if (totalPages > 1) range.push(totalPages);

        return range;
    };

    if (totalItems === 0) return null;

    return (
        <div className="mt-4">
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Showing{' '}
                    <span className="font-medium text-foreground">
                        {(currentPage - 1) * perPage + 1}
                    </span>{' '}
                    to{' '}
                    <span className="font-medium text-foreground">
                        {Math.min(currentPage * perPage, totalItems)}
                    </span>{' '}
                    of <span className="font-medium text-foreground">{totalItems}</span> results
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 text-sm border border-input rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent text-foreground transition-colors"
                    >
                        Previous
                    </button>

                    {getPaginationRange().map((page, idx) =>
                        page === '...' ? (
                            <span
                                key={`ellipsis-${idx}`}
                                className="px-3 py-1.5 text-sm text-muted-foreground"
                            >
                                ...
                            </span>
                        ) : (
                            <button
                                key={page}
                                onClick={() => onPageChange(page as number)}
                                className={`px-3 py-1.5 text-sm border rounded-lg transition-colors ${currentPage === page
                                        ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
                                        : 'border-input hover:bg-accent text-foreground'
                                    }`}
                            >
                                {page}
                            </button>
                        )
                    )}

                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 text-sm border border-input rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent text-foreground transition-colors"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}