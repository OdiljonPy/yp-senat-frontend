'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'

interface AccessibilitySettings {
    mode: 'with-color' | 'without-color' | 'invert-color';
    fontSize: number;
    noImage: boolean;
    reader: boolean;
}

interface AccessibilityContextType {
    settings: AccessibilitySettings;
    updateSettings: (settings: Partial<AccessibilitySettings>) => void;
    resetSettings: () => void;
    applyImageHiding: (hide: boolean) => void;
    isOpenWidget: boolean;
    setIsOpenWidget: (v: boolean) => void;
}

const defaultSettings: AccessibilitySettings = {
    mode: 'with-color',
    fontSize: 16,
    noImage: false,
    reader: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
    const [isOpenWidget, setIsOpenWidget] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedSettings = localStorage.getItem('specialSettings');
            if (savedSettings) {
                setSettings(JSON.parse(savedSettings));
            }
        }
    }, []);

    const updateBodyClass = useCallback(() => {
        if (typeof window !== 'undefined') {
            const app = document.body;
            app.classList.remove('blackAndWhite', 'blackAndWhiteInvert');

            if (settings.mode === 'without-color') {
                app.classList.add('blackAndWhite');
            } else if (settings.mode === 'invert-color') {
                app.classList.add('blackAndWhiteInvert');
            }
        }
    }, [settings.mode]);

    const applyImageHiding = useCallback((hide: boolean) => {
        if (typeof window !== 'undefined') {
            document.querySelectorAll('img').forEach((img) => {
                img.style.visibility = hide ? 'hidden' : 'visible';
                if (hide) {
                    img.parentElement?.classList.add('gradient-placeholder');
                } else {
                    img.parentElement?.classList.remove('gradient-placeholder');
                }
            });
        }
    }, []);

    useEffect(() => {
        updateBodyClass();
        applyImageHiding(settings.noImage);

        if (typeof window !== 'undefined') {
            document.documentElement.style.setProperty(
                'font-size',
                `${settings.fontSize}px`,
                'important'
            );

            localStorage.setItem('specialSettings', JSON.stringify(settings));
        }
    }, [settings, updateBodyClass, applyImageHiding]);

    const updateSettings = useCallback((newSettings: Partial<AccessibilitySettings>) => {
        setSettings((prev) => ({ ...prev, ...newSettings }));
    }, []);

    const resetSettings = useCallback(() => {
        setSettings(defaultSettings);
        updateBodyClass();
        applyImageHiding(defaultSettings.noImage);
    }, [updateBodyClass, applyImageHiding]);

    return (
        <AccessibilityContext.Provider
            value={{
                settings,
                updateSettings,
                resetSettings,
                applyImageHiding,
                isOpenWidget,
                setIsOpenWidget,
            }}
        >
            {children}
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext);
    if (!context) {
        throw new Error('useAccessibility must be used within an AccessibilityProvider');
    }
    return context;
}
