import { CSSTransformValueConstructor } from '../w3c-css-typed-object-model-level-1.types';

export function getCSSTransformValue(): CSSTransformValueConstructor {
  return (globalThis as any).CSSTransformValue;
}
