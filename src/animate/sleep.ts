export interface ISleepOptions {
  signal?: AbortSignal;
}

export function sleep(
  duration: number,
  {
    signal,
  }: ISleepOptions = {},
): Promise<void> {
  return new Promise<void>((
    resolve: () => void,
    reject: (reason: any) => void,
  ): void => {
    if (signal?.aborted) {
      reject(new Error(`Aborted`));
    } else {
      if (signal === void 0) {
        setTimeout(resolve, duration);
      } else {
        const end = () => {
          signal.removeEventListener('abort', _abort);
          clearTimeout(timer);
        };

        const _resolve = (): void => {
          end();
          resolve();
        };

        const _reject = (
          reason?: any,
        ): void => {
          end();
          reject(reason);
        };

        const _abort = () => {
          _reject(new Error(`Aborted`));
        };

        signal.addEventListener('abort', _abort, {
          once: true,
        });

        const timer = setTimeout(_resolve, duration);
      }
    }
  });
}
