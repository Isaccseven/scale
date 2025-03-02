'use client';

import Image from "next/image";
import ClientOnly from "../features/scale/components/ClientOnly";
import { Button, Card, TextField } from "../features/scale/components/WrappedScaleComponents";

// Verwendung der Scale-Komponenten mit TypeScript-Fix für React 19 Kompatibilität
export default function Home() {
  const handleButtonClick = () => {
    alert('Button wurde geklickt!');
  };
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <ClientOnly fallback={<div className="h-48 w-full bg-gray-100 animate-pulse rounded-lg"></div>}>
          <Card>
            <div>
              <h2 className="text-xl font-bold mb-4">Scale Komponenten in Next.js 15</h2>
              <p>
                Dieses Projekt demonstriert die Integration des Telekom Scale Design Systems
                in eine Next.js 15 Anwendung.
              </p>
              <p className="mt-2 text-sm">
                Wir verwenden hier die Scale-Komponenten mit einem TypeScript-Wrapper
                für die Kompatibilität mit React 19.
              </p>
              
              <div className="mt-4">
                <Button variant="primary" onClick={handleButtonClick}>
                  Beispiel Button
                </Button>
              </div>
              
              <div className="mt-4">
                <TextField 
                  label="Beispiel Textfeld" 
                  placeholder="Text eingeben" 
                  helperText="Optionale Hilfeinformation"
                />
              </div>
            </div>
          </Card>
        </ClientOnly>

        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Scale-Komponenten editieren in{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/features/scale/components/
            </code>
          </li>
          <li>Speichern und sofort die Änderungen sehen.</li>
        </ol>
      </main>
    </div>
  );
}
