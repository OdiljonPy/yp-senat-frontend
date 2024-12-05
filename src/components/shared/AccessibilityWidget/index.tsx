'use client';

import { RefreshCcw } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useAccessibility } from '@/contexts/accessibility-context';

export function AccessibilityWidget() {
    const {
        settings,
        updateSettings,
        resetSettings,
        applyImageHiding,
        setIsOpenWidget,
        isOpenWidget,
    } = useAccessibility();

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=BiYgxJ4l';
        document.head.appendChild(script);

        return () => {
            if (window.responsiveVoice) {
                window.responsiveVoice.cancel();
            }
        };
    }, []);

    useEffect(() => {
        const handleSpeech = () => {
            const selectedText = window.getSelection()?.toString();
            if (selectedText && window.responsiveVoice && settings.reader) {
                window.responsiveVoice.cancel();
                window.responsiveVoice.speak(selectedText, 'Russian Female');
            }
        };

        if (settings.reader) {
            document.addEventListener('mouseup', handleSpeech);
        }

        return () => {
            document.removeEventListener('mouseup', handleSpeech);
        };
    }, [settings.reader]);

    const renderModeButton = useCallback(
        (mode: 'with-color' | 'without-color' | 'invert-color', label: string, additionalStyles: Record<string, string> = {}) => (
            <button
                className={`flex-1 h-full bg-blue-500 rounded-lg border-3 transition-colors ${settings.mode === mode ? 'border-blue-500' : 'border-transparent hover:border-blue-500'
                    }`}
                onClick={() => updateSettings({ mode })}
                aria-pressed={settings.mode === mode}
                style={{ backgroundImage: "url('/placeholder.svg?height=110&width=200')", ...additionalStyles }}
            >
                <span className={`text-2xl px-4 py-2 rounded ${mode === 'invert-color' ? 'text-white' : 'text-black'}`}>
                    {label}
                </span>
            </button>
        ),
        [settings.mode, updateSettings]
    );

    return (
        <div className="fixed top-0 left-0 w-full z-50">
            {isOpenWidget && (
                <div className="w-full bg-gray-900 text-white-900 shadow-lg animate-in slide-in-from-top">
                    <div className="container relative">
                        <div className="container mx-auto py-6">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                <div className="md:col-span-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {renderModeButton('with-color', 'COLORFUL')}
                                        {renderModeButton('without-color', 'GRAYSCALE', { filter: 'grayscale(100%)' })}
                                        {renderModeButton('invert-color', 'INVERT', { filter: 'invert(100%)' })}
                                    </div>
                                </div>

                                <div className="md:col-span-4">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="noImage"
                                                checked={settings.noImage}
                                                onCheckedChange={(checked: boolean) => {
                                                    updateSettings({ noImage: checked });
                                                    applyImageHiding(checked);
                                                }}
                                            />
                                            <label
                                                htmlFor="noImage"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Hide Images
                                            </label>
                                        </div>

                                        {/* Text to Speech */}
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="reader"
                                                checked={settings.reader}
                                                onCheckedChange={(checked: boolean) =>
                                                    updateSettings({ reader: checked })
                                                }
                                            />
                                            <label
                                                htmlFor="reader"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Text to Speech
                                            </label>
                                        </div>

                                        {/* Font Size */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Font Size</label>
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm">Aa</span>
                                                <Slider
                                                    value={[settings.fontSize]}
                                                    min={8}
                                                    max={22}
                                                    step={2}
                                                    onValueChange={([value]) => updateSettings({ fontSize: value })}
                                                    className="w-[180px]"
                                                />
                                                <span className="text-xl">Aa</span>
                                            </div>
                                        </div>

                                        {/* Reset to Default */}
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={resetSettings}
                                            className="w-fit"
                                        >
                                            <RefreshCcw className="mr-2 h-4 w-4" />
                                            Reset to Default
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-0 right-0 sm:right-4 sm:top-4"
                            onClick={() => setIsOpenWidget(false)}
                            aria-label="Close accessibility settings"
                        >
                            <span className="sr-only">Close</span>
                            ×
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
