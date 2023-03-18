// Type definitions for non-npm package css-typed-object-model-level-1 20180410.0
// Project: https://www.w3.org/TR/css-typed-om-1/
// Definitions by: Nathan Shively-Sanders <https://github.com/sandersn>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 4.4

// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/w3c-css-typed-object-model-level-1/index.d.ts

/** CSSStyleValue **/

export interface CSSStyleValueConstructor {
  new(...args: any[]): never;
  parse(property: string, cssText: string): CSSStyleValue;
  parseAll(property: string, cssText: string): CSSStyleValue[];
}

export interface CSSStyleValue {
  toString(): string;
}


/** CSSVariableReferenceValue **/

export interface CSSVariableReferenceValueConstructor {
  new(variable: string, fallback?: CSSUnparsedValue): CSSVariableReferenceValue;
}

export interface CSSVariableReferenceValue {
  variable: string;
  readonly fallback?: CSSUnparsedValue | undefined;
}


export type CSSUnparsedSegment =
  | string
  | CSSVariableReferenceValue
  ;

/** CSSUnparsedValue **/

export interface CSSUnparsedValueConstructor extends CSSStyleValueConstructor {
  new(members: CSSUnparsedSegment[]): CSSUnparsedValue;
}

export interface CSSUnparsedValue extends CSSStyleValue {
  [Symbol.iterator](): IterableIterator<CSSUnparsedSegment>;
  readonly length: number;
  [idx: number]: CSSUnparsedSegment;
}

/** CSSKeywordValue **/

export interface CSSKeywordValueConstructor extends CSSStyleValueConstructor {
  new(value: string): CSSKeywordValue;
}


export interface CSSKeywordValue extends CSSStyleValue {
  value: string;
}

export type CSSNumberOrNumeric =
  | CSSNumberish
  | CSSNumericValue
  ;

export enum CSSNumericBaseType {
  'length',
  'angle',
  'time',
  'frequency',
  'resolution',
  'flex',
  'percent',
}

export interface CSSNumericType {
  length: number;
  angle: number;
  time: number;
  frequency: number;
  resolution: number;
  flex: number;
  percent: number;
  percentHint: CSSNumericBaseType;
}

/** CSSNumericValue **/

export interface CSSNumericValueConstructor extends CSSStyleValueConstructor {
  parse(cssText: string): CSSNumericValue;
}

export interface CSSNumericValue extends CSSStyleValue {
  add(...values: CSSNumberOrNumeric[]): CSSNumericValue;
  sub(...values: CSSNumberOrNumeric[]): CSSNumericValue;
  mul(...values: CSSNumberOrNumeric[]): CSSNumericValue;
  div(...values: CSSNumberOrNumeric[]): CSSNumericValue;
  min(...values: CSSNumberOrNumeric[]): CSSNumericValue;
  max(...values: CSSNumberOrNumeric[]): CSSNumericValue;

  equals(...values: CSSNumberOrNumeric[]): boolean;

  to(unit: string): CSSUnitValue;
  toSum(...units: string[]): CSSMathSum;
  type(): CSSNumericType;
}


/** CSSUnitValue **/

export interface CSSUnitValueConstructor extends CSSNumericValueConstructor {
  new(value: number, unit: string): CSSUnitValue;
}

export interface CSSUnitValue extends CSSNumericValue {
  value: number;
  readonly unit: string;
}

/** CSSMathValue **/

export interface CSSMathValueConstructor extends CSSNumericValueConstructor {
}

export interface CSSMathValue extends CSSNumericValue {
  readonly operator: CSSMathOperator;
}

/** CSSMathSum **/

export interface CSSMathSumConstructor extends CSSMathValueConstructor {
  new(...args: CSSNumberOrNumeric[]): CSSMathSum;
}

export interface CSSMathSum extends CSSMathValue {
  readonly values: CSSNumericArray;
}

/** CSSMathProduct **/

export interface CSSMathProductConstructor extends CSSMathValueConstructor {
  new(...args: CSSNumberOrNumeric[]): CSSMathProduct;
}

export interface CSSMathProduct extends CSSMathValue {
  readonly values: CSSNumericArray;
}

/** CSSMathNegate **/

