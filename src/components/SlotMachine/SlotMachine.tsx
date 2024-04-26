/** @jsxImportSource @emotion/react */
import { createSlotMachine } from './createSlotMachine'
import { v4 as uuidv4 } from 'uuid'
import { createStyles } from '../../utils'
import { SLOTS as slots } from '../../constants'

const styles = createStyles({
  flex: {
    display: 'flex',
    flexGrow: 1,
  },
  root: {
    justifyContent: 'space-between',
  },
  column: {
    alignItems: 'flex-start',
  },
  rows: {
    flexDirection: 'column',
  },
  isSpinning: {
    cursor: 'wait',
  },
} as const)

const { useSlotMachine } = createSlotMachine({
  slots,
  rows: 3,
})

export const SlotMachine = () => {
  const { field, isSpinning, hit } = useSlotMachine()

  return (
    <a
      css={[styles.root, styles.flex, isSpinning && styles.isSpinning]}
      tabIndex={0}
      onClick={hit}>
      <ul css={styles.flex}>
        {field.map(column => (
          <li key={uuidv4()} css={[styles.column, styles.flex]}>
            <ul css={[styles.rows, styles.flex]}>
              {column.map(slot => (
                <li key={uuidv4()} css={styles.flex}>
                  <img {...slot} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </a>
  )
}
