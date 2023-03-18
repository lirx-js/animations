import { CSSNumericValue } from '../../types/w3c-css-typed-object-model-level-1.types';
import { ITransitionFunction, ITransitionProgress } from '../transition-function.type';

export function createCSSNumericValueTransition(
  origin: CSSNumericValue,
  target: CSSNumericValue,
): ITransitionFunction<CSSNumericValue> {
  return (
    progress: ITransitionProgress,
  ): CSSNumericValue => {
    return origin.mul(1 - progress).add(target.mul(progress));
  };
}

