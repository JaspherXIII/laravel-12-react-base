import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Building, PackageSearch } from 'lucide-react';
import AppLogo from './app-logo';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const { locale } = usePage().props as { locale: 'en' | 'fil' };

    const mainNavItems: NavItem[] = [
        {
            title: locale === 'fil' ? 'Pangunahing Dashboard' : 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: locale === 'fil' ? 'Departamento' : 'Departments',
            href: '/departments',
            icon: Building,
        },
        {
            title: locale === 'fil' ? 'Mga Produkto' : 'Products',
            href: '/products',
            icon: PackageSearch,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu className="flex justify-between items-center w-full">
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
