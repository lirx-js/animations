import { math_clamp } from '@lifaon/math';

export function clampColorChanel(
  value: number,
): number {
  return math_clamp(Math.round(value), 0, 0xff);
}
