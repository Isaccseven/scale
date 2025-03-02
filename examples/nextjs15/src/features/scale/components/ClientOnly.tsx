'use client';

import { useEffect, useState } from 'react';
import React from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * ClientOnly ist eine Komponente, die ihre Kinder nur auf der Client-Seite rendert.
 * Dies ist besonders hilfreich für Scale-Komponenten, die Web Components verwenden und
 * während der serverseitigen Renderung Hydration-Fehler erzeugen können.
 * 
 * @param children Die Komponenten, die nur auf dem Client gerendert werden sollen
 * @param fallback Optionaler Fallback-Inhalt, der während des Server-Renderings angezeigt wird
 */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return fallback;
  }
  
  return <>{children}</>;
}

export default ClientOnly; 