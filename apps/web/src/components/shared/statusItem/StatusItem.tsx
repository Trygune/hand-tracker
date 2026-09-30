import { cn } from '../../../lib/utility/cn'
import type { StatusItemProps } from './StatusItem.types'

const StatusItem = ({
  label,
  value,
  status = 'default',
  icon: Icon,
}: StatusItemProps) => {
  const dotClass = {
    default: 'text-zinc-400',
    success: 'text-emerald-500',
    warning: 'text-amber-500',
  }[status]

  return (
    <div className="flex items-center gap-2">
      {Icon && (
        <Icon
          className={cn('size-3.5 text-zinc-400', dotClass)}
          strokeWidth={1.8}
        />
      )}

      <span className="text-xs text-zinc-500">{label}</span>

      <span className="text-xs font-medium text-zinc-900">{value}</span>
    </div>
  )
}

export default StatusItem
