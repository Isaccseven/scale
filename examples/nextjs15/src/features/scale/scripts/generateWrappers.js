#!/usr/bin/env node

/**
 * Dieses Skript generiert automatisch Wrapper-Komponenten für alle Scale-Komponenten.
 * Es scannt alle exportierten Komponenten aus @telekom/scale-components-react und erstellt
 * einen WrappedScaleComponents.tsx-File mit allen Komponenten, die mit withTypeFix gewrappt sind.
 * 
 * Verwendung:
 * 1. Node.js 18+ installieren
 * 2. Im Projektverzeichnis ausführen: node src/features/scale/scripts/generateWrappers.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Pfad zum WrappedScaleComponents.tsx
const outputPath = path.resolve(__dirname, '../components/WrappedScaleComponents.tsx');

// Generiere Liste aller Scale-Komponenten mit "Object.keys(require('@telekom/scale-components-react'))"
console.log('Scanning Scale-Komponenten...');
let scaleComponents;
try {
  // Diese Zeile scannt alle exportierten Komponenten aus dem Scale-Paket
  scaleComponents = execSync('node -e "console.log(Object.keys(require(\'@telekom/scale-components-react\')).filter(c => c.startsWith(\'Scale\')).join(\',\'))"', { encoding: 'utf-8' }).trim().split(',');
} catch (error) {
  console.error('Fehler beim Scannen der Scale-Komponenten:', error.message);
  process.exit(1);
}

console.log(`Gefunden: ${scaleComponents.length} Komponenten`);

// Eine Liste häufig verwendeter Komponenten mit spezifischen Prop-Interfaces
const commonComponents = [
  { name: 'Button', scaleComponentName: 'ScaleButton', props: ['variant', 'disabled', 'size', 'onClick'] },
  { name: 'Card', scaleComponentName: 'ScaleCard', props: ['className'] },
  { name: 'TextField', scaleComponentName: 'ScaleTextField', props: ['label', 'placeholder', 'disabled', 'required', 'value', 'onChange', 'helperText'] },
  // Hier können weitere Komponenten hinzugefügt werden
];

// Generiere den Code für WrappedScaleComponents.tsx
function generateWrapper() {
  let code = `'use client';

import * as ScaleComponents from '@telekom/scale-components-react';
import { withTypeFix } from './ScaleComponents';

// Generische Basis-Props-Schnittstelle
interface BaseProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

`;

  // Generiere spezifische Prop-Interfaces für häufig verwendete Komponenten
  commonComponents.forEach(comp => {
    code += `interface ${comp.name}Props extends BaseProps {
  ${comp.props.map(prop => {
    if (prop === 'onClick') return `${prop}?: (event: React.MouseEvent) => void;`;
    if (prop === 'onChange') return `${prop}?: (event: Event) => void;`;
    if (prop === 'children') return `${prop}?: React.ReactNode;`;
    if (prop === 'className') return `${prop}?: string;`;
    return `${prop}?: any;`;
  }).join('\n  ')}
  children?: React.ReactNode;
}

`;
  });

  // Komponenten-Cache und Proxy-Mechanismus
  code += `// Komponenten-Cache
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: Record<string, React.ComponentType<any>> = {};

// Automatisches Export-System
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exportedComponents = new Proxy({} as Record<string, React.ComponentType<any>>, {
  get: (target, prop) => {
    if (typeof prop !== 'string') return undefined;
    
    // Versuche, eine typisierte Komponente zu finden
    if (prop in target) return target[prop];
    
    // Schaue in der componentMap nach
    if (prop in componentMap) return componentMap[prop];
    
    // Versuche, die Scale-Komponente direkt zu wrappen
    const scaleName = \`Scale\${prop}\`;
    const ScaleComponent = (ScaleComponents as any)[scaleName];
    
    if (ScaleComponent && typeof ScaleComponent === 'function') {
      // @ts-expect-error - TypeScript-Fehler werden für dynamische Komponenten unterdrückt
      const WrappedComponent = withTypeFix<BaseProps>(ScaleComponent);
      componentMap[prop] = WrappedComponent;
      return WrappedComponent;
    }
    
    return undefined;
  }
});

// Typensichere Komponenten mit spezifischen Props
`;

  // Generiere speziell typisierten Wrapper für häufig verwendete Komponenten
  commonComponents.forEach(comp => {
    code += `// @ts-expect-error - TypeScript-Fehler werden unterdrückt
componentMap.${comp.name} = withTypeFix<${comp.name}Props>(ScaleComponents.${comp.scaleComponentName});\n`;
  });

  code += `
// Exportiere explizit die häufig verwendeten Komponenten für bessere IDE-Unterstützung
`;

  // Exportiere häufig verwendete Komponenten explizit
  commonComponents.forEach(comp => {
    code += `export const ${comp.name} = componentMap.${comp.name};\n`;
  });

  code += `
// Häufig verwendete Komponenten direkt exportieren
`;

  // Generiere Exports für alle anderen Komponenten
  scaleComponents.forEach(scaleName => {
    const name = scaleName.replace('Scale', '');
    // Überspringe Komponenten, die bereits oben definiert wurden
    if (!commonComponents.some(c => c.name === name)) {
      code += `export const ${name} = componentMap.${name} || exportedComponents.${name};\n`;
    }
  });

  code += `
// Dynamischer Export für fortgeschrittene Anwendungsfälle
export default exportedComponents;`;

  return code;
}

// Schreibe den generierten Code in die Datei
try {
  const wrapperCode = generateWrapper();
  fs.writeFileSync(outputPath, wrapperCode, 'utf-8');
  console.log(`WrappedScaleComponents.tsx erfolgreich generiert unter: ${outputPath}`);
} catch (error) {
  console.error('Fehler beim Generieren der Wrapper-Komponenten:', error);
  process.exit(1);
}

console.log('Abgeschlossen!'); 