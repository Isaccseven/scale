# Scale-Komponenten in Next.js 15

Diese Verzeichnisstruktur enthält Hilfskomponenten und Anpassungen, um Telekom Scale-Komponenten mit Next.js 15 und React 19 zu verwenden.

## Struktur

- **components/**: Enthält alle Scale-bezogenen Komponenten
  - `ClientOnly.tsx`: Komponente zur Client-seitigen Renderung (verhindert Hydration-Fehler)
  - `ScaleComponents.tsx`: Enthält die `withTypeFix`-Funktion für TypeScript-Kompatibilität
  - `ScaleInitializer.tsx`: Initialisiert Scale Web-Komponenten
  - `WrappedScaleComponents.tsx`: Exportiert fertig gewrappte Scale-Komponenten

## Verwendung

### 1. Komponenten importieren

```tsx
// Häufig verwendete Komponenten direkt importieren
import { Button, Card, TextField } from "@/features/scale/components/WrappedScaleComponents";

// Oder dynamischen Import für andere Komponenten verwenden
import ScaleComponents from "@/features/scale/components/WrappedScaleComponents";
const Accordion = ScaleComponents.Accordion;
```

### 2. ClientOnly-Wrapper verwenden

Umschließe alle Scale-Komponenten mit dem `ClientOnly`-Wrapper, um Hydration-Probleme zu vermeiden:

```tsx
import ClientOnly from "@/features/scale/components/ClientOnly";

export default function MyPage() {
  return (
    <ClientOnly fallback={<div>Lädt...</div>}>
      <Card>
        <h2>Beispiel-Inhalt</h2>
        <Button variant="primary">Klick mich</Button>
      </Card>
    </ClientOnly>
  );
}
```

### 3. Event-Handler

Alle Event-Handler funktionieren wie gewohnt:

```tsx
const handleClick = () => {
  console.log("Button geklickt");
};

return (
  <Button onClick={handleClick} variant="primary">
    Klick mich
  </Button>
);
```

## Problembehebung

- **Node.js-Version**: Node.js 18.17.0 oder höher ist für Next.js 15 erforderlich
- **Komponenten erscheinen nicht**: Prüfe die Browser-Konsole auf Fehler bei der Web-Komponenten-Initialisierung
- **TypeScript-Fehler**: Die `withTypeFix`-Funktion unterdrückt die meisten Fehler, aber beachte, dass vollständige Typsicherheit erst mit einer offiziellen React 19-kompatiblen Version von Scale erreicht wird

## Ressourcen

- [Scale-Komponenten Dokumentation](https://telekom.github.io/scale/?path=/docs/home--page)
- [Next.js Dokumentation](https://nextjs.org/docs) 