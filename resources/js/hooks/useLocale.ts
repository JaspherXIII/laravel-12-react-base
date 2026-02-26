import { router, usePage } from '@inertiajs/react';

export type Locale = 'en' | 'fil';

export function useLocale() {
    const { locale } = usePage().props as { locale: Locale };

    const updateLocale = (value: Locale) => {
        router.post('/settings/locale', { locale: value }, { preserveState: true });
    };

    return { locale, updateLocale };
}
