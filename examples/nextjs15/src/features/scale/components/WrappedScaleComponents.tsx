'use client';

import * as ScaleComponents from '@telekom/scale-components-react';
import { withTypeFix } from './ScaleComponents';

// Generische Basis-Props-Schnittstelle
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
  onClick?: (event: React.MouseEvent) => void;
}

interface CardProps extends BaseProps {
  children?: React.ReactNode;
  className?: string;
}

interface TextFieldProps extends BaseProps {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (event: Event) => void;
  helperText?: string;
}

// Komponenten-Cache
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
    const scaleName = `Scale${prop}`;
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
// @ts-expect-error - TypeScript-Fehler werden unterdrückt
componentMap.Button = withTypeFix<ButtonProps>(ScaleComponents.ScaleButton);
// @ts-expect-error - TypeScript-Fehler werden unterdrückt
componentMap.Card = withTypeFix<CardProps>(ScaleComponents.ScaleCard);
// @ts-expect-error - TypeScript-Fehler werden unterdrückt
componentMap.TextField = withTypeFix<TextFieldProps>(ScaleComponents.ScaleTextField);

// Exportiere explizit die häufig verwendeten Komponenten für bessere IDE-Unterstützung
export const Button = componentMap.Button;
export const Card = componentMap.Card;
export const TextField = componentMap.TextField;

// Häufig verwendete Komponenten direkt exportieren
export const Avatar = componentMap.Avatar || exportedComponents.Avatar;
export const Checkbox = componentMap.Checkbox || exportedComponents.Checkbox;
export const Chip = componentMap.Chip || exportedComponents.Chip;
export const Divider = componentMap.Divider || exportedComponents.Divider;
export const Dropdown = componentMap.Dropdown || exportedComponents.Dropdown;
export const Footer = componentMap.Footer || exportedComponents.Footer;
export const Header = componentMap.Header || exportedComponents.Header;
export const Icon = componentMap.Icon || exportedComponents.Icon;
export const Link = componentMap.Link || exportedComponents.Link;
export const Menu = componentMap.Menu || exportedComponents.Menu;
export const Modal = componentMap.Modal || exportedComponents.Modal;
export const Notification = componentMap.Notification || exportedComponents.Notification;
export const Pagination = componentMap.Pagination || exportedComponents.Pagination;
export const Progress = componentMap.Progress || exportedComponents.Progress;
export const Radio = componentMap.Radio || exportedComponents.Radio;
export const Sidebar = componentMap.Sidebar || exportedComponents.Sidebar;
export const Slider = componentMap.Slider || exportedComponents.Slider;
export const Spinner = componentMap.Spinner || exportedComponents.Spinner;
export const Switch = componentMap.Switch || exportedComponents.Switch;
export const Tab = componentMap.Tab || exportedComponents.Tab;
export const Table = componentMap.Table || exportedComponents.Table;
export const Tag = componentMap.Tag || exportedComponents.Tag;
export const Textarea = componentMap.Textarea || exportedComponents.Textarea;
export const Toast = componentMap.Toast || exportedComponents.Toast;
export const Tooltip = componentMap.Tooltip || exportedComponents.Tooltip;

// Dynamischer Export für fortgeschrittene Anwendungsfälle
export default exportedComponents; 