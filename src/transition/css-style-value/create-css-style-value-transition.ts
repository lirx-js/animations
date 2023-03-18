import { CSSStyleValue } from '../../types/w3c-css-typed-object-model-level-1.types';
import { colorNumberToColorString } from '../color/color-number-to-color-string';
import { IColorNumber } from '../color/color-number.type';
import { colorStringToColorNumber } from '../color/color-string-to-color-number';
import { createColorNumberTransition } from '../color/create-color-number-transition';
import { mapTransition } from '../modifiers/map-transition';
import { ITransitionFunction } from '../transition-function.type';
import { createCSSNumericValueTransition } from './create-css-numeric-value-transition';
import { createCSSTransformValueTransition } from './create-css-transform-value-transition';
import { getCSSNumericValue } from '../../types/get/get-css-numeric-value';
import { getCSSTransformValue } from '../../types/get/get-css-transform-value';

export function createCSSStyleValueTransition(
  origin: CSSStyleValue,
  target: CSSStyleValue,
  element?: HTMLElement, // TODO could be used for https://developer.mozilla.org/en-US/docs/Web/API/CSSVariableReferenceValue
): ITransitionFunction<CSSStyleValue> {
  if (
    (origin instanceof getCSSNumericValue())
    && (target instanceof getCSSNumericValue())
  ) {
    return createCSSNumericValueTransition(origin, target);
  } else if (
    (origin instanceof getCSSTransformValue())
    && (target instanceof getCSSTransformValue())
  ) {
    return createCSSTransformValueTransition(origin, target);
  } else {
    try {
      return mapTransition(
        createColorNumberTransition(
          colorStringToColorNumber(origin.toString()),
          colorStringToColorNumber(target.toString()),
        ),
        (color: IColorNumber): CSSStyleValue => {
          return {
            toString: () => colorNumberToColorString(color),
          };
        },
      );
    } catch {
      throw new Error(`Incompatible CSSStyleValue`);
    }
  }
}
