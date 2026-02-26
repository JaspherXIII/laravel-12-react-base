import { PageProps as InertiaPageProps } from '@inertiajs/core';

export type Locale = 'en' | 'fil';

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps {
        locale: Locale;
        locales?: Locale[];
    }
}
