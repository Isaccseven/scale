'use client';

import * as ScaleComponents from '@telekom/scale-components-react';
import { withTypeFix } from './ScaleComponents';

// Generische Basis-Props-Schnittstelle für alle Komponenten
interface BaseProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// Spezifische Prop-Interfaces für häufig verwendete Komponenten
interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  size?: 'small' | 'large';
  children?: React.ReactNode;
}

interface CardProps extends BaseProps {
  children?: React.ReactNode;
}

interface TextFieldProps extends BaseProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
}

// Hilfsfunktion zum Extrahieren der Komponentennamen ohne "Scale"-Präfix
function getComponentName(scaleName: string): string {
  if (scaleName.startsWith('Scale')) {
    return scaleName.substring(5); // Entferne "Scale"-Präfix
  }
  return scaleName;
}

// Automatisch alle Scale-Komponenten als gewrappte Komponenten exportieren
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: Record<string, React.ComponentType<any>> = {};

// Importiere alle Scale-Komponenten und wrappe sie mit withTypeFix
Object.entries(ScaleComponents).forEach(([name, Component]) => {
  // Prüfe, ob es sich um eine Funktion/Komponente handelt und ob der Name mit "Scale" beginnt
  if (name.startsWith('Scale') && typeof Component === 'function') {
    const componentName = getComponentName(name);
    // @ts-expect-error - TypeScript-Fehler werden unterdrückt, da die Komponenten zur Laufzeit funktionieren
    componentMap[componentName] = withTypeFix<BaseProps>(Component);
  }
});

// Überschreibe die häufig verwendeten Komponenten mit typensicheren Versionen
// @ts-expect-error - TypeScript-Fehler werden unterdrückt
componentMap.Button = withTypeFix<ButtonProps>(ScaleComponents.ScaleButton);
// @ts-expect-error - TypeScript-Fehler werden unterdrückt
componentMap.Card = withTypeFix<CardProps>(ScaleComponents.ScaleCard);
// @ts-expect-error - TypeScript-Fehler werden unterdrückt
componentMap.TextField = withTypeFix<TextFieldProps>(ScaleComponents.ScaleTextField);

// Exportiere die häufig verwendeten Komponenten mit spezifischen Typen
export const Button = componentMap.Button;
export const Card = componentMap.Card;
export const TextField = componentMap.TextField;

// Manuelles Exportieren anderer Komponenten
// Dies vermeidet Probleme mit dynamischen Exporten
export const Avatar = componentMap.Avatar;
export const Checkbox = componentMap.Checkbox;
export const Chip = componentMap.Chip;
export const Divider = componentMap.Divider;
export const Dropdown = componentMap.Dropdown;
export const Footer = componentMap.Footer;
export const Header = componentMap.Header;
export const Icon = componentMap.Icon;
export const Link = componentMap.Link;
export const Menu = componentMap.Menu;
export const Modal = componentMap.Modal;
export const Notification = componentMap.Notification;
export const Pagination = componentMap.Pagination;
export const Progress = componentMap.Progress;
export const Radio = componentMap.Radio;
export const Sidebar = componentMap.Sidebar;
export const Slider = componentMap.Slider;
export const Spinner = componentMap.Spinner;
export const Switch = componentMap.Switch;
export const Tab = componentMap.Tab;
export const Table = componentMap.Table;
export const Tag = componentMap.Tag;
export const Textarea = componentMap.Textarea;
export const Toast = componentMap.Toast;
export const Tooltip = componentMap.Tooltip; 