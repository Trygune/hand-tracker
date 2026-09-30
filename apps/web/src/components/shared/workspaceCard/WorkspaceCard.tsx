import { MousePointerClick, MousePointerSquareDashed } from 'lucide-react'
import type { WorkspaceCardProps } from './WorkspaceCard.types'

const WorkspaceCard = ({
  title,
  description,
  action,
  onAction,
}: WorkspaceCardProps) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex size-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500">
        {action === 'left-click' ? (
          <MousePointerClick className="size-4" />
        ) : (
          <MousePointerSquareDashed className="size-4" />
        )}
      </div>

      <h3 className="mt-4 text-sm font-semibold text-zinc-900">{title}</h3>

      <p className="mt-1.5 text-xs leading-5 text-zinc-500">{description}</p>

      {action === 'left-click' ? (
        <button
          type="button"
          onClick={() => {
            onAction?.()
          }}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 w-full"
        >
          Left Test click
        </button>
      ) : (
        <button
          type="button"
          onContextMenu={(event) => {
            event.preventDefault()
            onAction?.()
          }}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 w-full"
        >
          Right Test click
        </button>
      )}
    </div>
  )
}

export default WorkspaceCard
