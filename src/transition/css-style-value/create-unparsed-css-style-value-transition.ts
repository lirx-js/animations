import { CSSStyleValue } from '../../types/w3c-css-typed-object-model-level-1.types';
import { mapTransition } from '../modifiers/map-transition';
import { ITransitionFunction } from '../transition-function.type';
import { createCSSStyleValueTransition } from './create-css-style-value-transition';
import { getCSSStyleValue } from '../../types/get/get-css-style-value';

export function createUnparsedCSSStyleValueTransition(
  propertyName: string,
  origin: string,
  target: string,
  element?: HTMLElement,
): ITransitionFunction<string> {
  return mapTransition(
    createCSSStyleValueTransition(
      getCSSStyleValue().parse(propertyName, origin),
      getCSSStyleValue().parse(propertyName, target),
      element,
    ),
    (value: CSSStyleValue): string => {
      return value.toString();
    },
  );
}

