import { CSSMatrixComponentConstructor } from '../w3c-css-typed-object-model-level-1.types';

export function getCSSMatrixComponent(): CSSMatrixComponentConstructor {
  return (globalThis as any).CSSMatrixComponent;
}
