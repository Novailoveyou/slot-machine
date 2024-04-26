/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react'
import { globalStyles } from './styles'
import { Fragment } from 'react'
import SlotMachine from './SlotMachine'
import { createStyles } from './utils'

const styles = createStyles({
  main: {
    display: 'flex',
    minHeight: '100vh',
  },
} as const)

const App = () => {
  return (
    <Fragment>
      <Global styles={globalStyles} />
      <main css={styles.main}>
        <SlotMachine />
      </main>
    </Fragment>
  )
}

export default App
