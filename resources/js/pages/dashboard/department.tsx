/**
 * DEPARTMENT MANAGEMENT COMPONENT
 * 
 * KEY DIFFERENCES FROM LARAVEL BLADE + JQUERY:
 * 
 * 1. BLADE: Server renders HTML, jQuery manipulates DOM after page load
 *    REACT: Everything is JavaScript components, virtual DOM updates automatically
 * 
 * 2. BLADE: $('#modal').show() to display modal
 *    REACT: Set state (setModalOpen(true)), component re-renders automatically
 * 
 * 3. BLADE: Ajax calls with $.ajax(), manually update DOM on success
 *    REACT: axios calls, update state, React re-renders affected parts automatically
 * 
 * 4. BLADE: Each page refresh reloads everything from server
 *    REACT: SPA (Single Page App) - only data refreshes, no page reload
 */

// ===== IMPORTS =====
// These are like "use App\Models\User" in Laravel, but for JavaScript modules
import { Head } from '@inertiajs/react'; // Sets page title (like @section('title') in Blade)
import AppLayout from '@/layouts/app-layout'; // Main layout wrapper (like @extends('layouts.app'))
import { BreadcrumbItem } from '@/types'; // TypeScript type definition (like PHP type hints)
import { useState, useRef, useEffect } from 'react'; // React hooks for state management
import Swal from 'sweetalert2'; // Same SweetAlert2 you use in jQuery!
import axios from 'axios'; // Like $.ajax() but modern (makes HTTP requests)
import { Pencil, Trash2, MoreVertical } from 'lucide-react'; // Icon components
import { useTable } from '@/hooks/useTable'; // Custom hook for table logic (reusable function)
import { TableControls, TablePagination } from '@/components/table-components'; // Reusable UI components

// ===== TYPE DEFINITION =====
// Like defining a model structure in Laravel
// In Blade/jQuery you'd just use objects without type checking
interface Department {
    id: number;
    name: string;
}

// ===== BREADCRUMB CONFIGURATION =====
// Static data for navigation breadcrumbs
// In Blade: You'd pass this from controller or define in view
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Departments', href: '/departments' },
];

