'use client';

import { useEffect, useState } from 'react';
import { defineCustomElements } from '@telekom/scale-components/loader';

export default function ScaleInitializer() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialisiere die Scale-Komponenten nur auf der Client-Seite und nur einmal
    if (!initialized && typeof window !== 'undefined') {
      defineCustomElements(window)
        .then(() => {
          console.debug('Scale components initialized successfully');
          setInitialized(true);
        })
        .catch(err => {
          console.error('Failed to initialize Scale components:', err);
        });
    }
  }, [initialized]);

  return null; // Diese Komponente rendert nichts
} 