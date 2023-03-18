import {
  mat4,
  mat4_create,
  mat4_decompose,
  mat4_recompose,
  matrix_to_string,
  quat,
  quat_copy,
  quat_create,
  quat_equals,
  vec3,
  vec3_copy,
  vec3_create,
  vec3_equals,
  vec4,
  vec4_copy,
  vec4_create,
  vec4_equals,
} from '@lifaon/math';
import { ITransitionFunction, ITransitionProgress } from '../transition-function.type';
import { interpolate_decomposed_mat4 } from './interpolation/interpolate_decomposed_mat4';
import { interpolate_translation } from './interpolation/interpolate_translation';

export function createTransformMatrixTransition(
  origin: mat4,
  target: mat4,
): ITransitionFunction<mat4> {
  // INFO see "alter" projet
  // https://medium.com/swlh/understanding-3d-matrix-transforms-with-pixijs-c76da3f8bd8
  // https://research.cs.wisc.edu/graphics/Courses/838-s2002/Papers/polar-decomp.pdf
  //
  // https://link.springer.com/content/pdf/10.1007/s11075-016-0098-7.pdf
  // https://en.wikipedia.org/wiki/Singular_value_decomposition
  // https://scicomp.stackexchange.com/questions/8930/fast-algorithm-for-polar-decomposition
  // An_algorithm_to_compute_the_polar_decomposition_of
  //
  // https://www.the-art-of-web.com/css/3d-transforms/

  const originTranslation: vec3 = vec3_create();
  const targetTranslation: vec3 = vec3_create();
  const currentTranslation: vec3 = vec3_create();

  const originScale: vec3 = vec3_create();
  const targetScale: vec3 = vec3_create();
  const currentScale: vec3 = vec3_create();

  const originSkew: vec3 = vec3_create();
  const targetSkew: vec3 = vec3_create();
  const currentSkew: vec3 = vec3_create();

  const originPerspective: vec4 = vec4_create();
  const targetPerspective: vec4 = vec4_create();
  const currentPerspective: vec4 = vec4_create();

  const originQuaternion: quat = quat_create();
  const targetQuaternion: quat = quat_create();
  const currentQuaternion: quat = quat_create();

  const currentMatrix: mat4 = mat4_create();

  // const printMatrixState = (
  //   name: string,
  //   matrix: mat4,
  //   translation: vec3,
  //   scale: vec3,
  //   skew: vec3,
  //   perspective: vec4,
  //   quaternion: quat,
  // ) => {
  //   console.warn(name);
  //   console.log(MatrixToString(matrix, 4, 4));
  //   console.log('translation', vec3.str(translation));
  //   console.log('scale', vec3.str(scale));
  //   console.log('skew', vec3.str(skew));
  //   console.log('perspective', vec4.str(perspective));
  //   console.log('quaternion', quat.str(quaternion));
  // }

  if (
    !mat4_decompose(
      origin,
      originTranslation,
      originScale,
      originSkew,
      originPerspective,
      originQuaternion,
    )
  ) {
    console.log(matrix_to_string(origin, 4, 4));
    throw new Error(`Cannot decompose 'origin'`);
  }

  if (
    !mat4_decompose(
      target,
      targetTranslation,
      targetScale,
      targetSkew,
      targetPerspective,
      targetQuaternion,
    )
  ) {
    console.log(matrix_to_string(target, 4, 4));
    throw new Error(`Cannot decompose 'target'`);
  }

  const is_pure_translation = () => {
    return vec3_equals(originScale, targetScale)
      && vec3_equals(originSkew, originSkew)
      && vec4_equals(originPerspective, targetPerspective)
      && quat_equals(originQuaternion, targetQuaternion)
      ;
  };

  // console.log(
  //   'origin',
  //   originTranslation,
  //   originScale,
  //   originSkew,
  //   originPerspective,
  //   originQuaternion,
  // );
  //
  // console.log(
  //   'target',
  //   targetTranslation,
  //   targetScale,
  //   targetSkew,
  //   targetPerspective,
  //   targetQuaternion,
  // );

  if (is_pure_translation()) {
    vec3_copy(currentScale, originScale);
    vec3_copy(currentSkew, originSkew);
    vec4_copy(currentPerspective, originPerspective);
    quat_copy(currentQuaternion, originQuaternion);

    return (
      progress: ITransitionProgress,
    ): mat4 => {
      interpolate_translation(
        originTranslation,
        targetTranslation,
        currentTranslation,
        progress,
      );

      return mat4_recompose(
        currentTranslation,
        currentScale,
        currentSkew,
        currentPerspective,
        currentQuaternion,
        currentMatrix,
      );
    };
  } else {
    return (
      progress: ITransitionProgress,
    ): mat4 => {
      interpolate_decomposed_mat4(
        originTranslation,
        targetTranslation,
        currentTranslation,
        originScale,
        targetScale,
        currentScale,
        originSkew,
        targetSkew,
        currentSkew,
        originPerspective,
        targetPerspective,
        currentPerspective,
        originQuaternion,
        targetQuaternion,
        currentQuaternion,
        progress,
      );

      return mat4_recompose(
        currentTranslation,
        currentScale,
        currentSkew,
        currentPerspective,
        currentQuaternion,
        currentMatrix,
      );
    };
  }
}
