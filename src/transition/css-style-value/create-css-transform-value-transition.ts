import { CSSTransformValue } from '../../types/w3c-css-typed-object-model-level-1.types';
import { createDOMMatrixTransition } from '../matrix/create-dom-matrix-transition';
import { mapTransition } from '../modifiers/map-transition';
import { ITransitionFunction } from '../transition-function.type';
import { getCSSMatrixComponent } from '../../types/get/get-css-matrix-component-value';
import { getCSSTransformValue } from '../../types/get/get-css-transform-value';

export function createCSSTransformValueTransition(
  origin: CSSTransformValue,
  target: CSSTransformValue,
): ITransitionFunction<CSSTransformValue> {
  return mapTransition(
    createDOMMatrixTransition(
      origin.toMatrix(),
      target.toMatrix(),
    ),
    (matrix: DOMMatrix): CSSTransformValue => { // TODO improve
      return new (getCSSTransformValue())([new (getCSSMatrixComponent())(matrix)]);
      // return {
      //   toString: () => matrix.toString(),
      // };
    },
  );
}