// ===== MAIN COMPONENT =====
// This is like a Blade view + controller logic combined
// In Blade: Logic is in Controller, HTML in .blade.php
// In React: Everything is together in one component
export default function Department() {
    
    // ===== CUSTOM HOOK FOR TABLE DATA =====
    // BLADE EQUIVALENT: You'd call Controller method, get data in Blade as $departments
    // REACT: This hook manages fetching, searching, pagination automatically
    const {
        tableData,           // The departments array + pagination info (like $departments->data())
        loading,             // Boolean: is data loading? (in Blade: you show spinner manually)
        searchTerm,          // Current search query (in jQuery: $('#search').val())
        perPage,             // Items per page (in Blade: $departments->perPage())
        handleSearch,        // Function to search (in jQuery: $('#search').on('keyup', function...))
        handlePerPageChange, // Change items per page
        handlePageChange,    // Go to different page
        refresh,             // Reload data (in jQuery: location.reload() or manual ajax)
    } = useTable<Department>({
        endpoint: '/getDepartments',  // API endpoint (like route('departments.index'))
        initialPerPage: 10,
    });

    // ===== STATE MANAGEMENT =====
    // BLADE/JQUERY: You'd use global variables or data attributes
    // REACT: useState creates reactive state - when state changes, UI auto-updates
    
    // Modal visibility state
    // BLADE: $('#modal').show() or .hide()
    // REACT: setModalOpen(true) triggers re-render, modal appears
    const [modalOpen, setModalOpen] = useState(false);
    
    // Currently editing department (null if creating new)
    // BLADE: You'd have hidden input with department ID
    const [editingDept, setEditingDept] = useState<Department | null>(null);
    
    // Form input value for department name
    // BLADE: <input name="name" value="{{ $department->name ?? '' }}">
    // REACT: value={name} onChange={(e) => setName(e.target.value)}
    const [name, setName] = useState('');
    
    // Which dropdown is currently open (by department ID)
    // JQUERY: You'd toggle .show class or use Bootstrap dropdown
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    
    // Reference to dropdown element (like document.getElementById())
    // Used to detect clicks outside dropdown
    const dropdownRef = useRef<HTMLDivElement>(null);

    /* ======================= DROPDOWN CLICK OUTSIDE HANDLER ======================== */
    // BLADE/JQUERY EQUIVALENT:
    // $(document).on('click', function(e) {
    //     if (!$(e.target).closest('.dropdown').length) {
    //         $('.dropdown-menu').hide();
    //     }
    // });
    
    useEffect(() => {
        // This function runs when component mounts and whenever dependencies change
        // Like $(document).ready() but more powerful
        
        const handleClickOutside = (event: MouseEvent) => {
            // Check if click was outside the dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdownId(null); // Close dropdown
            }
        };

        // Add event listener (like addEventListener in vanilla JS)
        document.addEventListener('mousedown', handleClickOutside);
        
        // Cleanup function: removes listener when component unmounts
        // IMPORTANT: Prevents memory leaks (jQuery often has this issue!)
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []); // Empty array = run once on mount (like $(document).ready())

    // Toggle dropdown open/closed
    // BLADE/JQUERY: $('.dropdown-toggle').click(function() { $(this).next().toggle(); })
    const toggleDropdown = (id: number) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    /* ======================= MODAL HELPERS ======================== */
    
    // Open modal for creating or editing
    // BLADE/JQUERY:
    // function openModal(dept) {
    //     if (dept) {
    //         $('#dept_id').val(dept.id);
    //         $('#name').val(dept.name);
    //     } else {
    //         $('#dept_id').val('');
    //         $('#name').val('');
    //     }
    //     $('#modal').modal('show');
    // }
    const openModal = (dept?: Department) => {
        if (dept) {
            // Editing existing department
            setEditingDept(dept);
            setName(dept.name);
        } else {
            // Creating new department
            setEditingDept(null);
            setName('');
        }
        setModalOpen(true); // Show modal (triggers re-render)
        setOpenDropdownId(null); // Close any open dropdown
    };

    // Close modal and reset form
    // BLADE/JQUERY: $('#modal').modal('hide'); $('#form')[0].reset();
    const closeModal = () => {
        setModalOpen(false);
        setEditingDept(null);
        setName('');
    };

    /* ======================= SAVE DEPARTMENT ======================== */
    // BLADE/JQUERY EQUIVALENT:
    // $('#save-btn').click(function() {
    //     $.ajax({
    //         url: '/departments',
    //         method: 'POST',
    //         data: { name: $('#name').val(), department_id: $('#dept_id').val() },
    //         success: function(response) {
    //             Swal.fire('Success', response.message, 'success');
    //             location.reload(); // or manually append to table
    //         }
    //     });
    // });
    
    const saveDepartment = async () => {
        // Validation
        if (!name.trim()) {
            Swal.fire('Error', 'Department name is required', 'error');
            return;
        }

        try {
            // Prepare data to send
            const payload = {
                name,
                department_id: editingDept?.id, // undefined if creating new
            };

            // Make API request (like $.ajax())
            // axios automatically sets Content-Type, CSRF token (via Inertia)
            const response = await axios.post('/departments', payload);
            
            // Decode response (your Laravel backend base64 encodes it)
            const decoded = JSON.parse(atob(response.data.encoded));

            // Show success message
            Swal.fire('Success', decoded.message, 'success');
            
            // Close modal and refresh table data
            // NO PAGE RELOAD! Just refetch data and React updates the table
            closeModal();
            refresh(); // Calls the API again to get updated list
            
        } catch (err: any) {
            // Handle errors
            Swal.fire(
                'Error',
                err.response?.data?.message || 'Something went wrong',
                'error'
            );
        }
    };

    /* ======================= DELETE DEPARTMENT ======================== */
    // BLADE/JQUERY EQUIVALENT:
    // $('.delete-btn').click(function() {
    //     var id = $(this).data('id');
    //     Swal.fire({...}).then((result) => {
    //         if (result.isConfirmed) {
    //             $.ajax({
    //                 url: '/departments/' + id,
    //                 method: 'DELETE',
    //                 success: function() {
    //                     Swal.fire('Deleted!');
    //                     location.reload();
    //                 }
    //             });
    //         }
    //     });
    // });
    
    const deleteDepartment = async (id: number) => {
        setOpenDropdownId(null); // Close dropdown

        // Confirmation dialog (same SweetAlert2 you know!)
        const confirm = await Swal.fire({
            title: 'Confirm Delete',
            text: 'Are you sure you want to delete this department?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
        });

        if (!confirm.isConfirmed) return; // User cancelled

        try {
            // DELETE request
            const response = await axios.delete(`/departments/${id}`);
            const decoded = JSON.parse(atob(response.data.encoded));

            Swal.fire('Deleted', decoded.message, 'success');
            refresh(); // Reload table data (no page refresh!)
            
        } catch {
            Swal.fire('Error', 'Failed to delete department', 'error');
        }
    };

    /* ======================= RENDER (JSX) ======================== */
    // BLADE: You'd write HTML with @foreach, @if, etc.
    // REACT: JSX looks like HTML but it's JavaScript
    // KEY: When state changes, only affected parts re-render (Virtual DOM magic!)
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* Sets page title in browser tab - like @section('title', 'Departments') */}
            <Head title="Departments" />

            <div className="p-6">
                {/* ===== HEADER SECTION ===== */}
                <div className="mb-6">
                    <div className="flex items-start justify-between mb-2">
                        <div>
                            <h2 className="text-2xl font-semibold text-foreground mb-1">
                                Departments
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                A list of all the departments in your system including their name and actions.
                            </p>
                        </div>
                        {/* 
                            Add Department Button
                            BLADE: <button onclick="openModal()">Add</button>
                            REACT: onClick={() => openModal()} - arrow function prevents immediate execution
                        */}
                        <button
                            onClick={() => openModal()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                        >
                            Add Department
                        </button>
                    </div>
                </div>

                {/* ===== TABLE CONTROLS (Search & Per Page) ===== */}
                {/* Reusable component - in Blade you'd copy-paste this code everywhere */}
                <TableControls
                    searchTerm={searchTerm}
                    onSearchChange={handleSearch}
                    perPage={perPage}
                    onPerPageChange={handlePerPageChange}
                    searchPlaceholder="Search departments..."
                />

                {/* ===== DATA TABLE ===== */}
                <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full">
                        <thead className="bg-muted/30">
                            <tr className="border-b border-border">
                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                    #
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-card">
                            {/* 
                                CONDITIONAL RENDERING
                                BLADE: @if($loading) ... @elseif(count($departments) === 0) ... @else ... @endif
                                REACT: Ternary operators (condition ? true : false)
                            */}
                            {loading ? (
                                // Show while data is loading
                                <tr>
                                    <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                                        Loading...
                                    </td>
                                </tr>
                            ) : tableData.data.length === 0 ? (
                                // Show when no data found
                                <tr>
                                    <td colSpan={3} className="px-6 py-8 text-center text-muted-foreground">
                                        No departments found
                                    </td>
                                </tr>
                            ) : (
                                // Show actual data
                                // BLADE: @foreach($departments as $index => $dept)
                                // REACT: .map() creates array of components
                                tableData.data.map((dept, index) => (
                                    <tr key={dept.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                                        {/* Row number with pagination offset */}
                                        <td className="px-6 py-4 text-sm text-foreground">
                                            {(tableData.currentPage - 1) * tableData.perPage + index + 1}
                                        </td>
                                        
                                        {/* Department name - BLADE: {{ $dept->name }} */}
                                        <td className="px-6 py-4 text-sm text-foreground">
                                            {dept.name}
                                        </td>
                                        
                                        {/* Actions column */}
                                        <td className="px-6 py-4 text-sm">
                                            <div className="flex items-center justify-end">
                                                {/* 
                                                    Dropdown container
                                                    ref={...} attaches the DOM element reference
                                                    Only attach ref to the currently open dropdown
                                                */}
                                                <div className="relative" ref={openDropdownId === dept.id ? dropdownRef : null}>
                                                    {/* Three dots button */}
                                                    <button
                                                        onClick={() => toggleDropdown(dept.id)}
                                                        className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                                                        title="More actions"
                                                    >
                                                        <MoreVertical className="w-5 h-5" />
                                                    </button>

                                                    {/* 
                                                        Dropdown Menu
                                                        BLADE: You'd have this hidden with display:none, show with jQuery
                                                        REACT: Conditionally render - if false, doesn't exist in DOM at all!
                                                    */}
                                                    {openDropdownId === dept.id && (
                                                        <div className="absolute right-0 mt-1 w-40 bg-card border border-border rounded-lg shadow-lg z-10 py-1">
                                                            {/* Edit button */}
                                                            <button
                                                                onClick={() => openModal(dept)}
                                                                className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2 transition-colors"
                                                            >
                                                                <Pencil className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                                Edit
                                                            </button>
                                                            
                                                            {/* Delete button */}
                                                            <button
                                                                onClick={() => deleteDepartment(dept.id)}
                                                                className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted flex items-center gap-2 transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ===== PAGINATION ===== */}
                {/* Only show if not loading - BLADE: @if(!$loading) */}
                {!loading && (
                    <TablePagination
                        currentPage={tableData.currentPage}
                        totalItems={tableData.total}
                        perPage={tableData.perPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>

            {/* ======================= MODAL ======================== */}
            {/* 
                BLADE: Modal always exists in HTML, show/hide with jQuery or Bootstrap
                REACT: Conditional rendering - if modalOpen is false, this doesn't exist!
            */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-card rounded-lg w-full max-w-md p-6 shadow-lg border border-border">
                        <h3 className="text-xl font-semibold mb-4 text-foreground">
                            {/* Dynamic title based on edit mode */}
                            {editingDept ? 'Edit Department' : 'Add Department'}
                        </h3>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Department Name
                            </label>
                            {/* 
                                Controlled Input
                                BLADE: <input name="name" value="{{ old('name', $dept->name) }}">
                                REACT: value and onChange create two-way binding
                                - value={name}: Input shows current state
                                - onChange: Updates state when user types
                                - This creates "controlled component" - React controls the input
                            */}
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                                placeholder="Enter department name"
                            />
                        </div>

                        {/* Modal action buttons */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 border border-input rounded-lg hover:bg-accent text-foreground transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveDepartment}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}

/**
 * ===== SUMMARY: BLADE/JQUERY vs REACT =====
 * 
 * 1. DATA FLOW:
 *    BLADE: Controller → View (one direction)
 *    REACT: State → UI → State (circular, reactive)
 * 
 * 2. DOM MANIPULATION:
 *    JQUERY: $('#element').hide() - direct DOM manipulation
 *    REACT: setModalOpen(false) - state change, React handles DOM
 * 
 * 3. FORM HANDLING:
 *    BLADE: <form method="POST"> with name attributes
 *    REACT: Controlled components with state
 * 
 * 4. AJAX/API CALLS:
 *    JQUERY: $.ajax() with manual DOM updates
 *    REACT: axios + state updates = automatic re-render
 * 
 * 5. PAGE UPDATES:
 *    BLADE: Full page reload or manual DOM manipulation
 *    REACT: Virtual DOM updates only changed parts
 * 
 * 6. REUSABILITY:
 *    BLADE: Includes/components with @include
 *    REACT: Actual JavaScript components with props
 * 
 * 7. TYPE SAFETY:
 *    BLADE/PHP: Type hints in controller
 *    REACT/TS: Types everywhere, caught at compile time
 */