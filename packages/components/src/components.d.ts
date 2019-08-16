/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface TAlert {
    /**
    * (required) Alert close
    */
    'close'?: string;
    /**
    * (required) Alert class
    */
    'customClass'?: string;
    /**
    * (optional) Alert icon
    */
    'icon'?: string;
    'open': () => Promise<void>;
    /**
    * (required) Alert opened
    */
    'opened': boolean;
    /**
    * (optional) Alert size
    */
    'size'?: string;
    /**
    * (optional) Alert theme
    */
    'theme'?: string;
    /**
    * (optional) Alert timeout
    */
    'timeout'?: boolean | number;
    /**
    * (optional) Alert title
    */
    'title': string;
    /**
    * (optional) Alert variant
    */
    'variant'?: string;
  }
  interface TButton {
    /**
    * (optional) Deselected button
    */
    'deselected'?: boolean;
    'disable': () => Promise<void>;
    /**
    * (optional) Disabled button
    */
    'disabled'?: boolean;
    'enable': () => Promise<void>;
    /**
    * (optional) Button size
    */
    'size'?: string;
    /**
    * (optional) Button theme
    */
    'theme'?: string;
    /**
    * (optional) Button variant
    */
    'variant'?: string;
  }
  interface TCard {
    'deselected'?: boolean;
    'disabled'?: boolean;
    'imageTop'?: string;
    'imageTopAlt'?: string;
    'size'?: string;
    'theme'?: string;
    'variant'?: string;
  }
  interface TInputText {}
}

declare global {


  interface HTMLTAlertElement extends Components.TAlert, HTMLStencilElement {}
  var HTMLTAlertElement: {
    prototype: HTMLTAlertElement;
    new (): HTMLTAlertElement;
  };

  interface HTMLTButtonElement extends Components.TButton, HTMLStencilElement {}
  var HTMLTButtonElement: {
    prototype: HTMLTButtonElement;
    new (): HTMLTButtonElement;
  };

  interface HTMLTCardElement extends Components.TCard, HTMLStencilElement {}
  var HTMLTCardElement: {
    prototype: HTMLTCardElement;
    new (): HTMLTCardElement;
  };

  interface HTMLTInputTextElement extends Components.TInputText, HTMLStencilElement {}
  var HTMLTInputTextElement: {
    prototype: HTMLTInputTextElement;
    new (): HTMLTInputTextElement;
  };
  interface HTMLElementTagNameMap {
    't-alert': HTMLTAlertElement;
    't-button': HTMLTButtonElement;
    't-card': HTMLTCardElement;
    't-input-text': HTMLTInputTextElement;
  }
}

declare namespace LocalJSX {
  interface TAlert extends JSXBase.HTMLAttributes<HTMLTAlertElement> {
    /**
    * (required) Alert close
    */
    'close'?: string;
    /**
    * (required) Alert class
    */
    'customClass'?: string;
    /**
    * (optional) Alert icon
    */
    'icon'?: string;
    /**
    * (required) Alert opened
    */
    'opened'?: boolean;
    /**
    * (optional) Alert size
    */
    'size'?: string;
    /**
    * (optional) Alert theme
    */
    'theme'?: string;
    /**
    * (optional) Alert timeout
    */
    'timeout'?: boolean | number;
    /**
    * (optional) Alert title
    */
    'title'?: string;
    /**
    * (optional) Alert variant
    */
    'variant'?: string;
  }
  interface TButton extends JSXBase.HTMLAttributes<HTMLTButtonElement> {
    /**
    * (optional) Deselected button
    */
    'deselected'?: boolean;
    /**
    * (optional) Disabled button
    */
    'disabled'?: boolean;
    /**
    * (optional) Button size
    */
    'size'?: string;
    /**
    * (optional) Button theme
    */
    'theme'?: string;
    /**
    * (optional) Button variant
    */
    'variant'?: string;
  }
  interface TCard extends JSXBase.HTMLAttributes<HTMLTCardElement> {
    'deselected'?: boolean;
    'disabled'?: boolean;
    'imageTop'?: string;
    'imageTopAlt'?: string;
    'size'?: string;
    'theme'?: string;
    'variant'?: string;
  }
  interface TInputText extends JSXBase.HTMLAttributes<HTMLTInputTextElement> {}

  interface IntrinsicElements {
    't-alert': TAlert;
    't-button': TButton;
    't-card': TCard;
    't-input-text': TInputText;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


