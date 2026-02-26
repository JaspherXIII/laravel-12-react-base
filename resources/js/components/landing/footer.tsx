import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import Swal from 'sweetalert2';

/**
 * PROFESSIONAL UNIVERSITY FOOTER COMPONENT
 * 
 * Features:
 * - Contact information with icons
 * - Quick links organized in columns
 * - Newsletter subscription form
 * - Social media links
 * - Professional dark theme
 * - Fully responsive
 * 
 * BLADE EQUIVALENT:
 * @include('partials.footer')
 * 
 * REACT:
 * <LandingFooter />
 */

export default function LandingFooter() {
    // State for newsletter subscription
    const [email, setEmail] = useState('');
    const [subscribing, setSubscribing] = useState(false);

    // Get current year dynamically
    const currentYear = new Date().getFullYear();

    /**
     * Handle newsletter subscription
     * BLADE/JQUERY EQUIVALENT:
     * $('#subscribe-form').submit(function(e) {
     *   e.preventDefault();
     *   $.ajax({ url: '/subscribe', data: { email: $('#email').val() } });
     * });
     */
    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic email validation
        if (!email || !email.includes('@')) {
            Swal.fire('Error', 'Please enter a valid email address', 'error');
            return;
        }

        setSubscribing(true);

        try {
            // In real app, you'd send to your Laravel backend
            // await axios.post('/subscribe', { email });
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            Swal.fire(
                'Subscribed!', 
                'Thank you for subscribing to our newsletter.', 
                'success'
            );
            setEmail(''); // Clear form
        } catch (error) {
            Swal.fire('Error', 'Failed to subscribe. Please try again.', 'error');
        } finally {
            setSubscribing(false);
        }
    };

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* ===== MAIN FOOTER CONTENT ===== */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    
                    {/* ===== COLUMN 1: ABOUT / CONTACT INFO ===== */}
                    <div className="lg:col-span-1">
                        {/* Logo & Brand */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">NC</span>
                            </div>
                            <div>
                                <h3 className="text-white text-lg font-bold leading-tight">
                                    NORTHEASTERN COLLEGE
                                </h3>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p>Villasis, Santiago City</p>
                                    <p>Isabela, 3311</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <a 
                                    href="mailto:ncpvillasisoffice@gmail.com" 
                                    className="hover:text-white transition-colors"
                                >
                                    ncpvillasisoffice@gmail.com
                                </a>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <a 
                                    href="tel:+1234567890" 
                                    className="hover:text-white transition-colors"
                                >
                                    +1 (234) 567-890
                                </a>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="flex gap-3 mt-6">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors group"
                                title="Facebook"
                            >
                                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-white" />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors group"
                                title="Twitter"
                            >
                                <Twitter className="w-4 h-4 text-gray-400 group-hover:text-white" />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors group"
                                title="Instagram"
                            >
                                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white" />
                            </a>
                            <a 
                                href="https://youtube.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors group"
                                title="YouTube"
                            >
                                <Youtube className="w-4 h-4 text-gray-400 group-hover:text-white" />
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors group"
                                title="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-white" />
                            </a>
                        </div>
                    </div>

                    {/* ===== COLUMN 2: QUICK LINKS ===== */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-wide">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link 
                                    href="/about" 
                                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/calendar" 
                                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                >
                                    Event Calendar
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/research" 
                                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                >
                                    Research
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/sias" 
                                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                >
                                    SIAS Online
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/careers" 
                                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                >
                                    Career Services
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* ===== COLUMN 3: ACADEMICS ===== */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-wide">
                            Academics
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link 
                                    href="/programs" 
                                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                >
                                    Programs Offered
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/departments" 
                                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                >
                                    Departments
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/faculty" 
                                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                >
                                    Faculty & Staff
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/admissions" 
                                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                >
                                    Admissions
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/scholarships" 
                                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                >
                                    Scholarships
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/calendar" 
                                    className="hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                                >
                                    Academic Calendar
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* ===== COLUMN 4: NEWSLETTER ===== */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-4 uppercase tracking-wide">
                            Newsletter
                        </h4>
                        <p className="text-sm mb-4">
                            Subscribe to receive campus announcements and updates.
                        </p>
                        
                        {/* Newsletter Form */}
                        <form onSubmit={handleSubscribe} className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2.5 pr-12 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-gray-500 text-sm"
                                    disabled={subscribing}
                                />
                                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            </div>
                            
                            <button
                                type="submit"
                                disabled={subscribing}
                                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                            >
                                {subscribing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Subscribing...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Subscribe
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Additional Info */}
                        <p className="text-xs text-gray-500 mt-4">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>

            {/* ===== BOTTOM BAR (Copyright) ===== */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                        {/* Copyright */}
                        <p className="text-center md:text-left">
                            © {currentYear} Northeastern College. All rights reserved.
                        </p>

                        {/* Legal Links */}
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link 
                                href="/privacy" 
                                className="hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link 
                                href="/terms" 
                                className="hover:text-white transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link 
                                href="/cookies" 
                                className="hover:text-white transition-colors"
                            >
                                Cookie Policy
                            </Link>
                            <Link 
                                href="/accessibility" 
                                className="hover:text-white transition-colors"
                            >
                                Accessibility
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}