import { CSSConstructor } from '../w3c-css-typed-object-model-level-1.types';

export function getCSS(): CSSConstructor {
  return (globalThis as any).CSS;
}
