import { math_clamp, math_round } from '@lifaon/math';

export function clampColorChanel(
  value: number,
): number {
  return math_clamp(math_round(value), 0, 0xff);
}
