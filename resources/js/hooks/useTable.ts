import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface UseTableOptions {
    endpoint: string;
    initialPerPage?: number;
}

interface TableData<T> {
    data: T[];
    total: number;
    currentPage: number;
    perPage: number;
}

export function useTable<T = any>(options: UseTableOptions) {
    const { endpoint, initialPerPage = 10 } = options;

    // Get initial values from URL parameters
    const getInitialState = () => {
        const params = new URLSearchParams(window.location.search);
        return {
            page: parseInt(params.get('page') || '1'),
            perPage: parseInt(params.get('per_page') || String(initialPerPage)),
            search: params.get('search') || '',
        };
    };

    const initialState = getInitialState();

    const [tableData, setTableData] = useState<TableData<T>>({
        data: [],
        total: 0,
        currentPage: initialState.page,
        perPage: initialState.perPage,
    });
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(initialState.search);
    const [perPage, setPerPage] = useState(initialState.perPage);

    // Update URL parameters
    const updateURL = (page: number, search: string, itemsPerPage: number) => {
        const params = new URLSearchParams();
        if (page > 1) params.set('page', String(page));
        if (search) params.set('search', search);
        if (itemsPerPage !== initialPerPage) params.set('per_page', String(itemsPerPage));
        
        const newURL = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        window.history.replaceState({}, '', newURL);
    };

    const fetchData = async (page = 1, search = '', itemsPerPage = perPage) => {
        setLoading(true);
        try {
            const response = await axios.get(endpoint, {
                params: {
                    page,
                    per_page: itemsPerPage,
                    search,
                },
            });

            const decoded = response.data.encoded
                ? JSON.parse(atob(response.data.encoded))
                : response.data;

            setTableData({
                data: decoded.data || [],
                total: decoded.recordsTotal || 0,
                currentPage: page,
                perPage: itemsPerPage,
            });

            // Update URL with current state
            updateURL(page, search, itemsPerPage);
        } catch (err) {
            console.error('Error fetching data:', err);
            Swal.fire('Error', 'Failed to fetch data', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch with initial state from URL
        fetchData(initialState.page, initialState.search, initialState.perPage);
    }, []);

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        fetchData(1, value, perPage);
    };

    const handlePerPageChange = (value: number) => {
        setPerPage(value);
        fetchData(1, searchTerm, value);
    };

    const handlePageChange = (page: number) => {
        const totalPages = Math.ceil(tableData.total / tableData.perPage);
        if (page < 1 || page > totalPages) return;
        fetchData(page, searchTerm, perPage);
    };

    const refresh = () => {
        fetchData(tableData.currentPage, searchTerm, perPage);
    };

    return {
        tableData,
        loading,
        searchTerm,
        perPage,
        handleSearch,
        handlePerPageChange,
        handlePageChange,
        refresh,
    };
}