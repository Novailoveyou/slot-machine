import { ComponentProps, useEffect, useState } from 'react'
import { produce } from 'immer'

export const createSlotMachine = <
  T extends {
    rows?: number
    speenDurationMs?: number
    speenSpeedMs?: number
    slots: ComponentProps<'img'>[]
  },
>({
  rows: _rows,
  speenDurationMs,
  speenSpeedMs,
  slots,
}: T) => {
  const rows = _rows || slots.length

  const randomNumber = (min: number, max: number): number => {
    const byteArray = new Uint8Array(1)
    window.crypto.getRandomValues(byteArray)

    const range = max - min + 1
    const max_range = 256
    if (byteArray[0] >= Math.floor(max_range / range) * range)
      return randomNumber(min, max)
    return min + (byteArray[0] % range)
  }

  const _getSpeenDurationMs = () =>
    speenDurationMs || randomNumber(35, 55) * 100

  const _getSpeenSpeedMs = () => speenSpeedMs || randomNumber(12, 17)

  const useSlotMachine = () => {
    const [isSpinning, setIsSpinning] = useState(false)
    const stop = () => setIsSpinning(false)
    const start = () => setIsSpinning(true)

    const [field, setField] = useState(
      Array.from({ length: slots.length }, () =>
        Array.from({ length: slots.length }, (_, idx) => slots[idx]),
      ),
    )

    const _speen = () => {
      const speenIdx = randomNumber(0, slots.length - 1)

      setField(
        produce(draft => {
          draft[speenIdx].unshift(draft[speenIdx].pop()!)
        }),
      )
    }

    useEffect(() => {
      if (!isSpinning) return

      const interval = setInterval(_speen, _getSpeenSpeedMs())

      const timeout = setTimeout(stop, _getSpeenDurationMs())

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }, [isSpinning])

    return {
      isSpinning,
      field: field.map(column => column.filter((_, idx) => idx < rows)),
      speen: start,
    }
  }

  return { useSlotMachine }
}