export interface CSSMathNegateConstructor extends CSSMathValueConstructor {
  new(arg: CSSNumberOrNumeric): CSSMathNegate;
}

export interface CSSMathNegate extends CSSMathValue {
  readonly value: CSSNumericValue;
}

/** CSSMathInvert **/

export interface CSSMathInvertConstructor extends CSSMathValueConstructor {
  new(arg: CSSNumberOrNumeric): CSSMathInvert;
}

export interface CSSMathInvert extends CSSMathValue {
  readonly value: CSSNumericValue;
}

/** CSSMathMin **/

export interface CSSMathMinConstructor extends CSSMathValueConstructor {
  new(...args: CSSNumberOrNumeric[]): CSSMathMin;
}

export interface CSSMathMin extends CSSMathValue {
  readonly values: CSSNumericArray;
}

/** CSSMathMax **/

export interface CSSMathMaxConstructor extends CSSMathValueConstructor {
  new(...args: CSSNumberOrNumeric[]): CSSMathMax;
}

export interface CSSMathMax extends CSSMathValue {
  readonly values: CSSNumericArray;
}

// TODO(yavanosta): conflict with base class properties
// Since there is no support for this class in any browser, it's better
// wait for the implementation.
// export interface CSSMathClamp extends CSSMathValue {
// constructor(min: CSSNumberOrNumeric, val: CSSNumberOrNumeric, max: CSSNumberOrNumeric);
//     readonly min: CSSNumericValue;
//     readonly val: CSSNumericValue;
//     readonly max: CSSNumericValue;
// };

export interface CSSNumericArray {
  [Symbol.iterator](): IterableIterator<CSSNumericValue>;
  readonly length: number;
  readonly [index: number]: CSSNumericValue;
}

export enum CSSMathOperator {
  'sum',
  'product',
  'negate',
  'invert',
  'min',
  'max',
  'clamp',
}

/** CSSMathMax **/

export interface CSSTransformValueConstructor extends CSSStyleValueConstructor {
  new(transforms: CSSTransformComponent[]): CSSTransformValue;
}

export interface CSSTransformValue extends CSSStyleValue {
  [Symbol.iterator](): IterableIterator<CSSTransformComponent>;
  readonly length: number;
  [index: number]: CSSTransformComponent;
  readonly is2D: boolean;
  toMatrix(): DOMMatrix;
}

/** CSSTransformComponent **/

export interface CSSTransformComponentConstructor {
}

export interface CSSTransformComponent {
  is2D: boolean;
  toMatrix(): DOMMatrix;
  toString(): string;
}

/** CSSTranslate **/

export interface CSSTranslateConstructor extends CSSTransformComponentConstructor {
  new(t: CSSNumericValue, y: CSSNumericValue, z?: CSSNumericValue): CSSTranslate;
}

export interface CSSTranslate extends CSSTransformComponent {
  x: CSSNumericValue;
  y: CSSNumericValue;
  z: CSSNumericValue;
}

/** CSSRotate **/

export interface CSSRotateConstructor extends CSSTransformComponentConstructor {
  new(angle: CSSNumericValue): CSSRotate;
  new(x: CSSNumberOrNumeric, y: CSSNumberOrNumeric, z: CSSNumberOrNumeric, angle: CSSNumericValue): CSSRotate;
}

export interface CSSRotate extends CSSTransformComponent {
  x: CSSNumberOrNumeric;
  y: CSSNumberOrNumeric;
  z: CSSNumberOrNumeric;
  angle: CSSNumericValue;
}

/** CSSScale **/

export interface CSSScaleConstructor extends CSSTransformComponentConstructor {
  new(x: CSSNumberOrNumeric, y: CSSNumberOrNumeric, z?: CSSNumberOrNumeric): CSSScale;
}

export interface CSSScale extends CSSTransformComponent {
  x: CSSNumberOrNumeric;
  y: CSSNumberOrNumeric;
  z: CSSNumberOrNumeric;
}

/** CSSSkew **/

export interface CSSSkewConstructor extends CSSTransformComponentConstructor {
  new(ax: CSSNumericValue, ay: CSSNumericValue): CSSSkew;
}

