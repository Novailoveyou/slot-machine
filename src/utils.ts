import { Interpolation, CSSObject } from '@emotion/react'

export const createStyles = <
  Styles extends Record<string, Interpolation<CSSObject>>,
>(
  styles: Styles,
) => styles
