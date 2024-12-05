export type Locale = (typeof locales)[number];

export const locales = ['uz', 'ru', 'en'] as const;
export const defaultLocale: Locale = 'uz';
