import { ReactNode } from 'react';
import LandingNavbar from '@/components/landing/navbar';
import LandingFooter from '@/components/landing/footer';

/**
 * LANDING LAYOUT
 * 
 * Wraps all public/landing pages
 * Now much cleaner - just imports Navbar and Footer components
 * 
 * BLADE EQUIVALENT:
 * <!DOCTYPE html>
 * <html>
 *   @include('partials.navbar')
 *   @yield('content')
 *   @include('partials.footer')
 * </html>
 */

interface LandingLayoutProps {
    children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar Component - reusable across all landing pages */}
            <LandingNavbar />

            {/* Main Content Area - this is where page content goes */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer Component - reusable across all landing pages */}
            <LandingFooter />
        </div>
    );
}