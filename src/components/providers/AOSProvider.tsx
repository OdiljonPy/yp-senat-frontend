'use client'; // Mark as a client component

import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

export default function AOSProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      once: true,
    });
  }, []);

  return <>{children}</>;
}
