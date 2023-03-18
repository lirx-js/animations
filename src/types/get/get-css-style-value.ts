import { CSSStyleValueConstructor } from '../w3c-css-typed-object-model-level-1.types';

export function getCSSStyleValue(): CSSStyleValueConstructor {
  return (globalThis as any).CSSStyleValue;
}
