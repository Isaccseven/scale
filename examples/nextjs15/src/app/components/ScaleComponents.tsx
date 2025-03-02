'use client';

import { useEffect, useState } from 'react';
import React from 'react';

// Verbesserte ClientOnly-Komponente für die sichere Verwendung von Komponenten mit Hydration-Problemen
export function ClientOnly({ 
  children,
  fallback = null 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return fallback;
  }
  
  return <div suppressHydrationWarning>{children}</div>;
}

// Hilfsfunktion, um TypeScript-Fehler mit Scale-Komponenten in React 19 zu umgehen
// Diese Funktion ist notwendig, weil die aktuelle Version von Scale-Komponenten
// nicht vollständig mit React 19 Typen kompatibel ist
export function withTypeFix<P>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: React.ComponentType<any>
): React.FC<P> {
  const WrappedComponent = (props: P) => {
    // @ts-expect-error - Scale-Komponenten sind nicht vollständig mit React 19 kompatibel
    return <Component {...props} />;
  };
  
  // Definiere den Display-Namen für besseres Debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WrappedComponent.displayName = `TypeFixed(${displayName})`;
  
  return WrappedComponent;
} 