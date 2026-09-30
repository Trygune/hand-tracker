import type { GestureRowProps } from './GestureRow.types'

const GestureRow = ({ gesture, action }: GestureRowProps) => {
  return (
    <div className="flex items-center justify-between border-b border-zinc-100 py-2.5 last:border-0">
      <span className="text-xs font-medium text-zinc-700">{gesture}</span>

      <span className="text-[11px] text-zinc-400">{action}</span>
    </div>
  )
}

export default GestureRow