export interface CSSSkew extends CSSTransformComponent {
  ax: CSSNumericValue;
  ay: CSSNumericValue;
}

/** CSSSkewX **/

export interface CSSSkewXConstructor extends CSSTransformComponentConstructor {
  new(ax: CSSNumericValue): CSSSkewX;
}

export interface CSSSkewX extends CSSTransformComponent {
  ax: CSSNumericValue;
}

/** CSSSkewY **/

export interface CSSSkewYConstructor extends CSSTransformComponentConstructor {
  new(ay: CSSNumericValue): CSSSkewY;
}

export interface CSSSkewY extends CSSTransformComponent {
  ay: CSSNumericValue;
}

/* Note that skew(x,y) is *not* the same as skewX(x) skewY(y),
     thus the separate interfaces for all three. */

/** CSSPerspective **/

export interface CSSPerspectiveConstructor extends CSSTransformComponentConstructor {
  new(length: CSSNumericValue): CSSPerspective;
}

export interface CSSPerspective extends CSSTransformComponent {
  length: CSSNumericValue;
}

/** CSSMatrixComponent **/

export interface CSSMatrixComponentConstructor extends CSSTransformComponentConstructor {
  new(matrix: DOMMatrixReadOnly, options?: CSSMatrixComponentOptions): CSSMatrixComponent;
}

export interface CSSMatrixComponent extends CSSTransformComponent {
  matrix: DOMMatrix;
}

export interface CSSMatrixComponentOptions {
  is2D: boolean;
}

/** CSSImageValue **/

export interface CSSImageValueConstructor extends CSSStyleValueConstructor {
}


export interface CSSImageValue extends CSSStyleValue {
}


export interface StylePropertyMapReadOnly {
  [Symbol.iterator](): IterableIterator<[string, CSSStyleValue[]]>;

  get(property: string): CSSStyleValue | undefined;
  getAll(property: string): CSSStyleValue[];
  has(property: string): boolean;
  readonly size: number;
}

export interface StylePropertyMap extends StylePropertyMapReadOnly {
  set(property: string, ...values: Array<CSSStyleValue | string>): void;
  append(property: string, ...values: Array<CSSStyleValue | string>): void;
  delete(property: string): void;
  clear(): void;
}

export interface ElementWithComputedStyleMap {
  computedStyleMap(): StylePropertyMapReadOnly;
}

export interface CSSStyleRule {
  readonly styleMap: StylePropertyMap;
}

export interface ElementCSSInlineStyle {
  readonly attributeStyleMap: StylePropertyMap;
}

export interface CSSConstructor {
  number(value: number): CSSUnitValue;
  percent(value: number): CSSUnitValue;

  // <length>
  em(value: number): CSSUnitValue;
  ex(value: number): CSSUnitValue;
  ch(value: number): CSSUnitValue;
  ic(value: number): CSSUnitValue;
  rem(value: number): CSSUnitValue;
  lh(value: number): CSSUnitValue;
  rlh(value: number): CSSUnitValue;
  vw(value: number): CSSUnitValue;
  vh(value: number): CSSUnitValue;
  vi(value: number): CSSUnitValue;
  vb(value: number): CSSUnitValue;
  vmin(value: number): CSSUnitValue;
  vmax(value: number): CSSUnitValue;
  cm(value: number): CSSUnitValue;
  mm(value: number): CSSUnitValue;
  Q(value: number): CSSUnitValue;

  in(value: number): CSSUnitValue;
  pt(value: number): CSSUnitValue;
  pc(value: number): CSSUnitValue;
  px(value: number): CSSUnitValue;

  // <angle>
  deg(value: number): CSSUnitValue;
  grad(value: number): CSSUnitValue;
  rad(value: number): CSSUnitValue;
  turn(value: number): CSSUnitValue;

  // <time>
  s(value: number): CSSUnitValue;
  ms(value: number): CSSUnitValue;

  // <frequency>
  Hz(value: number): CSSUnitValue;
  kHz(value: number): CSSUnitValue;

  // <resolution>
  dpi(value: number): CSSUnitValue;
  dpcm(value: number): CSSUnitValue;
  dppx(value: number): CSSUnitValue;

  // <flex>
  fr(value: number): CSSUnitValue;
}
