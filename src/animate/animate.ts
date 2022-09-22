import { ITransitionProgress, IVoidTransitionFunction } from '../transition/transition-function.type';

export interface IAnimateOptions {
  transition: IVoidTransitionFunction;
  duration: number;
  currentTime?: number;
  signal?: AbortSignal;
}

export type IAnimateResult = ITransitionProgress;

export function animate(
  {
    transition,
    duration,
    currentTime = 0,
    signal,
  }: IAnimateOptions,
): Promise<IAnimateResult> {
  return new Promise<IAnimateResult>((
    resolve: (value: IAnimateResult) => void,
  ): void => {
    if (
      (signal !== void 0)
      && signal.aborted
    ) {
      resolve(0);
    } else {
      const originTime: number = Date.now() - currentTime;
      let timer: number;
      let progress: ITransitionProgress;

      const loop = () => {
        timer = requestAnimationFrame(() => {
          progress = Math.min(1, (Date.now() - originTime) / duration);
          transition(progress);

          if (progress < 1) {
            loop();
          } else {
            _resolve();
          }
        });
      };

      const clear = () => {
        cancelAnimationFrame(timer);

        if (signal !== void 0) {
          signal.removeEventListener('abort', _resolve);
        }
      };

      const _resolve = () => {
        clear();
        resolve(progress);
      };

      if (signal !== void 0) {
        signal.addEventListener('abort', _resolve);
      }

      loop();
    }
  });
}
