import { css } from '@emotion/react'
import emotionNormalize from 'emotion-normalize'

export const globalStyles = css`
  ${emotionNormalize}

  body {
    background-color: #333;
    color: #fff;
  }
  a {
    cursor: pointer;
  }
  img {
    width: 100%;
    height: auto;
  }
  ul {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
  }
`
