import { Link } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, Phone, Mail } from 'lucide-react';

/**
 * PROFESSIONAL UNIVERSITY NAVBAR COMPONENT
 * 
 * Features:
 * - Top bar with contact info (like real university websites)
 * - Main navigation with dropdown menus
 * - Search functionality
 * - Sticky header that shrinks on scroll
 * - Mobile responsive with hamburger menu
 * - Professional dark theme
 * 
 * BLADE EQUIVALENT:
 * @include('partials.navbar')
 * 
 * REACT:
 * <LandingNavbar />
 */

export default function LandingNavbar() {
    // ===== STATE MANAGEMENT =====
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // ===== SCROLL EFFECT =====
    // Makes navbar smaller when scrolling down (like modern university sites)
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ===== CLOSE DROPDOWN WHEN CLICKING OUTSIDE =====
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // ===== TOGGLE DROPDOWN =====
    const toggleDropdown = (menu: string) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    // ===== HANDLE SEARCH =====
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // In real app, you'd navigate to search results page
            window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <nav className="sticky top-0 z-50 shadow-lg">
            {/* ===== TOP BAR (Contact Info) ===== */}
            {/* This disappears on mobile for cleaner look */}
            <div className="bg-gradient-to-r from-green-700 to-green-600 text-white hidden lg:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-10 text-sm">
                        {/* Left: Tagline */}
                        <div className="flex items-center gap-1">
                            <span className="font-medium">Be Nurtured, Be Competitive, Choose NCI</span>
                        </div>

                        {/* Right: Contact Info */}
                        <div className="flex items-center gap-6">
                            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-green-100 transition-colors">
                                <Phone className="w-3.5 h-3.5" />
                                <span>+1 (234) 567-890</span>
                            </a>
                            <a href="mailto:info@nci.edu" className="flex items-center gap-2 hover:text-green-100 transition-colors">
                                <Mail className="w-3.5 h-3.5" />
                                <span>info@nci.edu</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== MAIN NAVBAR ===== */}
            <div className={`bg-gray-900 text-white transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">

                        {/* ===== LOGO & BRAND ===== */}
                        <Link href="/" className="flex items-center gap-3 group">
                            {/* Logo - Replace with your actual logo */}
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                <span className="text-white font-bold text-xl">NC</span>
                            </div>

                            {/* Brand Text */}
                            <div className="hidden sm:block">
                                <div className={`font-bold text-white transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl'
                                    }`}>
                                    NORTHEASTERN COLLEGE
                                </div>
                                <div className="text-xs text-green-400 font-medium">
                                    Santiago City, Isabela
                                </div>
                            </div>
                        </Link>

                        {/* ===== DESKTOP NAVIGATION ===== */}
                        <div className="hidden lg:flex items-center gap-1">

                            {/* Home */}
                            <Link
                                href="/"
                                className="px-4 py-2 text-green-400 hover:bg-gray-800 rounded-lg transition-colors font-medium"
                            >
                                Home
                            </Link>

                            {/* About */}
                            <Link
                                href="/about"
                                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                About
                            </Link>

                            {/* Academic (Dropdown) */}
                            <div className="relative" ref={activeDropdown === 'academic' ? dropdownRef : null}>
                                <button
                                    onClick={() => toggleDropdown('academic')}
                                    className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1"
                                >
                                    Academic
                                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'academic' ? 'rotate-180' : ''
                                        }`} />
                                </button>

                                {/* Dropdown Menu */}
                                {activeDropdown === 'academic' && (
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 py-2">
                                        <Link
                                            href="/programs"
                                            className="block px-4 py-2 hover:bg-green-50 hover:text-green-700 transition-colors"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            Programs Offered
                                        </Link>
                                        <Link
                                            href="/departments"
                                            className="block px-4 py-2 hover:bg-green-50 hover:text-green-700 transition-colors"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            Departments
                                        </Link>
                                        <Link
                                            href="/faculty"
                                            className="block px-4 py-2 hover:bg-green-50 hover:text-green-700 transition-colors"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            Faculty & Staff
                                        </Link>
                                        <Link
                                            href="/calendar"
                                            className="block px-4 py-2 hover:bg-green-50 hover:text-green-700 transition-colors"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            Academic Calendar
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Research */}
                            <Link
                                href="/research"
                                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                Research
                            </Link>

                            {/* Admission (Dropdown) */}
                            <div className="relative" ref={activeDropdown === 'admission' ? dropdownRef : null}>
                                <button
                                    onClick={() => toggleDropdown('admission')}
                                    className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1"
                                >
                                    Admission
                                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'admission' ? 'rotate-180' : ''
                                        }`} />
                                </button>

                                {/* Dropdown Menu */}
                                {activeDropdown === 'admission' && (
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 py-2">
                                        <Link
                                            href="/apply"
                                            className="block px-4 py-2 hover:bg-green-50 hover:text-green-700 transition-colors"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            How to Apply
                                        </Link>
                                        <Link
                                            href="/requirements"
                                            className="block px-4 py-2 hover:bg-green-50 hover:text-green-700 transition-colors"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            Requirements
                                        </Link>
                                        <Link
                                            href="/tuition"
                                            className="block px-4 py-2 hover:bg-green-50 hover:text-green-700 transition-colors"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            Tuition & Fees
                                        </Link>
                                        <Link
                                            href="/scholarships"
                                            className="block px-4 py-2 hover:bg-green-50 hover:text-green-700 transition-colors"
                                            onClick={() => setActiveDropdown(null)}
                                        >
                                            Scholarships
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Contact */}
                            <Link
                                href="/contact"
                                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                Contact
                            </Link>
                        </div>

                        {/* ===== SEARCH & AUTH BUTTONS ===== */}
                        <div className="hidden lg:flex items-center gap-3">
                            {/* Search Button */}
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                                title="Search"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                        </div>

                        {/* ===== MOBILE MENU BUTTON ===== */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>

                    {/* ===== SEARCH BAR (Desktop) ===== */}
                    {searchOpen && (
                        <div className="hidden lg:block mt-4 pb-2">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search programs, departments, faculty..."
                                    className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-400"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-green-400 hover:text-green-300 transition-colors"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {/* ===== MOBILE MENU ===== */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-gray-800 border-t border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">

                        {/* Search (Mobile) */}
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search..."
                                    className="w-full px-4 py-2 pr-10 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-green-400"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </form>

                        {/* Navigation Links */}
                        <Link
                            href="/"
                            className="block px-4 py-3 text-green-400 hover:bg-gray-700 rounded-lg transition-colors font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>

                        <Link
                            href="/about"
                            className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>

                        {/* Academic Submenu */}
                        <div className="space-y-1">
                            <button
                                onClick={() => toggleDropdown('mobile-academic')}
                                className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between"
                            >
                                Academic
                                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-academic' ? 'rotate-180' : ''
                                    }`} />
                            </button>

                            {activeDropdown === 'mobile-academic' && (
                                <div className="pl-4 space-y-1">
                                    <Link
                                        href="/programs"
                                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Programs Offered
                                    </Link>
                                    <Link
                                        href="/departments"
                                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Departments
                                    </Link>
                                    <Link
                                        href="/faculty"
                                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Faculty & Staff
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/research"
                            className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Research
                        </Link>

                        {/* Admission Submenu */}
                        <div className="space-y-1">
                            <button
                                onClick={() => toggleDropdown('mobile-admission')}
                                className="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-between"
                            >
                                Admission
                                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'mobile-admission' ? 'rotate-180' : ''
                                    }`} />
                            </button>

                            {activeDropdown === 'mobile-admission' && (
                                <div className="pl-4 space-y-1">
                                    <Link
                                        href="/apply"
                                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        How to Apply
                                    </Link>
                                    <Link
                                        href="/requirements"
                                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Requirements
                                    </Link>
                                    <Link
                                        href="/tuition"
                                        className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Tuition & Fees
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/contact"
                            className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>

                        {/* Auth Buttons (Mobile) */}
                        <div className="pt-4 border-t border-gray-700 space-y-2">
                            <Link
                                href="/login"
                                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors text-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="block px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all font-medium text-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Apply Now
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}