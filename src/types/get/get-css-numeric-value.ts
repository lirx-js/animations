import { CSSNumericValueConstructor } from '../w3c-css-typed-object-model-level-1.types';

export function getCSSNumericValue(): CSSNumericValueConstructor {
  return (globalThis as any).CSSNumericValue;
}
