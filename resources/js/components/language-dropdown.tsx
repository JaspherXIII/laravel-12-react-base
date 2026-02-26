import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocale, type Locale } from '@/hooks/useLocale';
import { Globe } from 'lucide-react'; 

export default function LanguageToggleDropdown() {
    const { locale, updateLocale } = useLocale();

    const labels: Record<Locale, string> = {
        en: 'English',
        fil: 'Filipino',
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-md">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => updateLocale('en')}>
                    <span className="flex items-center gap-2">
                        🇺🇸 English
                    </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateLocale('fil')}>
                    <span className="flex items-center gap-2">
                        🇵🇭 Filipino
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
