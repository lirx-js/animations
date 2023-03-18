import { ITransitionProgress, IVoidTransitionFunction } from '../transition-function.type';
import { parallelTransitions } from './parallel-transitions';

export type ITransitionWithWeight = [
  transtion: IVoidTransitionFunction,
  weight: number,
];

export function sequentialTransitions(
  transitions: readonly ITransitionWithWeight[],
): IVoidTransitionFunction {
  const length: number = transitions.length;
  const _transitions: IVoidTransitionFunction[] = new Array(length);

  let total: number = 0;
  for (let i = 0; i < length; i++) {
    total += transitions[i][1];
  }

  let step: number = 0;
  for (let i = 0; i < length; i++) {
    const [transition, weight] = transitions[i];
    const start: number = step;
    const range: number = weight / total;
    step += range;
    const end: number = step;

    _transitions[i] = (
      progress: ITransitionProgress,
    ): void => {
      if (progress <= start) {
        transition(0);
      } else if (progress >= end) {
        transition(1);
      } else {
        transition((progress - start) / range);
      }
    };
  }

  return parallelTransitions(_transitions);
}
