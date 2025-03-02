# Next.js 15 mit Scale Design System

Dieses Projekt demonstriert die Integration des [Telekom Scale Design Systems](https://telekom.github.io/scale/) in eine [Next.js 15](https://nextjs.org) Anwendung. Das Projekt wurde mit [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) erstellt und anschließend um Scale-Komponenten erweitert.

## Features

- Next.js 15 mit App Router
- React 19 Unterstützung
- Integration des Telekom Scale Design Systems
- TypeScript für Typsicherheit
- Client-seitige Komponenten für optimale Hydration
- Tailwind CSS für zusätzliche Styling-Optionen

## Bekannte Probleme

**TypeScript-Kompatibilität**: Es gibt aktuell Typisierungsprobleme zwischen React 19 und Scale-Komponenten. Dies führt zu TypeScript-Fehlern, wenn man die Scale-Komponenten direkt verwenden möchte. Mögliche Lösungen:

1. **Verwenden von `any` für Komponenten-Typen**: Temporäre Lösung, bis Scale mit React 19 vollständig kompatibel ist
2. **Dynamischer Import**: Nutzen von `next/dynamic`, um Komponenten zu laden
3. **Heruntergrade auf React 18**: Falls die Scale-Komponenten kritisch für die Anwendung sind

In diesem Beispiel haben wir zunächst auf native HTML-Komponenten zurückgegriffen, bis eine offizielle Unterstützung für React 19 verfügbar ist.

## Erste Schritte

Zunächst installieren Sie die Abhängigkeiten:

```bash
npm install
# oder
yarn install
# oder
pnpm install
# oder
bun install
```

Dann starten Sie den Entwicklungsserver:

```bash
npm run dev
# oder
yarn dev
# oder
pnpm dev
# oder
bun dev
```

Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser, um das Ergebnis zu sehen.

Sie können die Seite bearbeiten, indem Sie `src/app/page.tsx` ändern. Die Seite wird automatisch aktualisiert, wenn Sie die Datei bearbeiten.

## Verwendung der Scale-Komponenten

### Mit React 18

In einem React 18-Projekt würden Sie Scale-Komponenten normalerweise direkt importieren:

```tsx
import { ScaleButton, ScaleCard } from '@telekom/scale-components-react';

// Innerhalb Ihrer Komponente
export default function MyPage() {
  return (
    <div>
      <ScaleCard>
        <h2>Eine Karte</h2>
        <ScaleButton variant="primary">Ein Button</ScaleButton>
      </ScaleCard>
    </div>
  );
}
```

### Mit React 19 (Workaround)

Mit React 19 ist es empfehlenswert, zunächst auf Standard-HTML-Elemente auszuweichen oder die `ClientOnly`-Komponente zu verwenden:

```tsx
import { ClientOnly } from './components/ScaleComponents';

export default function MyPage() {
  return (
    <ClientOnly>
      {/* Standard-HTML mit Scale-ähnlichem Styling */}
      <div className="border rounded-lg p-4">
        <h2>Eine Karte</h2>
        <button className="bg-[#e20074] text-white px-4 py-2 rounded-lg">
          Ein Button
        </button>
      </div>
    </ClientOnly>
  );
}
```

## Kompatibilität mit React 19

Da Next.js 15 auf React 19 basiert und die Scale-Komponenten derzeit noch nicht vollständig mit React 19 Typ-Definitionen kompatibel sind, verwenden wir einen speziellen Wrapper, um diese Probleme zu umgehen.

### Implementierte Lösung

1. **TypeFix-Wrapper**: Wir verwenden eine `withTypeFix` Hilfsfunktion, um die TypeScript-Fehler zu umgehen, die durch die Inkompatibilität zwischen React 19 und Scale entstehen.

2. **Importstruktur**: Anstatt die Scale-Komponenten direkt zu importieren, importieren wir die umgewrappten Komponenten:

```tsx
// NICHT direkt verwenden:
import { ScaleButton } from '@telekom/scale-components-react';

// STATTDESSEN verwenden:
import { Button } from './components/WrappedScaleComponents';
```

3. **ClientOnly-Komponente**: Um Hydration-Probleme zu vermeiden, rendern wir alle Scale-Komponenten innerhalb der `ClientOnly`-Komponente, die sicherstellt, dass die Komponenten nur auf dem Client gerendert werden.

### Typescript-Konfiguration

Um die Lösung zu unterstützen, wurden in der `tsconfig.json` die folgenden Einstellungen vorgenommen:

```json
{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": false,
    "skipLibCheck": true,
    // weitere Einstellungen...
  }
}
```

## Weitere Informationen

- [Scale Design System Dokumentation](https://telekom.github.io/scale/) - Informationen zu allen verfügbaren Scale-Komponenten.
- [Next.js Dokumentation](https://nextjs.org/docs) - Informationen zu Next.js Features und API.
- [Next.js Learning Plattform](https://nextjs.org/learn) - Ein interaktives Next.js Tutorial.

## Deployment auf Vercel

Die einfachste Möglichkeit, Ihre Next.js App zu deployen, ist die Verwendung der [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) von den Entwicklern von Next.js.

Weitere Informationen finden Sie in der [Next.js Deployment Dokumentation](https://nextjs.org/docs/app/building-your-application/deploying).
