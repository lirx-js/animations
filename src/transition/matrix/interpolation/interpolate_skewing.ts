import { vec3, vec3_linear_interpolation } from '@lifaon/math';

export function interpolate_skewing(
  origin: vec3,
  target: vec3,
  current: vec3,
  t: number,
): void {
  vec3_linear_interpolation(origin, target, current, t);
}
