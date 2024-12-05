declare interface Window {
    responsiveVoice?: {
        speak: (text: string, voice: string) => void;
        cancel: () => void;
    };
}
