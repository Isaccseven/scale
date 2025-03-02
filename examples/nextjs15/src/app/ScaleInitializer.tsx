'use client';

import { useEffect } from 'react';
import { defineCustomElements } from '@telekom/scale-components/loader';

export default function ScaleInitializer() {
  useEffect(() => {
    // Initialisiere die Scale-Komponenten nur auf der Client-Seite
    // Dies verhindert Hydration-Fehler
    defineCustomElements(window);
  }, []);

  return null; // Diese Komponente rendert nichts
} 