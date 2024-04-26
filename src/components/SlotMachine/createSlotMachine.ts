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
  speenDurationMs: _speenDurationMs,
  speenSpeedMs: _speedSpeedMs,
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

  const getSpeenDurationMs = () =>
    _speenDurationMs || randomNumber(35, 55) * 100

  const getSpeenSpeedMs = () => _speedSpeedMs || randomNumber(12, 17)

  const useSlotMachine = () => {
    const [isSpinning, setIsSpinning] = useState(false)
    const stop = () => setIsSpinning(false)
    const hit = () => setIsSpinning(true)

    const [field, setField] = useState(
      Array.from({ length: slots.length }, () =>
        Array.from({ length: slots.length }, (_, idx) => slots[idx]),
      ),
    )

    const speen = () => {
      const speenIdx = randomNumber(0, slots.length - 1)

      setField(
        produce(draft => {
          draft[speenIdx].unshift(draft[speenIdx].pop()!)
        }),
      )
    }

    useEffect(() => {
      if (!isSpinning) return

      const interval = setInterval(speen, getSpeenSpeedMs())

      const timeout = setTimeout(stop, getSpeenDurationMs())

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }, [isSpinning])

    return {
      isSpinning,
      field: field.map(column => column.filter((_, idx) => idx < rows)),
      hit,
    }
  }

  return { useSlotMachine }
}
